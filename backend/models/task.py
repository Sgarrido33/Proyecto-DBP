from dataclasses import dataclass
from database import db
from datetime import datetime

@dataclass
class Task(db.Model):
    id: int
    Title: str
    Description: str
    fecha_creacion: datetime.date
    fecha_limite: datetime.date
    estado_urgencia: bool


    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Title = db.Column(db.String(100), nullable=False, unique=True)
    Description = db.Column(db.String(100), nullable=False)
    fecha_creacion =db.Column(db.Datetime)
    fecha_limite=db.Column(db.Datetime)
    estado_urgencia=db.Column(db.Boolean)
    

    def __repr__(self):
        return f'<Task {self.Title}>'