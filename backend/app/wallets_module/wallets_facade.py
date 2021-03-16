from .wallets_data import wallets_data, update_wallet
from app.users_module.users_data import users_data
import functools 

class WalletFacade:
    @staticmethod
    def get_wallets_by_user(user_id):
        user_wallets_df = wallets_data[wallets_data["user_id"] == user_id]
        user_wallets = user_wallets_df.to_dict('records')
        return user_wallets

    @staticmethod
    def get_wallet_select_list():

        def join_by_user_id(row):
            return users_data[users_data["id"] == row.user_id].iloc[0]["name"]

        wallets_copy = wallets_data.copy()
        wallets_copy["user_name"] = wallets_copy.apply(lambda x: join_by_user_id(x), axis=1)
        wallets_copy.drop(columns=["coins", "user_id"])
        wallet_map = {}
        for k, wallet in wallets_copy.iterrows():
            if wallet.user_name not in wallet_map:
                wallet_map[wallet.user_name] = []
            wallet_map[wallet.user_name].append(wallet.hash)
        return wallet_map

    @staticmethod
    def createTransactions(fromWallet, transactions):
        try:
            if len(transactions) > 0:
                is_all_positive = all("amount" in transaction and float(transaction["amount"]) > 0 for transaction in transactions)
                if is_all_positive:
                    total_deduction = functools.reduce(lambda acc, curr: acc + float(curr["amount"]), transactions, 0)
                    walletFunds = wallets_data[wallets_data["hash"] == fromWallet].iloc[0]["coins"]
                    transaction_map = {}
                    for item in transactions:
                        transaction_map[item["toWallet"]] = item["amount"]
                    if total_deduction <= walletFunds:
                        def processBatch(row):
                            if row["hash"] == fromWallet:
                                return row["coins"] - total_deduction
                            if row["hash"] in transaction_map:
                                return row["coins"] + float(transaction_map[row["hash"]])  
                            return row["coins"]                          
                        wallets_data["batch_col"] = wallets_data.apply(lambda x: processBatch(x), axis=1)
                        wallets_data["coins"] = wallets_data["batch_col"]
                        wallets_data.drop(columns=["batch_col"])
                    else:
                        abort(make_response(jsonify(error="Insufficient funds"), 400))
                else:
                    abort(make_response(jsonify(error="Amounts cant be null nor negative"), 400))
            else:
                abort(make_response(jsonify(error="Empty transaction list"), 400))
        except TypeError:
            abort(make_response(jsonify(error="Invalid parameters format"), 400))
