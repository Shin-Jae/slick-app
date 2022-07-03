from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://app-slick.herokuapp.com',
        'https://app-slick.herokuapp.com'
    ]
else:

    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    socketio.emit("chat", data, broadcast=True)

# @socketio.on('update')
# def handle_update(data):
#     print('==========',data)
#     socketio.emit('update', data, broadcast=True)

@socketio.on('delete')
def handle_delete():
    socketio.emit('delete', broadcast=True)

@socketio.on('typing')
def handle_start_typing(data):
    socketio.emit('typing', data, broadcast=True)
