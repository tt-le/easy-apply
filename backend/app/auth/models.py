# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db
from flask_login import UserMixin



# Define a base model for other database tables to inherit
class Base(db.Model):
    __abstract__  = True
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())

# Define a User model
class UserRoles(Base):
    __tablename__ = 'user_roles'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('auth.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('roles.id', ondelete='CASCADE'))
    # status   = db.Column(db.SmallInteger, nullable=False)

    def __init__(self, user_id, role_id):
        self.user_id = user_id
        self.role_id = role_id
        # self.status = status

    def __repr__(self):
        return '<Role user:{}, role:{}, status:{}>'.format(self.user_id, self.role_id, self.status)     

class Role(Base):
    __tablename__ = 'roles'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)
    
class Authentication(UserMixin, Base):
    __tablename__ = 'auth'
    id    = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True)
    email_confirmed_at = db.Column(db.DateTime())
    password = db.Column(db.String(192),  nullable=False)
    roles = db.relationship('Role', secondary='user_roles')
     
    def get_id(self):
        return self.id
    
    def get_email(self):
        return self.email
    
    def has_role(self, role_name):
        role = Role.query.filter_by(name=role_name).first()
        if role in self.roles:
            return True
        else:
            return False

    def __init__(self, email, email_confirmed_at, password):
        self.email = email
        self.email_confirmed_at = email_confirmed_at
        self.password = password
    
    def __repr__(self):
        return '<Auth user:{}>'.format(self.id)     

class Applicant(Base):
    __tablename__ = 'applicant'
    auth = db.relationship(Authentication)
    user_id = db.Column(db.Integer, db.ForeignKey('auth.id'), primary_key=True)
    firstName = db.Column(db.String(128),  nullable=False)
    lastName = db.Column(db.String(128),  nullable=False)
    address = db.Column(db.String(128),  nullable=False)
    city = db.Column(db.String(128), nullable=False)
    country = db.Column(db.String(128), nullable=False)
    gender = db.Column(db.String(128), nullable=False)
    birthDate = db.Column(db.String(128), nullable=False)
    profilePath = db.Column(db.String(500), nullable=True)
    vidPath = db.Column(db.String(500), nullable=True)

    def __init__(self, user_id, firstName, lastName, address, city, country, gender, birthDate, profilePath, vidPath):
        self.user_id = user_id
        self.firstName = firstName
        self.lastName = lastName
        self.address = address
        self.city = city
        self.country = country
        self.gender = gender
        self.birthDate = birthDate
        self.profilePath = profilePath
        self.vidPath = vidpath
    
    def __repr__(self):
        return '<Applicant {} {}>'.format(self.firstName, self.lastName)
    


class Employer(Base):
    __tablename__ = 'employer'
    auth = db.relationship(Authentication)
    user_id = db.Column(db.Integer, db.ForeignKey('auth.id'),primary_key=True)
    company_name = db.Column(db.String(128), nullable=False)
    firstName = db.Column(db.String(128),  nullable=False)
    lastName = db.Column(db.String(128),  nullable=False)
    address = db.Column(db.String(128),  nullable=False)
    city = db.Column(db.String(128), nullable=False)
    country = db.Column(db.String(128), nullable=False)

    
    def __init__(self, user_id, firstName, lastName, address, city, country, company_name):
        self.user_id = user_id
        self.firstName = firstName
        self.lastName = lastName
        self.address = address
        self.city = city
        self.country = country
        self.company_name = company_name
    
    def __repr__(self):
        return '<Employer {} {} {}>'.format(self.company_name, self.firstName, self.lastName)
