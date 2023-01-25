from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

def isfloat(num):
    try:
        float(num)
        return True
    except ValueError:
        return False

def calcHipotenusa (num1,num2):
    return (((num1 ** 2) + (num2 ** 2)) ** (1/2))

def calcCateto (num1,num2):
    return (((num1 ** 2) - (num2 ** 2)) ** (1/2))

  
@app.route('/', methods= ['POST'])
def calculadora():
        body = request.get_json()
        body = body['data']
        cateto1 = body['c1']
        cateto2 = body['c2']
        hipotenusa = body['h']
        cateto1 = float(cateto1) if isfloat(cateto1) else 0
        cateto2 = float (cateto2) if isfloat(cateto2) else 0
        hipotenusa = float (hipotenusa)   if isfloat(hipotenusa) else 0
        if (hipotenusa == 0): 
            resultTemp = calcHipotenusa(cateto1,cateto2)
            resultDic = {
                'h': resultTemp,
                'c1':cateto1,
                'c2':cateto2,
                'result': resultTemp
            }
            return jsonify(resultDic)
        elif (cateto1 == 0) :
            resultTemp = calcCateto(hipotenusa,cateto2)
            resultDic = {
                'c1': resultTemp,
                'h':hipotenusa,
                'c2':cateto2,
                'result': resultTemp
            }
            return jsonify(resultDic)
        else:
            resultTemp = calcCateto(hipotenusa,cateto1)
            resultDic = {
                'c2': resultTemp,
                'c1':cateto1,
                'h':hipotenusa,
                'result': resultTemp
            }
            return jsonify(resultDic)


app.run(debug=True)