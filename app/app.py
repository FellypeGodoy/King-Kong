from flask import Flask, render_template, request, jsonify
from api import get_alimento
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('pagina.html')


@app.route('/dieta')
def dieta():
    return render_template('pagina2.html')


@app.route('/buscar_dados', methods=['POST'])
def buscar_dados():
    data = f"{request.json.get('alimento')} 100 grams"

    final_data = get_alimento(data)
    
    return jsonify(final_data)


@app.route('/buscar_dieta', methods=['POST'])
def buscar_dieta():
    data = request.json
    
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
        
        for nutrient, quantity in alimento_data.items():
            final_data[nutrient] += float(quantity)
    
    final_data = {nutrient: "{:.2f}".format(value) for nutrient, value in final_data.items()}
    
    return jsonify(final_data)

if __name__ == '__main__':
    app.run(debug=True)
