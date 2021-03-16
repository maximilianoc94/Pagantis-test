from flask import Flask, make_response, request, send_file
from flask_cors import CORS
from flask_selfdoc import Autodoc
import app.utils
import os

CWD = os.getcwd()
IMAGE_FOLDER = os.path.join('app', 'static', 'images')

app = Flask("PAGANTIS API")
CORS(app)
auto = Autodoc(app)

app.jinja_env.filters["str_to_obj"] = utils.str_to_obj
app.jinja_env.filters["tojson_pretty"] = utils.to_pretty_json

from app.users_module.users_controller import users_controller
from app.wallets_module.wallets_controller import wallets_controller

app.register_blueprint(users_controller)
app.register_blueprint(wallets_controller)

@app.route("/documentation")
def documentation():
    return auto.html(template="docs_template.html")

@app.route("/images/<image_name>")
def get_images(image_name):
    return send_file(os.path.join(CWD, IMAGE_FOLDER, image_name), mimetype='image/webp')