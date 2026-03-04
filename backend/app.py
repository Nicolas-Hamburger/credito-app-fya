from flask import Flask
from flask_cors import CORS
from routes import creditos_bp

app = Flask(__name__)
CORS(app) 

app.register_blueprint(creditos_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
