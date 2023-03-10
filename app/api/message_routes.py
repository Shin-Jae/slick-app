from datetime import datetime
from tkinter import N
from unicodedata import name
from flask import Blueprint, jsonify, request
from app.models import db, Message
from flask_login import current_user
from app.forms import MessageForm
from flask_socketio import join_room, leave_room, emit
from ..socket import socketio
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

message_routes = Blueprint('messages', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@message_routes.route('/', methods=['POST'], strict_slashes=False)
def messages():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    url = None
    if "image" in request.files:
        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]

    # content=None
    # if 'content'in request.form:
    #     content=form.data['content']

    message = Message(
        content=form.data['content'],
        owner_id=form.data['owner_id'],
        channel_id=form.data['channel_id'],
        image=url,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    db.session.add(message)
    db.session.commit()

    return message.to_dict()

    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@message_routes.route('/<int:messageId>', methods=['PUT'], strict_slashes=False)
def updateMessage(messageId):
    message = Message.query.get(messageId)
    new_message = request.json

    content = message.content
    content = new_message['content']
    message.content = content
    db.session.merge(message)
    db.session.flush()
    db.session.commit()

    return message.to_dict()


@message_routes.route('/<int:messageId>', methods=['DELETE'], strict_slashes=False)
def deleteMessage(messageId):
    message = Message.query.get(messageId)
    db.session.delete(message)
    db.session.commit()
    return message.to_dict()
# @socketio.on('chat')
# def handle_message(data):
#     emit('response', {'data': data}, broadcast=True)
