from flask import jsonify, request
from models import app, db, Usuario, Publicacion, Planta,Logro,Comentario,meGusta

@app.route('/usuarios', methods=['GET', 'POST'])
def get_usuarios():
    if request.method == 'GET':
        usuarios = Usuario.query.all()
        return jsonify(usuarios)
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']
        usuario = Usuario(username=username, email=email)
        usuario.set_password(password)
        db.session.add(usuario)
        db.session.commit()
        return jsonify(usuario)

@app.route('/usuarios/<username>', methods=['GET', 'PUT', 'DELETE'])
def usuario(username):
    usuario = Usuario.query.get(username)

    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'})

    if request.method == 'GET':
        return jsonify(usuario)

    if request.method == 'PUT':
        data = request.get_json()
        usuario.email = data.get('email', usuario.email)
        password = data.get('password')
        if password:
            usuario.set_password(password)
        db.session.commit()
        return jsonify(usuario)

    if request.method == 'DELETE':
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({'message': 'Usuario eliminado'})


@app.route('/publicaciones', methods=['GET', 'POST'])
def get_publicaciones():
    if request.method == 'GET':
        publicaciones = Publicacion.query.all()
        return jsonify(publicaciones)
    if request.method == 'POST':
        data = request.get_json()
        descripcion = data['descripcion']
        tipo = data['tipo']
        asunto = data['asunto']
        username = data['username']
        publicacion = Publicacion(descripcion=descripcion, tipo=tipo, asunto=asunto, username=username)
        db.session.add(publicacion)
        db.session.commit()
        return jsonify(publicacion)

@app.route('/plantas', methods=['GET', 'POST'])
def get_plantas():
    if request.method == 'GET':
        plantas = Planta.query.all()
        return jsonify(plantas)
    if request.method == 'POST':
        data = request.get_json()
        especie = data['especie']
        username = data['username']
        edad_inicial = data['edad_inicial']
        planta = Planta(especie=especie, username=username, edad_inicial=edad_inicial)
        db.session.add(planta)
        db.session.commit()
        return jsonify(planta)

@app.route('/plantas/<plant_id>', methods=['GET', 'PUT', 'DELETE'])
def planta(plant_id):
    planta = Planta.query.get(plant_id)

    if not planta:
        return jsonify({'message': 'Planta no encontrada'})

    if request.method == 'GET':
        return jsonify(planta)

    if request.method == 'PUT':
        data = request.get_json()
        planta.especie = data.get('especie', planta.especie)
        planta.username = data.get('username', planta.username)
        planta.edad_inicial = data.get('edad_inicial', planta.edad_inicial)
        db.session.commit()
        return jsonify(planta)

    if request.method == 'DELETE':
        db.session.delete(planta)
        db.session.commit()
        return jsonify({'message': 'Planta eliminada'})

@app.route('/publicaciones/<pub_id>', methods=['GET', 'PUT', 'DELETE'])
def publicacion(pub_id):
    publicacion = Publicacion.query.get(pub_id)

    if not publicacion:
        return jsonify({'message': 'Publicación no encontrada'})

    if request.method == 'GET':
        return jsonify(publicacion)

    if request.method == 'PUT':
        data = request.get_json()
        publicacion.descripcion = data.get('descripcion', publicacion.descripcion)
        publicacion.tipo = data.get('tipo', publicacion.tipo)
        publicacion.asunto = data.get('asunto', publicacion.asunto)
        db.session.commit()
        return jsonify(publicacion)

    if request.method == 'DELETE':
        db.session.delete(publicacion)
        db.session.commit()
        return jsonify({'message': 'Publicación eliminada'})
    
@app.route('/logros', methods=['GET', 'POST'])
def get_logros():
    if request.method == 'GET':
        logros = Logro.query.all()
        return jsonify(logros)
    if request.method == 'POST':
        data = request.get_json()
        imagen = data['imagen']
        descripcion = data['descripcion']
        username = data['username']
        logro = Logro(imagen=imagen, descripcion=descripcion, username=username)
        db.session.add(logro)
        db.session.commit()
        return jsonify(logro)

@app.route('/logros/<logro_id>', methods=['GET', 'PUT', 'DELETE'])
def logro(logro_id):
    logro = Logro.query.get(logro_id)

    if not logro:
        return jsonify({'message': 'Logro no encontrado'})

    if request.method == 'GET':
        return jsonify(logro)

    if request.method == 'PUT':
        data = request.get_json()
        logro.imagen = data.get('imagen', logro.imagen)
        logro.descripcion = data.get('descripcion', logro.descripcion)
        logro.username = data.get('username', logro.username)
        db.session.commit()
        return jsonify(logro)

    if request.method == 'DELETE':
        db.session.delete(logro)
        db.session.commit()
        return jsonify({'message': 'Logro eliminado'})
    

@app.route('/comentarios', methods=['GET', 'POST'])
def get_comentarios():
    if request.method == 'GET':
        comentarios = Comentario.query.all()
        return jsonify(comentarios)
    if request.method == 'POST':
        data = request.get_json()
        pub_id = data['pub_id']
        contenido = data['contenido']
        comentario = Comentario(pub_id=pub_id, contenido=contenido)
        db.session.add(comentario)
        db.session.commit()
        return jsonify(comentario)

@app.route('/comentarios/<comment_id>', methods=['GET', 'PUT', 'DELETE'])
def comentario(comment_id):
    comentario = Comentario.query.get(comment_id)

    if not comentario:
        return jsonify({'message': 'Comentario no encontrado'})

    if request.method == 'GET':
        return jsonify(comentario)

    if request.method == 'PUT':
        data = request.get_json()
        comentario.pub_id = data.get('pub_id', comentario.pub_id)
        comentario.contenido = data.get('contenido', comentario.contenido)
        db.session.commit()
        return jsonify(comentario)

    if request.method == 'DELETE':
        db.session.delete(comentario)
        db.session.commit()
        return jsonify({'message': 'Comentario eliminado'})  
    
@app.route('/megustas', methods=['GET', 'POST'])
def get_megustas():
    if request.method == 'GET':
        megustas = meGusta.query.all()
        return jsonify(megustas)
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        pub_id = data['pub_id']
        megusta = meGusta(username=username, pub_id=pub_id)
        db.session.add(megusta)
        db.session.commit()
        return jsonify(megusta)

@app.route('/megustas/<username>/<pub_id>', methods=['GET', 'DELETE'])
def megusta(username, pub_id):
    megusta = meGusta.query.filter_by(username=username, pub_id=pub_id).first()

    if not megusta:
        return jsonify({'message': 'Me gusta no encontrado'})

    if request.method == 'GET':
        return jsonify(megusta)

    if request.method == 'DELETE':
        db.session.delete(megusta)
        db.session.commit()
        return jsonify({'message': 'Me gusta eliminado'})