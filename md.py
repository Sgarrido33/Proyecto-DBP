import datetime
from dataclasses import dataclass
from flask import Flask, jsonify, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
from sqlalchemy.orm import relationship
from datetime import date
import uuid

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = 'my_secret_key'

db = SQLAlchemy(app)

CORS(app, resources={r"/*": {"origins": "*"}})  # Habilita CORS para todas las rutas en tu aplicación Flask

 
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
    fecha_registro = db.Column(db.Date, server_default=datetime.date.today().strftime('%Y-%m-%d'))
    cantidad = db.Column(db.Integer, server_default='1')


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
    



@app.route('/usuarios', methods=['GET', 'POST'])
def get_usuarios():
    if request.method == 'GET':
        usuarios = Usuario.query.all()
        usuarios_list = []
        for usuario in usuarios:
            usuario_data = {
                'username': usuario.username,
                'email': usuario.email
            }
            usuarios_list.append(usuario_data)
        return jsonify(usuarios_list)
    
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']
        print("kjsdxcnsjdcbnasdcsda")
        
        if Usuario.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'})
        
        usuario = Usuario(username=username, email=email)
        usuario.set_password(password)
        db.session.add(usuario)
        db.session.commit()
        usuario_data = {
            'username': usuario.username,
            'email': usuario.email
        }
        return jsonify(usuario_data)


@app.route('/usuarios/<username>', methods=['GET', 'PUT', 'DELETE'])
def usuario(username):
    usuario = Usuario.query.get(username)

    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'})

    if request.method == 'GET':
        usuario_data = {
            'username': usuario.username,
            'email': usuario.email,
        }
        return jsonify(usuario_data)

    if request.method == 'PUT':
        data = request.get_json()
        usuario.email = data.get('email', usuario.email)
        password = data.get('password')
        if password:
            usuario.set_password(password)
        db.session.commit()
        usuario_data = {
            'username': usuario.username,
            'email': usuario.email,
        }
        return jsonify(usuario_data)

    if request.method == 'DELETE':
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({'message': 'Usuario eliminado'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'error': 'Email and password are required'})

    usuario = Usuario.query.filter_by(email=email).first()

    if not usuario or not usuario.check_password(password):
        return jsonify({'success': False, 'error': 'Invalid email or password'})

    usuario_data = {
        'username': usuario.username,
        'email': usuario.email,
    }
    return jsonify({'success': True, 'data': usuario_data})



@app.route('/publicaciones', methods=['GET', 'POST'])
def get_publicaciones():
    if request.method == 'GET':
        publicaciones = Publicacion.query.all()
        publicaciones_json = [{'pub_id': publicacion.pub_id,
                              'descripcion': publicacion.descripcion,
                              'tipo': publicacion.tipo,
                              'asunto': publicacion.asunto,
                              'username': publicacion.username,
                              #'imagen': 'static/imagenes/' + publicacion.imagen if publicacion.imagen else 'none'
                              'imagen': '/static/imagenes/' + publicacion.imagen if publicacion.imagen else None
                              } for publicacion in publicaciones]
        
        
        return jsonify(publicaciones_json[::-1])
    
    if request.method == 'POST':
        descripcion = request.form.get('descripcion')
        tipo = request.form.get('tipo')
        asunto = request.form.get('asunto')
        username = request.form.get('username')
        archivo = request.files.get('archivo')

        unique_filename = ""

        if archivo:
            # Generate a unique filename using UUID
            unique_filename = str(uuid.uuid4()) + os.path.splitext(archivo.filename)[1]
            image_path = os.path.join("static/imagenes", unique_filename)
            archivo.save(image_path)
            print("Image path:", image_path)
            print("unique_filename:", unique_filename)
        else:
            print("No file uploaded")

        
        publicacion = Publicacion(descripcion=descripcion, tipo=tipo, asunto=asunto, username=username, imagen=unique_filename)

        
        
        db.session.add(publicacion)
        db.session.commit()
        
        return jsonify({
            'pub_id': publicacion.pub_id,
            'descripcion': publicacion.descripcion,
            'tipo': publicacion.tipo,
            'asunto': publicacion.asunto,
            'username': publicacion.username
        })

