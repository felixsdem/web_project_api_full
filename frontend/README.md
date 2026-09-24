# Around The U.S. - React

## Descripción

Este proyecto es una adaptación a React del proyecto Around The U.S. desarrollado anteriormente con HTML, CSS y JavaScript.

El proyecto utiliza React y Vite para construir una interfaz basada en componentes. La aplicación se conecta a una API para obtener y actualizar la información del usuario y las tarjetas, utilizando estado, efectos y contexto de React.

## Funcionalidades

* Renderización de la interfaz mediante componentes de React.
* Obtención de la información del usuario y las tarjetas desde una API.
* Registro de nuevos usuarios mediante correo electrónico y contraseña.
* Inicio de sesión mediante autenticación con JWT.
* Cierre de sesión mediante la eliminación del JWT almacenado.
* Persistencia de la sesión al recargar la página.
* Recuperación de la información del usuario autenticado al iniciar la aplicación.
* Uso de `useState`, `useEffect`, `useContext` y `useRef`.
* Gestión del usuario mediante `CurrentUserContext`.
* Apertura y cierre de ventanas emergentes.
* Validación de formularios antes de realizar solicitudes a la API.
* Edición del nombre y la descripción del perfil.
* Actualización del avatar del usuario.
* Creación y eliminación de tarjetas.
* Funcionalidad de like y dislike en las tarjetas.
* Visualización de imágenes en una ventana emergente.
* Actualización de la interfaz mediante el estado de React después de las solicitudes a la API.

## Autenticación y persistencia

### Registro

El usuario puede crear una cuenta utilizando un correo electrónico y una contraseña desde la página de registro.

Después de completar el registro correctamente, la aplicación muestra un mensaje de confirmación y redirige al usuario a la página de inicio de sesión.

### Inicio de sesión

El usuario puede iniciar sesión utilizando sus credenciales.

Cuando la autenticación es correcta:

1. La API devuelve un token JWT.
2. El token se guarda en `localStorage`.
3. La aplicación obtiene la información del usuario autenticado.
4. El usuario accede a la página principal.

### Cierre de sesión

Al pulsar el botón **“Cerrar sesión”**:

1. Se elimina el JWT de `localStorage`.
2. Se restablece el estado del usuario.
3. Se cierra la sesión.
4. El usuario es redirigido a la página de inicio de sesión.

### Persistencia de la sesión

Al iniciar la aplicación, se comprueba si existe un JWT guardado en `localStorage`.

Si existe un token:

1. La aplicación lo valida mediante la API.
2. Se recupera la información del usuario.
3. Se mantiene la sesión iniciada después de recargar la página.

Si el token no existe o no es válido, el usuario es redirigido a la página de inicio de sesión.

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* React
* React Router
* Vite
* Git
* GitHub
* API REST
* JWT
* `localStorage`

## Instalación y ejecución

Para ejecutar el proyecto localmente:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/felixsdem/web_project_around_auth.git
   ```

2. Accede a la carpeta del proyecto:

   ```bash
   cd web_project_around_auth
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Ejecuta el proyecto en modo desarrollo:

   ```bash
   npm run dev
   ```

5. Para comprobar el código mediante ESLint:

   ```bash
   npm run lint
   ```

6. Para generar la versión de producción:

   ```bash
   npm run build
   ```

## Autor

Félix Sinovas
