from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from api import get_alimento
from datetime import datetime, date


app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017')
db = client['gymfit'] 
collection = db['alimentos'] 


@app.route('/')
def index():
    return render_template('alimentos.html')


@app.route('/dieta')
def dieta():
    return render_template('dieta.html')


@app.route('/buscar_dados', methods=['POST'])
def buscar_dados():
    data = f"{request.json.get('alimento')} 100 grams"

    final_data = get_alimento(data)
    
    return jsonify(final_data)

def fetch_meals(collection):
    print("Fetching meals")
    meals = list(collection.find({}, {"_id": 0}))

    return jsonify(meals)


@app.route('/perfil', methods=['GET'])
def perfil():
    return render_template('perfil.html')


def fetch_meals(collection):
    print("Fetching meals")
    meals = list(collection.find({}, {"_id": 0}))
    return meals

@app.route('/buscar_refeicoes_diarias', methods=['GET'])
def buscar_refeicoes_diarias():
    all_meals = fetch_meals(collection)
    today = datetime.today().date()
    print("alimentos:", all_meals)
    meals_today = [meal for meal in all_meals if datetime.strptime(meal['data'], '%d-%m-%Y').date() == today]
    calories_today = [meal['calorias da refeicao']['Calories'] for meal in meals_today]
    print(calories_today, today)
    return jsonify(calories_today)
    

@app.route('/buscar_refeicoes', methods=['GET'])
def buscar_refeicoes():
    meals = fetch_meals(collection)
    print(meals)
    return jsonify(meals)



@app.route('/buscar_dieta', methods=['POST'])
def buscar_dieta():
    data = request.json
    dieta = []
    
    final_data = {
        'Calories': 0,
        'Gordura': 0,
        'Carbo': 0,
        'Proteina': 0,
        'Sodium': 0,
        'Calcium': 0,
        'Magnesium': 0,
        'Potassium': 0,
        'Ferro': 0,
        'Zinco': 0
    }
    
    for key, value in data.items():
        formated_data = f"{key} {value} grams"
        alimento_data = get_alimento(formated_data)
        dieta.append(formated_data)
        
        for nutrient, quantity in alimento_data.items():
            final_data[nutrient] += float(quantity)

    # Format the values to two decimal places before inserting into the database
    final_data = {nutrient: "{:.2f}".format(value) for nutrient, value in final_data.items()}

    
    date_string = date.today().strftime('%d-%m-%Y')
    collection.insert_one({"alimentos": dieta, "calorias da refeicao": final_data, "data": date_string})
    return jsonify(final_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)