@app.route('/publicaciones/<pub_id>', methods=['GET', 'PUT', 'DELETE'])
def publicacion(pub_id):
    publicacion = Publicacion.query.get(pub_id)

    if not publicacion:
        return jsonify({'message': 'Publicación no encontrada'})

    if request.method == 'GET':
        return jsonify({'pub_id': publicacion.pub_id,
                        'descripcion': publicacion.descripcion,
                        'tipo': publicacion.tipo,
                        'asunto': publicacion.asunto,
                        'username': publicacion.username})

    if request.method == 'PUT':
        data = request.get_json()
        publicacion.descripcion = data.get('descripcion', publicacion.descripcion)
        publicacion.tipo = data.get('tipo', publicacion.tipo)
        publicacion.asunto = data.get('asunto', publicacion.asunto)
        db.session.commit()
        return jsonify({'pub_id': publicacion.pub_id,
                        'descripcion': publicacion.descripcion,
                        'tipo': publicacion.tipo,
                        'asunto': publicacion.asunto,
                        'username': publicacion.username})

    if request.method == 'DELETE':
        db.session.delete(publicacion)
        db.session.commit()
        return jsonify({'message': 'Publicación eliminada'})


@app.route('/plantas', methods=['GET', 'POST'])
def get_plantas():
    if request.method == 'GET':
        plantas = Planta.query.all()
        plantas_list = []
        for planta in plantas:
            edad_inicial = planta.edad_inicial
            fecha_registro = planta.fecha_registro
            dias_transcurridos = (date.today() - fecha_registro).days
            meses_transcurridos = dias_transcurridos / 30
            edad = edad_inicial + meses_transcurridos

            plantas_list.append({
                'plant_id': planta.plant_id,
                'especie': planta.especie,
                'username': planta.username,
                'edad': edad,
                'fecha_registro': planta.fecha_registro,
                'cantidad':planta.cantidad
            })
        return jsonify(plantas_list)
    if request.method == 'POST':
        data = request.get_json()
        especie = data['especie']
        username = data['username']
        edad_inicial = data['edad_inicial']
        
        existing_plant = Planta.query.filter_by(especie=especie, edad_inicial=edad_inicial).first()
        if existing_plant:
            existing_plant.cantidad += 1  # Aumentar la cantidad en una unidad
            db.session.commit()
            return jsonify({
                'plant_id': existing_plant.plant_id,
                'especie': existing_plant.especie,
                'username': existing_plant.username,
                'edad_inicial': existing_plant.edad_inicial,
                'cantidad': existing_plant.cantidad
            })

        planta = Planta(especie=especie, username=username, edad_inicial=edad_inicial)
        db.session.add(planta)
        db.session.commit()
        return jsonify({
            'plant_id': planta.plant_id,
            'especie': planta.especie,
            'username': planta.username,
            'edad_inicial': planta.edad_inicial,
            'cantidad':planta.cantidad
        })

@app.route('/plantas/<plant_id>', methods=['GET', 'PUT', 'DELETE'])
def planta(plant_id):
    planta = Planta.query.get(plant_id)

    if not planta:
        return jsonify({'message': 'Planta no encontrada'})

    if request.method == 'GET':
        return jsonify({
            'plant_id': planta.plant_id,
            'especie': planta.especie,
            'username': planta.username,
            'edad_inicial': planta.edad_inicial,
            'cantidad':planta.cantidad
        })

    if request.method == 'PUT':
        data = request.get_json()
        planta.especie = data.get('especie', planta.especie)
        planta.username = data.get('username', planta.username)
        planta.edad_inicial = data.get('edad_inicial', planta.edad_inicial)
        db.session.commit()
        return jsonify({
            'plant_id': planta.plant_id,
            'especie': planta.especie,
            'username': planta.username,
            'edad_inicial': planta.edad_inicial,
            'cantidad':planta.cantidad
        })

    if request.method == 'DELETE':
        db.session.delete(planta)
        db.session.commit()
        return jsonify({'message': 'Planta eliminada'})

    
@app.route('/logros', methods=['GET', 'POST'])
def get_logros():
    if request.method == 'GET':
        logros = Logro.query.all()
        logros_list = []
        for logro in logros:
            logros_list.append({
                'logro_id': logro.logro_id,
                'imagen': logro.imagen,
                'descripcion': logro.descripcion,
                'username': logro.username
            })
        return jsonify(logros_list)
    if request.method == 'POST':
        data = request.get_json()
        imagen = data['imagen']
        descripcion = data['descripcion']
        username = data['username']
        logro = Logro(imagen=imagen, descripcion=descripcion, username=username)
        db.session.add(logro)
        db.session.commit()
        return jsonify({
            'logro_id': logro.logro_id,
            'imagen': logro.imagen,
            'descripcion': logro.descripcion,
            'username': logro.username
        })

