from app.models import db, Channel
# from app.seeds.users import demo, tony, bill
import datetime
# Adds a demo user, you can add other users here if you want
def seed_channels():
    school = Channel(
        owner_id=1,
        name='School',
        description='For all my classmates',
        private_chat=False,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        channel_members = [demo, tony, bill]
        )

    work = Channel(
        owner_id=2,
        name='Work',
        description='For all my colleagues',
        private_chat=False,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        channel_members = [demo, tony, bill]
        )

    appAcademy = Channel(
        owner_id=2,
        name='appAcademy',
        description='A place for appAcademy students',
        private_chat=False,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        channel_members = [demo, tony, bill]
        )

    private1 = Channel(
        owner_id=2,
        name='private1',
        description='private1',
        private_chat=True,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        channel_members = [tony, bill]
        )

    private2 = Channel(
        owner_id=2,
        name='private2',
        description='private2',
        private_chat=True,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        channel_members = [demo, tony]
        )

    private3 = Channel(
        owner_id=2,
        name='private3',
        description='private3',
        private_chat=True,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        channel_members = [demo, tony, bill]
        )


    db.session.add(school)
    db.session.add(work)
    db.session.add(appAcademy)
    db.session.add(private1)
    db.session.add(private2)
    db.session.add(private3)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
