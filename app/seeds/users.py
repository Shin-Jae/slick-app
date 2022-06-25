from app.models import db, User, Channel
# from app.seeds.channels import (
#     school, work, appAcademy, private1, private2, private3
# )
import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():
    school = Channel(
        owner_id=1,
        name='School',
        description='For all my classmates',
        private=False,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        # channel_members = [1, 2, 3]
        # channel_members = [demo, tony, bill]
    )

    work = Channel(
        owner_id=2,
        name='Work',
        description='For all my colleagues',
        private=False,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        # channel_members = [1, 2, 3]
        # channel_members = [demo, tony, bill]
        )

    appAcademy = Channel(
        owner_id=2,
        name='appAcademy',
        description='A place for appAcademy students',
        private=False,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        # channel_members = [1, 2, 3]
        # channel_members = [demo, tony, bill]
        )

    private1 = Channel(
        owner_id=2,
        name='private1',
        description='private1',
        private=True,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        # channel_members = [tony, bill]
        )

    private2 = Channel(
        owner_id=2,
        name='private2',
        description='private2',
        private=True,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        # channel_members = [demo, tony]
        )

    private3 = Channel(
        owner_id=2,
        name='private3',
        description='private3',
        private=True,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
        # channel_members = [demo, tony, bill]
        )
    demo = User(
        first_name='Demo',
        last_name='Demo',
        email='demo@aa.io',
        password='password',
        profile_img='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
        created_at=datetime.datetime.now(),
        user_members= [school, work, appAcademy, private2, private3]
        )
    tony = User(
        first_name='Tony',
        last_name='Stark',
        email='Tony@ironman.io',
        password='password',
        profile_img='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        created_at=datetime.datetime.now(),
        user_members= [school, work, appAcademy, private1, private2, private3]
    )
    bill = User(
        first_name='Bill',
        last_name='Gates',
        email='bill@microsoft.com',
        password='password',
        profile_img='https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        created_at=datetime.datetime.now(),
        user_members= [school, work, appAcademy, private1, private3]
    )

    db.session.add(demo)
    db.session.add(tony)
    db.session.add(bill)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
