//Acceder al contenedor donde se muestran estudiantes
const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

//Acceder a cada botón pot medio de la API DOM
const btnPromedio = document.querySelector("#idBtnPromedio");

//Agregar el evento click a los botones, adicionalmente se le acciona la función que realizará
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    // utilizaremos un arreglo para guardar la informacion del estudiante
    let arrayEstudiante = new Array();

    let totalEstudiantes = document.querySelector("#inputNumeroEstudiantes").value;
    let contador = 1;

    // Utilizaremos un while para recorrer el total de estudiantes
    let estudiante,
        calificacion,
        convertir = 0;

    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);

        // verificando que sea un valor entero positivo
        // y que se encuentre en el rango de 0 - 10
        do {
            calificacion = prompt(
                `Ingrese la calificacion del estudiante ${contador}`
            );

            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        // Asignando los valores al arreglo
        arrayEstudiante[contador - 1] = new Array(
            estudiante,
            parseFloat(calificacion).toFixed(2)
        );
        contador++;
    }

    // Recorriendo el arreglo con for..of
    // Verificaremos cual es el promedio de las calificaciones
    // y cual de los estudiantes posee la calificacion mas alta
    let calificacionAlta = 0,
        promedio = 0,
        posicion = 0;

    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";

    for (let indice of arrayEstudiante) {
        let nombre = indice[0];
        let nota = indice[1];

        // imprimiendo lista de estudiantes
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;

        // verificacion de calificacion mas alta
        if (nota > calificacionAlta) {
            posicion = indice;
        }

        // calculando el promedio
        promedio += parseFloat(nota);
    }

    listado += "</ol>";
    promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    listado += `<br><b>Estudiante con mejor calificación:</b> ${posicion[0]}</p>`;

    // Imprimiendo resultado
    containerEstudiantes.innerHTML = listado;
}
