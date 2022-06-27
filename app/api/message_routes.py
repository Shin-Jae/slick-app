from unicodedata import name
from flask import Blueprint, jsonify, request
from app.models import db, Message
from flask_login import current_user
from app.forms import MessageForm
from flask_socketio import join_room, leave_room, emit
from ..socket import socketio

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
    if form.validate_on_submit():
        message = Message(
            content=form.data['content'],
            owner_id=form.data['owner_id'],
            channel_id=form.data['channel_id'],
            created_at=form.data['created_at'],
            updated_at=form.data['updated_at'],
        )

        db.session.add(message)
        db.session.commit()

        return message.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @socketio.on('chat')
# def handle_message(data):
#     emit('response', {'data': data}, broadcast=True)
