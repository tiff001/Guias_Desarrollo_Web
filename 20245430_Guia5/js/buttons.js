
function aviso(){
    alert ("Bienvenido al mundo JavaScript");
}

function confirmacion(){
    //Los valores que puede almacenar la variable confirmación 
    //Son true o false 

    let confirmacion = confirm("¿Desea salir de la sesión?");
    /*Para imprimir una variable en una cadena podemos utilizar las
    comillas simples inversas `` y luego hacemos el llamado de la 
    variable con ${aquí debera escribir el nombre de la variable}*/

    alert (`valor seleccionado ${confirmacion}`);
}

function capturarDatos(){
    let nombre = prompt("¿Cuál es su nombre?");
    //Notese que el campo de promt se mostará 0 por defecto 
    let edad = prompt("¿Cuál es su edad?", 0);

    alert (`Su nombre es ${nombre} y su edad ${edad}`);
}

function dibujarParrafo(){
    let parrafo = prompt(
        "Escriba la información que desea visualizar en el párrafo"
    );

    /*Utilizaremos la API DOM para acceder al elemento 
    <p id = "idParrafo></p> que se ha creado en el HTML*/

    const p = document.querySelector("#idParrafo");
    p.innerHTML = parrafo;
}