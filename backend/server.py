from dataclasses import dataclass
from controllers.person import Person
from controllers.task import Task
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import db
from datetime import datetime
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)



CORS(app)
    

@app.route('/persons', methods=['GET', 'POST'])
def route_get_persons():
    if request.method == 'GET':
        persons = Person.query.all()
        return jsonify(persons)
    if request.method == 'POST':
        data = request.get_json()
        person = Person(username=data['username'], password=data['password'], email=data['email'])
        db.session.add(person)
        db.session.commit()
        return jsonify(person)

@app.route('/persons/<person_id>', methods=['GET', 'DELETE', 'PUT'])
def route_get_person(person_id):
    if request.method == 'GET':
        person = Person.query.filter_by(id=person_id).first()
        return jsonify(person)
    if request.method == 'DELETE':
        person = Person.query.get_or_404(person_id)
        db.session.delete(person)
        db.session.commit()
        return jsonify(person)
    if request.method == 'PUT':
        data = request.get_json()
        person = Person.query.get_or_404(person_id)
        person.username = data["username"]
        person.password = data["password"]
        person.email = data["email"]
        db.session.commit()
        

if __name__ == '__main__':
    app.run()