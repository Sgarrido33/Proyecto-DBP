from flask import jsonify

from models.person import Person


def login(user_credentials):
    print(user_credentials)
    user = Person.query.filter_by(username=user_credentials['username']).first()
    print(user)
    if not user:
        return {},401
    
    if user_credentials['password'] != user.password:
        return {},401
    
    return jsonify(user)