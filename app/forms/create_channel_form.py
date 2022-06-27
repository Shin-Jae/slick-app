from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import User



def name_length(form, field):
    name = field.data
    if len(name) > 100:
        raise ValidationError('Channel Name must be 100 characters or less')
    elif not name:
        raise ValidationError("Please enter a channel name")

def description_length(form, field):
    description = field.data
    if len(description) > 255:
        raise ValidationError("Channel Description must be 255 characters or less")
    elif not description:
        raise ValidationError("Please enter channel description")     
    
class CreateChannel(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    private_chat = BooleanField("Private")
    submit = SubmitField("Submit")