from flask import Blueprint, jsonify
from app.models import User, Message, Channel, members, db
from flask_login import current_user

channel_routes = Blueprint('channels', __name__ )

@channel_routes.route('/')
def channels():
    channels = Channel.query.filter(current_user.id in Channel.channel_members).all()
    print('channels', channels)
    return {'channels': [channel.to_dict() for channel in channels]}
