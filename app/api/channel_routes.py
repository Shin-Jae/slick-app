from flask import Blueprint, jsonify
from app.models import Channel, User, members
from flask_login import current_user

channel_routes = Blueprint('channels', __name__ )

@channel_routes.route('/<int:userId>')
def channels(userId):

    channels = Channel.query.join(members).join(User).filter(members.c.users == userId).all()

    print("(((((((((" , channels)

    return{'channels': [channel.to_dict() for channel in channels]}
