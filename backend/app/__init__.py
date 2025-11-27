from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

from app.config import Config
from app.extensions import db, migrate, jwt


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    print("DEBUG: Loaded SQLALCHEMY_DATABASE_URI =", app.config.get("SQLALCHEMY_DATABASE_URI"))

    # Proper CORS for production + Google OAuth + JWT cookies
    FRONTEND_URL = os.environ.get("FRONTEND_URL")
    CORS(
        app,
        origins=[FRONTEND_URL],         # allow only your frontend (dynamic)
        supports_credentials=True       # needed for cookies & Google OAuth
    )

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register models
    from app import models

    # Register blueprints
    from app.routes import main
    from app.auth import auth_bp

    app.register_blueprint(main)
    app.register_blueprint(auth_bp)

    return app
