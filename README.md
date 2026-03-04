# Fya Social Capital — Sistema de Registro de Créditos

Aplicación web fullstack para registrar y consultar créditos. Desarrollada con **Next.js** en el frontend y **Flask (Python)** en el backend, con base de datos **MySQL** y envío automático de correos al registrar un crédito.

---

##  Tecnologías utilizadas

| Frontend | Next.js + Tailwind CSS |
| Backend | Python + Flask |
| Base de datos | MySQL |
| Envío de correos | SMTP (Gmail) + Threading asíncrono |

---

## Estructura del proyecto

```
creditos-app/
├── backend/
│   ├── app.py              # Punto de entrada del servidor
│   ├── database.py         # Conexión a MySQL
│   ├── routes.py           # Endpoints POST y GET /api/creditos
│   ├── email_worker.py     # Envío de correo asíncrono
│   ├── requirements.txt    # Dependencias Python
│   ├── database.sql        # Script para crear la BD y datos de ejemplo
│   └── .env.example        # Variables de entorno de ejemplo
│
└── frontend/
    └── src/
        └── app/
            ├── layout.js           # Navbar y estructura base
            ├── page.js             # Formulario de registro
            └── consulta/
                └── page.js         # Tabla de consulta con filtros
```

---

## Requisitos previos

- Python 3.10+
- Node.js 18+
- MySQL 8+

---

## Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Nicolas-Hamburger/credito-app-fya.git
cd creditos-app
```

### 2. Configurar la base de datos

Abre MySQL y ejecuta el script:

```bash
mysql -u root -p < database/database.sql
```

Esto crea la base de datos `fya_creditos`, la tabla `creditos` e inserta los 10 registros de ejemplo del anexo.

---

### 3. Configurar el backend

```bash
cd backend

# Crear y activar el entorno virtual
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

Crea el archivo `.env` basándote en `.env.example`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=fya_creditos

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=correo@gmail.com
MAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

> Para el correo necesitas una **Contraseña de Aplicación** de Google. Puedes generarla en: https://myaccount.google.com/apppasswords

Iniciar el servidor:

```bash
python app.py
```

El backend queda corriendo en: `http://127.0.0.1:5000`

---

### 4. Configurar el frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend queda corriendo en: `http://localhost:3000`

---

## 🌐 Endpoints del API

### `POST /api/creditos` — Registrar un crédito

**Body (JSON):**
```json
{
  "nombre_cliente": "Juan Pérez",
  "cedula": "123456789",
  "valor": 5000000,
  "tasa_interes": 2.0,
  "plazo_meses": 12,
  "comercial": "Vendedor Ejemplo"
}
```

**Respuesta exitosa (201):**
```json
{
  "mensaje": "Crédito registrado exitosamente",
  "id": 11
}
```

---

### `GET /api/creditos` — Consultar créditos

**Parámetros opcionales:**

Filtrar por nombre | `?nombre_cliente=Perez` |
Filtrar por cédula | `?cedula=1001` |
Filtrar por comercial | `?comercial=Demo` |
Columna a ordenar | `?orden=valor` |
ASC o DESC | `?direccion=ASC` |

---

## Envío de correo automático

Cada vez que se registra un crédito, se envía automáticamente un correo a `fyasocialcapital@gmail.com` con:

- Nombre del cliente
- Valor del crédito
- Nombre del comercial
- Fecha de registro

El envío se realiza **en segundo plano** usando `threading`, sin bloquear la respuesta al usuario.

---

## 📋 Funcionalidades

- ✅ Formulario de registro con validación de campos
- ✅ Guardado en base de datos MySQL
- ✅ Envío automático de correo asíncrono al registrar
- ✅ Tabla de consulta con todos los créditos
- ✅ Filtros por nombre, cédula y comercial
- ✅ Ordenamiento por fecha o valor (ASC/DESC)
- ✅ 10 registros de ejemplo precargados

---

## 👤 Autor

Desarrollado como prueba técnica para **Fya Social Capital**.