from dataclasses import dataclass
from controllers.person import get_users,insert_users,get_user_by_id,update_user,delete_user
from controllers.task import Task
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import db
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)



CORS(app)
    

@app.route('/persons', methods=['GET', 'POST'])
def route_get_persons():
    if request.method == 'GET':
        return get_users()
    if request.method == 'POST':
        user=request.get_json()
        return insert_users(user)

@app.route('/persons/<person_id>', methods=['GET', 'DELETE', 'PUT'])
def route_get_person(person_id):
    if request.method=='GET':
        return get_user_by_id(person_id)
    if request.method=='DELETE':
        return delete_user(person_id)
    if request.method== 'PUT':
        user=request.get_json()
        return update_user(person_id, user)
        

if __name__ == '__main__':
    app.run()