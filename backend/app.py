from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # permite acesso do frontend

# Constantes das taxas de desconto
TAXA_PIX = 0.40  # Taxa fixa para PIX
TAXA_DEBITO = 0.03  # 3% para débito
TAXA_CREDITO = 0.05  # 5% para crédito


def calcular_desconto(valor, metodo_pagamento):
    """
    Calcula o desconto e valor líquido baseado no método de pagamento.
    
    Args:
        valor: Valor da venda (float)
        metodo_pagamento: Método de pagamento (str) - 'pix', 'debito' ou 'credito'
    
    Returns:
        tuple: (desconto, valor_liquido) ou None se método inválido
    """
    metodo = metodo_pagamento.lower() if metodo_pagamento else None

    if metodo == "pix":
        desconto = TAXA_PIX
    elif metodo == "debito":
        desconto = valor * TAXA_DEBITO
    elif metodo == "credito":
        desconto = valor * TAXA_CREDITO
    else:
        return None

    valor_liquido = valor - desconto
    # Garante que o valor líquido nunca seja negativo
    valor_liquido = max(0, valor_liquido)
    desconto = min(desconto, valor)  # Ajusta desconto se necessário

    return round(desconto, 2), round(valor_liquido, 2)


@app.route("/calcular", methods=["POST"])
def calcular():
    """Endpoint para calcular valor líquido baseado no método de pagamento."""
    # Valida se o request contém JSON
    if not request.is_json:
        return jsonify({"erro": "Content-Type deve ser application/json"}), 400

    dados = request.json
    if dados is None:
        return jsonify({"erro": "Dados não fornecidos"}), 400

    # Valida e converte o valor
    valor_str = dados.get("valor")
    if valor_str is None:
        return jsonify({"erro": "Campo 'valor' é obrigatório"}), 400

    try:
        valor = float(valor_str)
    except (TypeError, ValueError):
        return jsonify({"erro": "Valor inválido. Deve ser um número"}), 400

    # Valida se o valor é positivo
    if valor <= 0:
        return jsonify({"erro": "Valor deve ser maior que zero"}), 400

    # Valida método de pagamento
    metodo = dados.get("metodo")
    if not metodo or metodo.strip() == "":
        return jsonify({"erro": "Campo 'metodo' é obrigatório"}), 400

    metodo = metodo.lower().strip()

    # Validação específica para PIX: valor deve ser maior que a taxa fixa
    if metodo == "pix" and valor <= TAXA_PIX:
        return jsonify({
            "erro": f"Para pagamento via PIX, o valor deve ser maior que R$ {TAXA_PIX:.2f}"
        }), 400

    # Calcula desconto e valor líquido
    resultado = calcular_desconto(valor, metodo)
    if resultado is None:
        return jsonify({"erro": "Método de pagamento inválido. Use: 'pix', 'debito' ou 'credito'"}), 400

    desconto, valor_liquido = resultado

    return jsonify({
        "valor_liquido": valor_liquido,
        "desconto": desconto,
        "valor_original": round(valor, 2)
    }), 200


if __name__ == "__main__":
    app.run(debug=True)
