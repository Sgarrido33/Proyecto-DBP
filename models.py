import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root@localhost/mygarden'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

app.secret_key = 'my_secret_key'

db = SQLAlchemy(app)

class Usuario(UserMixin, db.Model):
    __tablename__ = 'Usuario'
    username = db.Column(db.String(50), primary_key=True, nullable=False)
    email = db.Column(db.String(60), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    publicaciones = db.relationship('Publicacion', backref='author', lazy='dynamic')
    logros = db.relationship('Logro', backref='author', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_id(self):
        return self.username

    def has_liked(self, Publicacion):
        return meGusta.query.filter_by(username=self.username, pub_id=Publicacion.pub_id).count() > 0


class Planta(db.Model):
    __tablename__ = 'Planta'
    plant_id = db.Column(db.Integer, primary_key=True, nullable=False)
    especie = db.Column(db.String(50), unique=True, nullable=False)
    username = db.Column(db.String(50), db.ForeignKey('Usuario.username'))
    edad_inicial = db.Column(db.Float, default=0.0)
    fecha_registro = db.Column(db.Date, default=datetime.date.today())
    cantidad = db.Column(db.Integer, default=1)


class Publicacion(db.Model):
    __tablename__ = 'Publicacion'
    pub_id = db.Column(db.Integer, primary_key=True, nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    tipo = db.Column(db.String(15), nullable=False)
    asunto = db.Column(db.String(80), nullable=False)
    imagen = db.Column(db.String(255), nullable=True)
    username = db.Column(db.String(50), db.ForeignKey('Usuario.username'))
    comments = db.relationship('Comentario', backref='publicacion', lazy='dynamic')


class Logro(db.Model):
    __tablename__ = 'Logro'
    logro_id = db.Column(db.Integer, primary_key=True, nullable=False)
    imagen = db.Column(db.String(120), nullable=False)
    descripcion = db.Column(db.String(120), nullable=True)
    username = db.Column(db.String(50), db.ForeignKey('Usuario.username'))

    def meGusta_counter(self):
        return meGusta.query.filter_by(logro_id=self.logro_id).count() #es como un un groupy by where logro_id=logro_id y con una función de agregacion de count


class Comentario(db.Model):
    __tablename__ = 'Comentario'
    comment_id = db.Column(db.Integer, primary_key=True, nullable=False)
    pub_id = db.Column(db.Integer, db.ForeignKey('Publicacion.pub_id'))
    contenido = db.Column(db.Text, nullable=False)
    fecha = db.Column(db.Date)
    username = db.Column(db.String(50), db.ForeignKey('Usuario.username'))


class meGusta(db.Model):
    __tablename__ = 'meGusta'
    username = db.Column(db.String(64),
                        db.ForeignKey('Usuario.username'),
                        primary_key=True)
    pub_id = db.Column(db.Integer,
                        db.ForeignKey('Publicacion.pub_id'),
                        primary_key=True)
def guardar_imagen(imagen, pub_id):
    #Guardar la imagen en el directorio configurado
    ruta = os.path.join(os.getcwd(), 'static')
    os.makedirs(pub_id, exist_ok=True)
    ruta = os.path.join(ruta, pub_id)
    imagen.save(ruta)

with app.app_context():
    db.create_all()
