/*Siguiendo la guía de scripts que habia que hacer, por motivos estructurales,
algunos scripts cumplen con 2 requisitos a la vez, como la retroalimentación
al usuario y las encuestas de valoración en la función de comentarios que
encontrará más abajo.*/


/*En cuanto a los cambios de Estilo, la página los incorpora dentro de su
estructura, el script de esta categoría en este caso es el que combina el
scroll vertical con el hecho de que cada sección ocupa un 100% del viewport
para dar la sensación de haber cambiado de página sin salir de la misma.
Las imágenes que cambian de tamaño fueron hechas con css ya que nos brinda
muchas opciones al respecto sin necesidad de utilizar Java Script*/


/*funcion para hacer smooth scrolling (vertical) a cada sección del main*/
function scr(element) {
    document.getElementById(element).scrollIntoView();  //Esta simple funcion nos hace scroll hasta la sección que lleva el ID que le pasamos por parámetro
}




/*Función para mejorar la visibilidad de la página que al mover cada
unidad de la rueda del raton, nos desplaza de a una sección por vez*/

window.addEventListener("wheel", function (event) {
    if (event.deltaY > 0) {
        window.scrollBy({
            top: window.innerHeight,
            left: 0,
            behavior: "smooth"
        });
    } else {
        window.scrollBy({
            top: -window.innerHeight,
            left: 0,
            behavior: "smooth"
        });
    }
});



/*Funcion para mover las diferentes secciones de lado.
El propósito de ésta función es desplazar de lado el
elemento que se le pasa como parametro y de esta manera
evitar que al hacer scroll vertical acabemos en alguna
parte en blanco de la página*/

function scrSide(direccion, n, idContainer) {//Le pasamos como parámetro la dirección (Izquierda o derecha) en la que queremos que se mueva el contenedor
    let porcentaje;     //Inicializamos la variable porcentaje para contrólar hasta qué punto del elemento queremos movernos
    switch (direccion) {
        case 'inicio':
            porcentaje = n;  //Si queremos ir al inicio del contenedor, nos dirigiremos al parámetro tal cual lo pasan
            break;
        case 'fin':
            porcentaje = -(n - (n / 7));  //En caso de querer ir al final del contenedor nos trasladamos negativamente hasta el total del contenedor menos 1/7 parte
            break;
        case 'siguiente':
            porcentaje = -n / 7;  //Si sólo queremos desplazarnos una unidad hacia la derecha, trasladamos el contenedor negativamente 1/7 parte de si mismo
            break;
        case 'anterior':
            porcentaje = -(100 * ((1 / 7) * n));   // Si queremos volver, el traslado se realiza calculando el porcentaje que ocupa la seccion actual menos lo que queremos desplazarnos
            break;
    }

    let container = document.getElementById(idContainer);
    container.style.transition = "transform 1.5s ease";  //Una vez calculada la distancia que queremos desplazarnos, aplicamos el transform con suavidad (ease)
    container.style.transform = "translateX(" + porcentaje + "%)";  //y lo trasladamos el porcentaje calculado
}



/*funcion para que los botones de la barra de navegación nos lleven a la url que le pasamos como parámetro*/
function redirect(website) {
    window.open(website);
}

/* Función del carrusel */

// Variable global para almacenar el índice del slide actual
var slideIndex = 1;

// Función para mostrar los slides del carrusel
function showSlides(idCarrusel, n) {
    // Obtener todos los elementos hijos del carrusel
    var hijos = document.getElementsByClassName(idCarrusel);

    // Si el índice del slide es mayor que la cantidad de slides, volver al primer slide
    if (n > hijos.length) {
        slideIndex = 1;
    }

    // Si el índice del slide es menor que 1, ir al último slide
    if (n < 1) {
        slideIndex = hijos.length;
    }

    // Ocultar todos los slides
    for (let i = 0; i < hijos.length; i++) {
        hijos[i].style.display = "none";
    }

    // Mostrar el slide actual
    hijos[slideIndex - 1].style.display = "flex";
}

// Función para avanzar o retroceder en los slides
function plusSlides(idCarrusel, n) {
    // Llamar a la función showSlides con el índice actualizado
    showSlides(idCarrusel, slideIndex += n);
}

// Función para mostrar un slide específico
function currentSlide(n) {
    // Llamar a la función showSlides con el índice del slide específico
    showSlides(idCarrusel, slideIndex = n);
}






/*Función para simular la retroalimentación a los usuarios,
no envía emails ni hace nada de ese nivel de complejidad ya
que no hemos visto la necesidad, pero si verifica los campos
y anuncia por pantalla si son o no correctos y de serlo, que
se enviará un correo a modo de confirmacion*/
function contacto() {
    // Obtener los valores de los campos de nombre, email y movimiento del formulario
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let movimiento = document.getElementById("movimiento").value;

    // Expresión regular para validar que el nombre contenga solo letras y espacios
    let regex = /^[a-zA-Z\s]+$/;
    // Expresión regular para validar el formato del email
    let regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Verificar si el nombre o el email no cumplen con las expresiones regulares
    if (!regex.test(nombre) || !regexMail.test(email)) {
        // Mostrar una alerta si el nombre o el email son incorrectos
        alert("Nombre o Email incorrectos.");
    } else {
        // Mostrar un mensaje de agradecimiento si los datos son válidos
        alert("Muchas gracias por suscribirte! " + nombre + " Recibirás un email mensual con lo último en " + movimiento +  " en tu email (" + email + ")" );
    }
    // Restablecer el formulario
    document.getElementById('contactForm').reset();
}







/*Función para verificar que se ha introducido un comentario y de ser asi,
lo une a la parte inferior del contenedor en orden.*/
function comment() {
    // Obtener los valores de los campos de nombre y comentario del formulario
    let nombre = document.getElementById("nombreComentario").value;
    let userComment = document.getElementById("comentario").value;

    // Verificar si alguno de los campos está vacío
    if (nombre == "" || userComment == "") {
        // Mostrar una alerta si alguno de los campos está vacío
        alert("Por favor, complete todos los campos");
        // Restablecer el formulario
        document.getElementById('commentForm').reset();
    } else {
        // Obtener el contenedor de comentarios
        const comentariosContainer = document.getElementById('comentariosContainer');
        // Crear un nuevo elemento de comentario
        const comentarioElement = document.createElement('div');
        // Asignar el contenido HTML del comentario
        comentarioElement.innerHTML = `<div class="comment"><h1>${nombre}</h1><p>${userComment}</p></div>`;
        // Agregar el elemento de comentario al contenedor de comentarios
        comentariosContainer.appendChild(comentarioElement);
        // Restablecer el formulario después de agregar el comentario
        document.getElementById('commentForm').reset();
    }
}


