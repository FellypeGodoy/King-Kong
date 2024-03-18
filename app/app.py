from flask import Flask, render_template, request, jsonify
import psycopg2
from os import environ

app = Flask(__name__)


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


@app.route('/dieta')
def dieta():
    return render_template('pagina2.html')


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
                'porcao': row[1],
                'proteina': row[2],
                'gordura': row[3],
                'carboidrato': row[4],
            })
        
        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)})


def pegar_porcao(data, quantidade):
    #CRIAR METODO DE CALCULAR PORÇÃO
    return data

    
def pegar_nutricao(alimento, quantidade):
    try:
        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM alimentos WHERE nome = %s", (alimento,))
        row = cursor.fetchone() 

        conn.close()

        data = {
            'nome': row[0],
            'porcao': row[1],
            'proteina': row[2],
            'gordura': row[3],
            'carboidrato': row[4]
        }
        final_data = pegar_porcao(data, quantidade)
        return final_data
    except psycopg2.Error as e:
        return {'error': str(e)}


@app.route('/buscar_dieta', methods=['POST'])
def buscar_dieta():
    data = request.json
    lista = []
    for chave, valor in data.items():
        alimento = chave
        quantidade = valor
        lista.append(pegar_nutricao(alimento, quantidade))
    return(jsonify(lista))


if __name__ == '__main__':
    app.run(debug=True)
