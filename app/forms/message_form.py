from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired
from app.models import Message

class MessageForm(FlaskForm):
    content = StringField('content')
    owner_id = IntegerField('owner_id', validators=[DataRequired])
    chanel_id = IntegerField('channel_id', validators=[DataRequired])
    image = StringField('image')
    created_at = DateField('created_at', validators=[DataRequired])
    updated_at = DateField('updated_at', validators=[DataRequired])
