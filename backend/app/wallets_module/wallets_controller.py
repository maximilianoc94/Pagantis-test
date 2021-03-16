from flask import Blueprint, request, jsonify, abort, make_response, send_file
from app import auto
from .wallets_facade import WalletFacade
import json

wallets_controller = Blueprint("wallets", __name__, url_prefix="/api/v1/wallets")

@wallets_controller.route("", methods=["GET", "PUT"])
@auto.doc()
def wallets_manager():
    """
    [
        {
            "group": "Wallets",
            "name": "Get wallets by user",
            "description":"Returns all wallets of a given user as a list of objects",
            "methods":["GET"],
            "url":"/api/v1/wallets",
            "response": [
                {
                    used_id: 1,
                    hash: 'b8b9413cf28a2a4a6da9b56c',
                    coins: 100
                },
                {
                    used_id: 1,
                    hash: 'b8b9413cf28a2a4a6da9b57d',
                    coins: 1
                }
            ]
        }
    ]
    """
    user_id = request.args.get("user")
    if request.method == "GET":
        if user_id is not None:
            return jsonify(WalletFacade.get_wallets_by_user(user_id))


@wallets_controller.route("/select", methods=["GET"])
@auto.doc()
def wallets_select():
    """
    [
        {
            "group": "Wallets",
            "name": "Get list of users and their wallets",
            "description":"Returns a map of users and their respective wallets",
            "methods":["GET"],
            "url":"/api/v1/wallets/select",
            "response": {
                'Silvia Martinez': [
                    '5d33C280017d58cbFdAFd7eE3F43a003',
                    '0448930b2478f9FbA17988187c968322'
                ], 
                'Marina Prieto': [
                    'e9aAB03D9a22e707FaB9648F4c80B321'
                ],
                'Alma Villalobos': [
                    'E3f9DCfcb95157Ae300CA3dCfB82e338',
                    '63F834A7Bb42105dd9d33a70f343F6aE',
                    '28b3b7574CA44A252e550621855a489f'
                ]
            }
        }
    ]
    """
    if request.method == "GET":
        return jsonify(WalletFacade.get_wallet_select_list())



@wallets_controller.route("/transaction", methods=["POST"])
@auto.doc()
def transaction_manager():
    """
    [
        {
            "group": "Wallets",
            "name": "Transaction",
            "description":"Sends funds from one wallet to multiple others.",
            "methods":["POST"],
            "url":"/api/v1/wallets/transaction",
            "body": [
                {   
                    "name": "fromWallet",
                    "description": "The wallet hash where the funds are taken",
                    "type": "String"
                },
                {   
                    "name": "transactions",
                    "description": "List of transactions to be made in the form of { toWallet: String, amount: Number }. toWallet is the hash of the wallet that will receive the funds and Amount would be the amount of coins.",
                    "type": "Array"
                },
            ],
        }
    ]
    """
    if request.method == "POST":
        body = request.get_json()
        
        from_wallet = body.get("fromWallet")
        transactions = body.get("transactions")

        return jsonify(WalletFacade.createTransactions(from_wallet, transactions))