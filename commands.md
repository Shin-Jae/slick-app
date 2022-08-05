<!-- psql setup -->
CREATE USER slick_app WITH CREATEDB PASSWORD 'password';
CREATE DATABASE slick_app_db WITH OWNER slick_app;

<!-- aws -->
pipenv install boto3
