from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://actual-app-url.herokuapp.com',
        'https://actual-app-url.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins, async_mode='eventlet')


# handle chat messages

def ack():
    print('message was received!::::::::::::::')

@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, callback=ack)