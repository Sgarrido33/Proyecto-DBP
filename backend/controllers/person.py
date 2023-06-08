from flask import jsonify
from models.person import Person
from database import db

def get_users():
    persons=Person.query.all()
    return jsonify(persons)

def get_user_by_id(user_id):
    Person=Person.query.filter_by(id=user_id).first()
    return jsonify(Person)

def insert_user(user):
    person=Person(username=user['username'],password=user['password'],email=user['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user)

def update_user(user_id,userUpdateData):
    user=Person.query.filter_by(id=user_id).first()
    if userUpdateData.get('username'):
        user.username=userUpdateData['username']
    if userUpdateData.get('password'):
        user.password=userUpdateData['password']

    db.session.commit()
    return jsonify(user)

def delete_user(user_id):
    user = Person.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify(user)
