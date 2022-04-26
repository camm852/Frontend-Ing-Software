# Zhoppy app

Este proyecto fue hecho con material UI, formik, y reac-elastic-carousel.

El proyecto fue pensado para que fuera con roles de administrador y de usuarios, un ecommerce, con pasarela de pago simulada en stripe.

La informacion de los zapatos y el path de la imagen estan en un json.

La aplicacion cuenta con una API hecha en java spring boot (microservicios), pero solo unas funcionalidades pues la aplicacion nunca se termino del todo.

Cuenta con login, registro, editar perfil, y agregar mas usuarios, ademas de verificacion con JWT, context y redux toolkit.

El despliegue de la app lo pueden encontrar en heroku [Zhoppy](https://zhoppyapp.herokuapp.com/ "Zhoppy") pero los servicios no estan desplegados asi que los pueden descargar junto con su base de datos(hecha en mysql) en el siguiente enlace [backend](https://drive.google.com/drive/folders/1Bf28clwqJSYGSQAS_x6VKdUjbwtSlup4?usp=sharing)

- La base de datos se debe llamar zhopy.
- los servicios se deben ejecutar en el siguiente orden:
  1.  ConfigService
  2.  EurekaService
  3.  GatewayService
  4.  AuthJWTService
  5.  UserService
