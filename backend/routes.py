from datetime import datetime

from flask import Blueprint, jsonify, request
from database import get_connection
from email_worker import send_email

creditos_bp = Blueprint('creditos', __name__)

# Registrar un crédito
@creditos_bp.route('/api/creditos', methods=['POST'])
def registrar_credito():
    data = request.get_json()

    # Validación básica de datos
    campos = ['nombre_cliente', 'cedula', 'valor', 'tasa_interes', 'plazo_meses', 'comercial']
    for campo in campos:
        if campo not in data or str(data[campo]).strip() == '':
            return jsonify({"error": f"Falta el campo '{campo}'"}), 400
        
    # Validación de tipos y rangos
    try:
        valor        = float(data['valor'])
        tasa_interes = float(data['tasa_interes'])
        plazo_meses  = int(data['plazo_meses'])
    except ValueError:
        return jsonify({"error": "Valor, tasa de interés y plazo deben ser números"}), 400

    if valor <= 0:
        return jsonify({"error": "El valor del crédito debe ser mayor a 0"}), 400

    if tasa_interes <= 0 or tasa_interes > 100:
        return jsonify({"error": "La tasa de interés debe estar entre 0 y 100"}), 400

    if plazo_meses <= 0:
        return jsonify({"error": "El plazo en meses debe ser mayor a 0"}), 400

    if len(str(data['cedula']).strip()) < 5:
        return jsonify({"error": "La cédula debe tener al menos 5 caracteres"}), 400
        
    try:

        # Guardar el crédito en la base de datos
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO creditos (nombre_cliente, cedula, valor, tasa_interes, plazo_meses, comercial)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            data["nombre_cliente"],
            data["cedula"],
            data["valor"],
            data["tasa_interes"],
            data["plazo_meses"],
            data["comercial"]
        ))

        conn.commit()
        nuevo_id = cursor.lastrowid
        cursor.close()
        conn.close()

        send_email(
            nombre_cliente=data["nombre_cliente"],
            valor=data["valor"],
            comercial=data["comercial"],
            fecha= datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )

        return jsonify({"mensaje": "Crédito registrado exitosamente", "id": nuevo_id}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Consultar crédito con filtro
@creditos_bp.route('/api/creditos/', methods=['GET'])
def consultar_credito():

    # Parametros desde la URL
    nombre_cliente = request.args.get('nombre_cliente', '')
    cedula = request.args.get('cedula', '')
    comercial = request.args.get('comercial', '')
    orden = request.args.get('orden', 'fecha_registro')
    direccion = request.args.get('direccion', 'desc')

    # Permitir columnas validas
    columnas_validas  = ["fecha_registro", "valor"]
    direcciones_validas = ["ASC", "DESC"]
    if orden not in columnas_validas:
        orden = "fecha_registro"
    if direccion not in direcciones_validas:
        direccion = "DESC"

    try:
        conn   = get_connection()
        cursor = conn.cursor(dictionary=True)

        query  = """
            SELECT * FROM creditos
            WHERE nombre_cliente LIKE %s
              AND cedula          LIKE %s
              AND comercial       LIKE %s
        """
        query += f" ORDER BY {orden} {direccion}"

        cursor.execute(query, (f"%{nombre_cliente}%", f"%{cedula}%", f"%{comercial}%"))
        creditos = cursor.fetchall()

        # Convertir fechas a string
        for c in creditos:
            if c.get("fecha_registro"):
                c["fecha_registro"] = str(c["fecha_registro"])

        cursor.close()
        conn.close()

        return jsonify(creditos), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500