from flask import jsonify
from models.task import Task
from database import db

def get_tasks():
    tasks=Task.query.all()
    return jsonify(tasks)

def get_task_by_id(task_id):
    task=Task.query.filter_by(id=task_id).first()
    return jsonify(task)

def insert_task(Task):
    task=Task(Title=Task['Title'],Description=Task['Description'])
    db.session.add(Task)
    db.session.commit()
    return jsonify(Task)

def update_Task(Task_id,TaskUpdateData):
    task=Task.query.filter_by(id=Task_id).first()
    if TaskUpdateData.get('Title'):
        task.Title=TaskUpdateData['Title']
    if TaskUpdateData.get('Description'):
        task.Description=TaskUpdateData['Description']

    db.session.commit()
    return jsonify(task)

def delete_Task(Task_id):
    task = Task.query.get_or_404(Task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify(task)
