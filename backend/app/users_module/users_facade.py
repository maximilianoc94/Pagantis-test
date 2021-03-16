from .users_data import users_data, update_user

class UserFacade:
    @staticmethod
    def get_all_users():
        return users_data.to_dict('records')

    @staticmethod
    def update_fav_user(user_id, isFav):
        update_user('id', user_id, 'isFav', isFav)
    
    @staticmethod
    def get_user(user_id):
        user = users_data[users_data['id'] == user_id]
        if len(user) == 0:
             abort(make_response(jsonify(error="User not found"), 400))
        return user.iloc[0].to_dict()