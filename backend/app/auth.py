from flask import Blueprint, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from app.models import User, db
from flask_jwt_extended import create_access_token
import os

auth_bp = Blueprint("auth", __name__)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


@auth_bp.route("/api/auth/google", methods=["POST"])
def google_login():
    data = request.get_json()

    if not data or "id_token" not in data:
        return jsonify({"error": "Missing id_token"}), 400

    try:
        # Verify Google ID Token
        idinfo = id_token.verify_oauth2_token(
            data["id_token"],
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = idinfo.get("email")
        name = idinfo.get("name")
        picture = idinfo.get("picture")

        if not email:
            return jsonify({"error": "Invalid Google token"}), 401

        # Check if user exists
        user = User.query.filter_by(email=email).first()

        if not user:
            user = User(name=name, email=email, picture=picture)
            db.session.add(user)
            db.session.commit()

        # Create JWT (identity = user.id)
        access_token = create_access_token(identity=user.id)

        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "picture": user.picture
            }
        }), 200

    except Exception as e:
        print("\n🔥 GOOGLE LOGIN ERROR:", e, "\n")
        return jsonify({"error": "Token verification failed"}), 401
