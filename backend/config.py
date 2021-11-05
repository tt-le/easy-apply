import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    # SECRET_KEY = os.getenv('SECRET_KEY', 'secret_key') #TODO change value
    SECRET_KEY = '9b5d6d7fc07866d6f364dd509477ceb520322f7ceaa2587eb87df37a1a97c9a7'
    DEBUG = False
    # tentative db uri: user:pwd@host:port/dbname
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@localhost:5432/dummyDB"
    

class DevelopmentConfig(Config):
    # uncomment the line below to use postgres
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'easyapply00@gmail.com'#os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = 'pojtan-todMu5-sitkeh'#os.getenv('MAIL_PASSWORD')
    MAIL_PORT = 587
    SECRET_KEY = '9b5d6d7fc07866d6f364dd509477ceb520322f7ceaa2587eb87df37a1a97c9a7'
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@localhost:5432/dummyDB"
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@localhost:5432/dummyDB"
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False
    # uncomment the line below to use postgres
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@localhost:5432/dummyDB"


config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY