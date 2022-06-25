from app.models import db, Message
import datetime
# Adds a demo user, you can add other users here if you want
def seed_messages():
    message1 = Message(
        content='Hello, world',
        owner_id=1,
        channel_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message1 = Message(
        content='Hello, world',
        owner_id=2,
        channel_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message2 = Message(
        content='Hello, world',
        owner_id=1,
        channel_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message3 = Message(
        content='Hello, again',
        owner_id=1,
        channel_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message4 = Message(
        content='This is test',
        owner_id=2,
        channel_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message5 = Message(
        content='Welcome to my world',
        owner_id=3,
        channel_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message6 = Message(
        content="You're my hero",
        owner_id=1,
        channel_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message7 = Message(
        content='Who is hungry?',
        owner_id=1,
        channel_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message8 = Message(
        content='Time to get to work',
        owner_id=1,
        channel_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message9 = Message(
        content='This channel is amazing',
        owner_id=2,
        channel_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )
    message10 = Message(
        content='Anyone seen any good movies?',
        owner_id=3,
        channel_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
        )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)
    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()