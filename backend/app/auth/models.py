# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db


# Define a base model for other database tables to inherit
class Base(db.Model):
    __abstract__  = True
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())

# Define a User model
class Role(Base):
    __tablename__ = 'role'
    user_id  = db.Column(db.Integer, primary_key=True)
    role     = db.Column(db.String(128), nullable=False)
    status   = db.Column(db.SmallInteger, nullable=False)

    def __init__(self, role, status):
        self.role = role
        self.status = status

    def __repr__(self):
        return '<Role user:{}, role:{}, status:{}>'.format(self.user_id, self.role, self.status)     

class Authentication(Base):
    __tablename__ = 'auth'
    role = db.relationship(Role)
    user_id    = db.Column(db.Integer,  db.ForeignKey('role.user_id'), nullable=False,
                                            unique=True, 
                                            primary_key=True)
    email = db.Column(db.String(128), unique=True)
    password = db.Column(db.String(192),  nullable=False)

    def __init__(self, user_id, email, password):
        self.user_id = user_id
        self.email = email
        self.password = password
    
    def __repr__(self):
        return '<Auth user:{}>'.format(self.user_id)     

class Applicant(Base):
    __tablename__ = 'applicant'
    role = db.relationship(Role)
    user_id = db.Column(db.Integer, db.ForeignKey('role.user_id'), primary_key=True)
    firstName = db.Column(db.String(128),  nullable=False)
    lastName = db.Column(db.String(128),  nullable=False)
    # email = db.Column(db.String(128),  nullable=False, unique=True)
    address = db.Column(db.String(128),  nullable=False)
    city = db.Column(db.String(128), nullable=False)
    country = db.Column(db.String(128), nullable=False)
    gender = db.Column(db.String(128), nullable=False)
    birthDate = db.Column(db.String(128), nullable=False)

    def __init__(self, user_id, firstName, lastName, address, city, country, gender, birthDate):
        self.user_id = user_id
        self.firstName = firstName
        self.lastName = lastName
        self.address = address
        self.city = city
        self.country = country
        self.gender = gender
        self.birthDate = birthDate
    
    def __repr__(self):
        return '<Applicant {} {}>'.format(self.firstName, self.lastName)
    


class Employer(Base):
    __tablename__ = 'employer'
    role = db.relationship(Role)
    user_id = db.Column(db.Integer, db.ForeignKey('role.user_id'),primary_key=True)
    company_name = db.Column(db.String(128), nullable=False)
    firstName = db.Column(db.String(128),  nullable=False)
    lastName = db.Column(db.String(128),  nullable=False)
    # email = db.Column(db.String(128),  nullable=False, unique=True)
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
    