@app.route('/logros/<logro_id>', methods=['GET', 'PUT', 'DELETE'])
def logro(logro_id):
    logro = Logro.query.get(logro_id)

    if not logro:
        return jsonify({'message': 'Logro no encontrado'})

    if request.method == 'GET':
        return jsonify({
            'logro_id': logro.logro_id,
            'imagen': logro.imagen,
            'descripcion': logro.descripcion,
            'username': logro.username
        })

    if request.method == 'PUT':
        data = request.get_json()
        logro.imagen = data.get('imagen', logro.imagen)
        logro.descripcion = data.get('descripcion', logro.descripcion)
        logro.username = data.get('username', logro.username)
        db.session.commit()
        return jsonify({
            'logro_id': logro.logro_id,
            'imagen': logro.imagen,
            'descripcion': logro.descripcion,
            'username': logro.username
        })

    if request.method == 'DELETE':
        db.session.delete(logro)
        db.session.commit()
        return jsonify({'message': 'Logro eliminado'})


@app.route('/comentarios', methods=['GET', 'POST'])
def get_comentarios():
    if request.method == 'GET':
        comentarios = Comentario.query.all()
        comentarios_list = []
        for comentario in comentarios:
            comentarios_list.append({
                'comment_id': comentario.comment_id,
                'pub_id': comentario.pub_id,
                'contenido': comentario.contenido,
                'username': comentario.username
            })
        return jsonify(comentarios_list)
    if request.method == 'POST':
        data = request.get_json()
        pub_id = data['pub_id']
        contenido = data['contenido']
        username = data['username']
        comentario = Comentario(pub_id=pub_id, contenido=contenido, username=username)
         # Aquí se asocia el comentario a la publicación
        publicacion = Publicacion.query.get(pub_id)
        if not publicacion:
            return jsonify({'message': 'Publicación no encontrada'})
        
        comentario.publicacion = publicacion
        
        db.session.add(comentario)
        db.session.commit()
        return jsonify({
            'comment_id': comentario.comment_id,
            'pub_id': comentario.pub_id,
            'contenido': comentario.contenido
        })

@app.route('/comentarios/<comment_id>', methods=['GET', 'PUT', 'DELETE'])
def comentario(comment_id):
    comentario = Comentario.query.get(comment_id)

    if not comentario:
        return jsonify({'message': 'Comentario no encontrado'})

    if request.method == 'GET':
        return jsonify({
            'comment_id': comentario.comment_id,
            'pub_id': comentario.pub_id,
            'contenido': comentario.contenido
        })

    if request.method == 'PUT':
        data = request.get_json()
        comentario.pub_id = data.get('pub_id', comentario.pub_id)
        comentario.contenido = data.get('contenido', comentario.contenido)
        db.session.commit()
        return jsonify({
            'comment_id': comentario.comment_id,
            'pub_id': comentario.pub_id,
            'contenido': comentario.contenido
        })

    if request.method == 'DELETE':
        db.session.delete(comentario)
        db.session.commit()
        return jsonify({'message': 'Comentario eliminado'})

    
@app.route('/megustas', methods=['GET', 'POST'])
def get_megustas():
    if request.method == 'GET':
        megustas = meGusta.query.all()
        megustas_list = []
        for megusta in megustas:
            megustas_list.append({
                'username': megusta.username,
                'pub_id': megusta.pub_id
            })
        return jsonify(megustas_list)
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        pub_id = data['pub_id']
        megusta = meGusta(username=username, pub_id=pub_id)
        db.session.add(megusta)
        db.session.commit()
        return jsonify({
            'username': megusta.username,
            'pub_id': megusta.pub_id
        })

@app.route('/megustas/<username>/<pub_id>', methods=['GET', 'PUT', 'DELETE'])
def megusta(username, pub_id):
    megusta = meGusta.query.filter_by(username=username, pub_id=pub_id).first()

    if not megusta:
        return jsonify({'message': 'Me gusta no encontrado'})

    if request.method == 'GET':
        return jsonify(megusta)

    if request.method == 'PUT':
        data = request.get_json()
        megusta.username = data.get('username', megusta.username)
        megusta.pub_id = data.get('pub_id', megusta.pub_id)
        db.session.commit()
        return jsonify(megusta)

    if request.method == 'DELETE':
        db.session.delete(megusta)
        db.session.commit()
        return jsonify({'message': 'Me gusta eliminado'})


if __name__ == '__main__':
    app.run()    