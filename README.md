<h1 align="center">TIENDA ONLINE - MUNDO LANA -</h1>
<p align="center">
  <img src="https://res.cloudinary.com/dsrdpgpzy/image/upload/v1676769670/MULTIMEDIA/logo_gloprt.png" alt="Logo de la tienda Mundo Lana!">
</p>

- ### Para clonar el repositorio realizar el siguiente comando:
```
git clone https://github.com/YasaminAfshar/ProyectoFinalBackend-AfsharinejadYasmin.git
```

- ### Para instalar todas las dependencias que integran el proyecto se debe escribir en la terminal el siguiente comando:
`$ npm install`

- ### Para inicializar el proyecto con NODE se debe escribir en la terminal el siguiente comando:
`$ npm start`

- ### Para inicializar el proyecto con NODEMON se debe escribir en la terminal el siguiente comando:
`$ npm run dev`

- ### Para realizar el test unitario (solo del DAO de products) se debe escribir en la terminal el siguiente comando:
`$ npm run test:uni`

- ### Para poder visualizar la documentación API acceder al siguiente link:
[DOCUMENTACIÓN API](http://localhost:8080/docs/)


## Dependencias utilizadas para realizar el proyecto

- [Express](https://www.npmjs.com/package/express)
- [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
- [Express Session](https://www.npmjs.com/package/express-session)
- [MongoDB](https://www.mongodb.com/es)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Connect Mongo](https://www.npmjs.com/package/connect-mongo)
- [Mongoose Paginate V2](https://www.npmjs.com/package/mongoose-paginate-v2)
- [Passport](https://www.npmjs.com/package/passport)
- [Passport Local](https://www.npmjs.com/package/passport-local)
- [Passport Github2](https://www.passportjs.org/packages/passport-github2/)
- [Nodemailer](https://www.npmjs.com/package/nodemailer)
- [Socket Io](https://www.npmjs.com/package/socket.io)
- [Joi](https://www.npmjs.com/package/joi)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Faker js](https://www.npmjs.com/package/@faker-js/faker)
- [Swagger jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [Swagger ui express](https://www.npmjs.com/package/swagger-ui-express)
- [Winston](https://www.npmjs.com/package/winston)
- [Chai](https://www.npmjs.com/package/chai)
- [Mocha](https://www.npmjs.com/package/mocha)

## Datos para tener en cuenta a la hora de probar el funcionamiento:

- El email y contraseña del Administrador (ya se encuentra creado) es: 

```javascript
{
  "email": "adminCoder@coder.com",
  "password": "adminCoder123"
}
```
-Se recomienda probar todo con el email de uno propio para que pueda recibir los emails que se envian.

### Variables de entorno

Para hacer funcionar el proyecto, necesitas agregar un archivo .env donde agregues las siguientes variables de entornos con tus propios datos:


| Parameter                 | Type     | Description                                                                     |
| :-----------------------: | :------: | :-----------------------------------------------------------------------------: |
| `PORT`                    | `number` | **Required**. Puerto de conexión                                                |
| `MONGO_ATLAS_URL`         | `string` | **Required**. Url de conexión al mongo atlas tanto para el DEV como PROD        |
| `MONGO_ATLAS_TEST`        | `string` | **Required**. Url de conexión al mongo atlas para realizar los TESTING          |
| `CLIENT_ID_GITHUB`        | `string` | **Required**. Se obtiene el ID al generar registro específico en github         |
| `CLIENT_SECRET_GITHUB`    | `string` | **Required**. Se obtiene el secretKey al generar registro específico en github  |
| `ENV`                     | `string` | **Required**. Se debe agregar DEV (en desarrollo) o PROD (en producción)        |
| `EMAIL`                   | `string` | **Required**. Se obtiene al hacer registro para utilizar nodemailer gmail       |
| `PASSWORD`                | `string` | **Required**. Se obtiene al hacer registro para utilizar nodemailer gmail       |


### Acceder al link donde se realizó el deploy del proyecto en [fl0](https://app.fl0.com/):

Link de la página: [TIENDA ONLINE MUNDO LANA](https://mundo-lana.vercel.app/category/kit)
