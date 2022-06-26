from flask import Blueprint, jsonify
from app.models import Channel, User, members, Message
from flask_login import current_user

channel_routes = Blueprint('channels', __name__ )

@channel_routes.route('/<int:userId>')
def channels(userId):

    channels = Channel.query.join(members).join(User).filter(members.c.users == userId).all()

    return{'channels': [channel.to_dict() for channel in channels]}


@channel_routes.route('/<int:userId>/<int:channelId>')
def messages(userId, channelId):
    messages = Message.query.filter(Message.channel_id == channelId).all()

    return{'messages': [message.to_dict() for message in messages]}
