from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User

main = Blueprint("main", __name__)


@main.route("/api/health")
def health():
    return jsonify({"status": "ok"})


@main.route("/api/user/me")
@jwt_required()
def get_me():
    uid = get_jwt_identity()
    user = User.query.get(uid)
    
    print("🔥 JWT identity fetched =", uid)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "picture": user.picture
    })
