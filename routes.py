from flask import flash

@app.route('/')
def index():
    return "hola"