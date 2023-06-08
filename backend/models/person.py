from dataclasses import dataclass
from database import db

@dataclass
class Person(db.Model):
   id: int
   username: str
   password: str
   email: str

   id = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(100), nullable=False)
   password = db.Column(db.String(100), nullable=False)
   email = db.Column(db.String(100),nullable=False)
     
   def __repr__(self):
       return f'<Person {self.username}>'
  
   def check_password(self, password):
       return self.password == password