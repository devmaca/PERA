 # PLATAFORMA EDUCATIVA

Para la gestion de contenidos de aprendizaje dirigido a la UE. Aroma

## Desarrollo del Proyecto
En este proyecto esta desarrollado con :
### Backend
* Javascript
* Sql (Structure Query Language)
* Nodejs
* Mysql (SGBD)
* Expressjs (Framework)

### Frontend
* Html
* Javascript
* CSS
* Boostrap v4
* Pug (Motor de vistas)

## Instalacion
Requisitos:
Git, Nodejs, Mysql.

1. Clonar el codigo del repositorio de git hub usando el comando `git clone https://github.com/devmaca/PERA.git` en la consola de comandos
2. Escribir `npm install --save` para instalar las dependencias del proyecto 
3. Para iniciar la aplicacion use el comando `npm run startdev` 
4. luego escribir en la URL del navegador `localhost:3000` para abrir la plataforma

## Manual de usuario
Una vez iniciada la plataforma

Existen tres tipos de usuario: **administrador, docente y estudiante**.
### Accesos
- Los usuarios administrador y docentes debe iniciar con **user** y **password**
- Los usuarios estudiante no requiere autenticacion

### Navegacion

#### Estudiante 
Para visualizar el contenido simplemente debe acceder a la opcion de  : `cursos` en la barra de navegacion

1. seleccionar el nivel
2. seleccionar el curso
3. seleccionar el area
4. seleccionar contenido

#### Docente

- Crear Curso Nuevo

  Para crear un nuevo curso  debe acceder a la opcion de : `crear curso` en la barra de navegacion, luego llenar los campos del formulario
  - Escribir el nombre del curso
  - Luego seleccionar el nivel del curso
  - Luego seleccionar el boton de guardar.

- Subir Contenido Documento (pdf)

  En esta parte la plataformas solo acepta archivos electronicos de preferencia formato **pdf**.

  - Para subir un contenido debe seleccionar la opcion **documento** del curso correspondiente.
  - Luego llenar datos e informacion del contenido en el formulario
  - En campo **subir archivo** debe seleccionar un archivo en formato **pdf** de su ordenador
  
 - Subir video
 
   Para subir contenido de video se debe tener el enlace del video de la plataforma de Youtube
   
   -  Seleccionar la opcion **video** del curso correspondiente
   -  Llenar los campos del formulario
   -  En el campo de URL solo se debe poner el enlace del video de Youtube, el ejemplo  se lo muestra en el sitio
   -  Luego darle a guardar
  
  - Ver contenidos
  
    Para ver los contenidos de los cursos solo seleccionar la opcion **ver** del curso correspondiente.
    
    Luego seleccionar el contenido para su visualizacion.
    
    
#### Administrador
El usuario administrador tiene el control de los usuarios docentes, donde puede eliminar crear o modificar.

- Crear Nuevo Usuario
  
  Debe seleccionar la opcion **Crear Nuevo Usuario**
  
  Luego llenar los campos del formulario con los datos del nuevo usuario
  
## Recomendaciones
Este proyecto estara modificandose constantemente hasta llegar a una version final estable.
desplegado en : https://app-aroma.herokuapp.com/




