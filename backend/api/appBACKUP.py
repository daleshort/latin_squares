# from flask import Flask, send_from_directory
# from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS #comment this on deployment
# # from api.HelloApiHandler import HelloApiHandler

# app = Flask(__name__, static_url_path='', static_folder='~/Documents/latin_squares/backend/api/')
# CORS(app) #comment this on deployment
# api = Api(app)

# @app.route("/", defaults={'path':''})
# def serve(path):
#     return send_from_directory(app.static_folder,'index.html')

# # api.add_resource(HelloApiHandler, '/flask/hello')


# import os
# from flask import Flask, send_from_directory

# app = Flask(__name__, static_folder='~/Documents/latin_squares/backend/api')

# # Serve React App
# @app.route('/', defaults={'path': 'hello.py'})
# @app.route('/<path:path>')
# def serve(path):
#     if path != "" and os.path.exists(app.static_folder + '/' + path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')


# if __name__ == '__main__':
#     app.run(use_reloader=True, port=5000, threaded=True)



from flask import Flask, send_from_directory
# from flask import Flask, render_template

app = Flask(__name__, static_url_path='',
                  static_folder='build',
                  template_folder='build')

@app.route("/")
def hello():
    # return render_template("index.html")
    return ('<html><div>I am here</div></html>')