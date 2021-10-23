# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db
 
# Define a base model for other database tables to inherit
class Base(db.Model):
 
    __abstract__  = True
 
    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())
    
class AppliedJobs(Base):
    __tablename__ = 'Appliedjobs'
    emailID = db.Column(db.String(255),  nullable=False)
     = db.column(db.String(255), nullable = False)
    
    # New instance instantiation procedure
    def __init__(self,emailID, Appliedjobs):
        self.emailID = emailID
        self.Appliedjobs = Appliedjobs
 
 
    def __repr__(self):
        return '<Jobs %r>' % (self.name) 