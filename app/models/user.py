from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


members = db.Table(
    'members',
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey(
        'users.id'), primary_key=True),
    db.Column('channels', db.Integer, db.ForeignKey(
        'channels.id'), primary_key=True)
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_img = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    # one-to-many relationship with Message
    messages = db.relationship("Message", back_populates="user")

    # one-to-many relationship with Channel
    channels = db.relationship("Channel", back_populates="user")

    # many-to-many with Channel, through members
    user_members = db.relationship(
        "Channel",
        secondary=members,
        back_populates="channel_members",
        # cascade="all, delete"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'members': [member.to_dict_no_user() for member in self.user_members]
        }

    def to_dict_no_channel(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
        }


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer,  db.ForeignKey(
        'channels.id', ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=False), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=False), nullable=False)

    # many-to-one relationship with User
    user = db.relationship("User", back_populates="messages")

    # many-to-one relationship with Channel
    channel = db.relationship("Channel", back_populates="messages")

    # def __init__(self, content):
    #     self.content = content

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "owner_id": self.owner_id,
            "channel_id": self.channel_id,
            "created_at": self.created_at
        }


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    private_chat = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # one-to-many relationship with Message
    messages = db.relationship("Message", back_populates="channel", passive_deletes=True, cascade='save-update,delete,delete-orphan')

    # many-to-one relationship with User
    user = db.relationship("User", back_populates="channels")

    # many-to-many with User, through members
    channel_members = db.relationship(
        "User",
        secondary=members,
        back_populates="user_members",
        # cascade="all, delete"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "description": self.description,
            "private_chat": self.private_chat,
            "members": [member.to_dict_no_channel() for member in self.channel_members ]
        }

    def to_dict_no_user(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "description": self.description,
            "private_chat": self.private_chat,
        }

    def __repr__(self):
        return f"< ChannelId: {self.id}, OwnerId: {self.owner_id}, Name: {self.name}, Description: {self.description}, Private Chat: {self.private_chat}, Channel Members: {self.channel_members} "
