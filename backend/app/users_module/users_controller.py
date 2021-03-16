from flask import Blueprint, request, jsonify, abort, make_response, send_file
from app import auto
from .users_facade import UserFacade
import json

users_controller = Blueprint("users", __name__, url_prefix="/api/v1/users")

@users_controller.route("", methods=["GET", "PUT"])
@auto.doc()
def users_manager():
    """[
        {
            "group": "Users",
            "name": "Get all users",
            "description":"Returns all users as a list of objects",
            "methods":["GET"],
            "url":"/api/v1/users",
            "query_params": [
              {
                "name": "id",
                "description": "(Optional) The identifier for the user. If no id is given, returns all users.",
                "type": "String"
              },
            ],
            "response": [
                {
                    "id": "1",
                    "image": "http://localhost:5000/images/banner-1.webp",
                    "name": "Silvia Martin",
                    "isFav": true
                },
                {
                    "id": "2",
                    "image": "http://localhost:5000/images/banner-2.webp",
                    "name": "Marina Prieto",
                    "isFav": true
                }
            ]
        },
        {
    "group": "Users",
    "name": "Update Fav",
    "description": "Updates the fav status of an user",
    "methods": ["PUT"],
    "url": "/api/v1/users",
    "query_params": [
      {
        "name": "id",
        "description": "The identifier for the user",
        "type": "String"
      },
    ],
    "body": [
      {   
        "name": "isFav",
        "description": "The new value to be assigned",
        "type": "String"
      },
    ],
  }

    ]
    """
    try:
      if request.args is not None:
        user_id = request.args.get("id")
      if request.get_json() is not None:
        isFav = str(request.get_json().get("isFav")).lower() == "true"
    except (ValueError, TypeError):
        abort(make_response(jsonify(error="Invalid parameters format"), 400))
    if request.method == "GET":
      if user_id is None:
        return jsonify(UserFacade.get_all_users())
      else:
        return jsonify(UserFacade.get_user(user_id))
    if request.method == "PUT":
      return jsonify(UserFacade.update_fav_user(int(user_id), isFav))