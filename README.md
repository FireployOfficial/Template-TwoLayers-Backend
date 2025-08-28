# 🚀 Desarrollo Full Stack: Creación, Gestión y Visualización de Datos con Node.js, Express, MySQL, API REST y ReactJS  

Capa de Frontend de la plantilla dos capas para el servicio de despliegues de Fireploy

---

## 📌 Descripción  

Este sistema integra:  
- **Backend:** Node.js + Express → API RESTful para operaciones CRUD en MySQL.  
- **Base de datos:** MySQL.  
- **Frontend:** ReactJS → Interfaz interactiva conectada a la API.  

Una solución completa y escalable para construir aplicaciones web modernas.  

## 🎨 Resultado esperado  

![Resultado final](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/crud-full-stack-con-node-y-react.png)  

---

## 📂 Estructura del proyecto  

- **api-rest-con-nodejs-express-mysql/** → Contiene la API REST en Node.js + Express (Backend).  
- **frontend/** → Aplicación ReactJS (Frontend).  

---

## Lista de Endpoint API

#### Método GET ✅

    👉 http://127.0.0.1:3000/alumnos

        [
            {
                "id": "1",
                "nombre_alumno": "Braudin",
                "email_alumno": "braudin@gmail.com",
                "curso_alumno": "React Native",
                "sexo_alumno": "M",
                "habla_ingles": "0",
                "fecha_registro": "2024-02-18 20:49:51"
            },
            {
                "id": "16",
                "nombre_alumno": "urian Viera",
                "email_alumno": "urian@gmail.com",
                "curso_alumno": "REACT",
                "sexo_alumno": "M",
                "habla_ingles": "0",
                "fecha_registro": "2024-02-18 20:58:43"
            }
        ]

#### Método GET ✅

    👉 http://127.0.0.1:3000/alumnos/16
        {
            "id": "16",
            "nombre_alumno": "urian Viera",
            "email_alumno": "urian@gmail.com",
            "curso_alumno": "REACT",
            "sexo_alumno": "M",
            "habla_ingles": "0",
            "fecha_registro": "2024-02-18 20:58:43"
        }

#### Método POST ✅

    👉 http://127.0.0.1:3000/alumnos
        {
            "nombre_alumno": "Torres ",
            "email_alumno": "torres@gmail.com",
            "curso_alumno": "sql",
            "sexo_alumno": "F",
            "habla_ingles": "1",
            "fecha_registro": "2024-02-18 20:49:51"
        }

#### Método PUT ✅

    👉 http://127.0.0.1:3000/alumnos/18
        {
            "id": "1",
            "nombre_alumno": "Braudin Laya",
            "email_alumno": "braudin@gmail.com",
            "curso_alumno": "React Native",
            "sexo_alumno": "M",
            "habla_ingles": "0",
            "fecha_registro": "2024-02-18 20:49:51"
        }

#### Método DELETE ✅

    👉 http://127.0.0.1:3000/alumnos/15


---

## 🙌 Créditos  

Este proyecto es un **fork** del trabajo original de [urian121](https://github.com/urian121).  
Los créditos corresponden al autor original; este repositorio busca fines de **aprendizaje, personalización y mejora** sobre su propuesta.  


