import requests

def connect(comida):
    url = 'https://api.edamam.com/api/nutrition-data'

    params = {
        'app_id': '',
        'app_key': '',
        'nutrition-type': 'logging',
        'ingr': comida
    }

    headers = {
        'accept': 'application/json'
    }

    response = requests.get(url, params=params, headers=headers)
    
    return response

def get_alimento(comida):
    response = connect(comida)
    data = response.json()
    nutrientes = data.get("totalNutrients")
    alimento = {
        "Calories": data["calories"], #Calorias
        "Gordura": nutrientes["FAT"]["quantity"], #Gordura
        "Carbo": nutrientes["CHOCDF"]["quantity"], #Carbo
        "Proteina": nutrientes["PROCNT"]["quantity"], #Proteina
        "Sodium": nutrientes["NA"]["quantity"], #Sodium
        "Calcium": nutrientes["CA"]["quantity"], #Calcium
        "Magnesium": nutrientes["MG"]["quantity"], #Magnesium
        "Potassium": nutrientes["K"]["quantity"], #Potassium
        "Ferro": nutrientes["FE"]["quantity"], #Ferro
        "Zinco": nutrientes["ZN"]["quantity"], #Zinco
    }

    return alimento
