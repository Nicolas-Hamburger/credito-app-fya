import smtplib
import os
import threading
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart  
from dotenv import load_dotenv

load_dotenv()

def send_email(nombre_cliente, valor, comercial, fecha):

    def send():
        try:
            msg = MIMEMultipart()
            msg["From"]    = os.getenv("MAIL_USER")
            msg["To"]      = "fyasocialcapital@gmail.com"
            # msg["To"]      = "nicolas132331@gmail.com"
            msg["Subject"] = f"Nuevo crédito registrado - {nombre_cliente}"

            cuerpo = f"""
            Se ha registrado un nuevo crédito:

            Cliente:    {nombre_cliente}
            Valor:      ${float(valor):,.2f}
            Comercial:  {comercial}
            Fecha:      {fecha}
            """

            msg.attach(MIMEText(cuerpo, "plain"))

            with smtplib.SMTP(os.getenv("MAIL_HOST"), int(os.getenv("MAIL_PORT"))) as server:
                server.starttls()
                server.login(os.getenv("MAIL_USER"), os.getenv("MAIL_PASSWORD"))
                server.send_message(msg)

            print(f"Correo enviado para {nombre_cliente}")

        except Exception as e:
            print(f"Error enviando correo: {e}")

    hilo = threading.Thread(target=send)
    hilo.start()