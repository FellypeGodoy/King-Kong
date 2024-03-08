from flask import Flask, render_template, request, jsonify
import psycopg2
from os import environ

app = Flask(__name__)


def connect_db():
    conn = psycopg2.connect(
        host=environ.get("host"),
        database=environ.get("database"),
        user=environ.get("user"),
        password=environ.get("password")
    )

    return conn

@app.route('/')
def index():
    return render_template('pagina.html')

@app.route('/buscar_dados', methods=['GET'])
def buscar_dados():
    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM alimentos")
        rows = cursor.fetchall()

        conn.close()

        data = []
        for row in rows:
            data.append({
                'nome': row[0],
                'carboidrato': row[1],
                'proteina': row[2],
                'gordura': row[3],
                'kcal': row[4],
                'porcao': row[5] 
            })
        
        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
