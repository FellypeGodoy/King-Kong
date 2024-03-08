from flask import Flask, render_template, request, jsonify
import psycopg2
from os import environ

app = Flask(__name__)

data = [
    {"nome": "arroz", "porcao": 100, "proteina": 2.7, "gordura": 0.3, "carboidrato": 28},
    {"nome": "feijão", "porcao": 100, "proteina": 5.54, "gordura": 5.15, "carboidrato": 21.63},
    {"nome": "frango", "porcao": 100, "proteina": 27, "gordura": 14, "carboidrato": 0},
    {"nome": "batata doce", "porcao": 100, "proteina": 1.6, "gordura": 0.1, "carboidrato": 29},
    {"nome": "carne patinho", "porcao": 100, "proteina": 20, "gordura": 13, "carboidrato": 1},
    {"nome": "ovo cozido", "porcao": 100, "proteina": 13, "gordura": 11, "carboidrato": 1.1},
    {"nome": "macarrão", "porcao": 100, "proteina": 5.8, "gordura": 0.93, "carboidrato": 30.86},
    {"nome": "tilapia", "porcao": 100, "proteina": 20.08, "gordura": 1.7, "carboidrato": 0},
    {"nome": "salmão", "porcao": 100, "proteina": 21.62, "gordura": 5.93, "carboidrato": 0}
]

def connect_db():
    conn = psycopg2.connect(
        host="localhost",
        database="postgres",
        user="postgres",
        password="postgres"
    )

    return conn

@app.route('/')
def index():
    return render_template('pagina.html')

@app.route('/buscar_dados', methods=['GET'])
def buscar_dados():
    try:
        # conn = connect_db()
        # cursor = conn.cursor()

        # cursor.execute("SELECT * FROM alimentos")
        # rows = cursor.fetchall()

        # conn.close()

        # for row in rows:
        #     data.append({
        #         'nome': row[0],
        #         'carboidrato': row[1],
        #         'proteina': row[2],
        #         'gordura': row[3],
        #         'kcal': row[4],
        #         'porcao': row[5] 
        #     })
        
        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
