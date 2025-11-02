//Leyendo elementos del DOM
const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");
constinputCarnet = document.querySelector("#inputCarnet");
const inputNombre = document.querySelector("#inputNombre");
const inputApellidos = document.querySelector("#inputApellidos");

btnAddEstudiante.addEventListener("click", guardarEstudiante);

function guardarEstudiante(){
    const nombre = inputNombre.value.trim();
    const carnet = inputCarnet.value.trim();
    const apellidos = inputApellidos.value.trim();
    const errores = validarDatos(carnet, nombre, apellidos);
    if(errores.length>0){
        alert("Errores: \n" + errores.join("\n"));
        return;
    } 
    const alumnos = recuperarEstudiantes();
    alumnos.push({carnet, nombre, apellidos});
    guardarEstudiantes(alumnos);
}

function guardarEstudiantes(estudiantes){   //guarda el JSON en localStorage, porque es un arreglo y lo convierte a cadena
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

function recuperarEstudiantes(){    //recupera el JSON del localStorage y lo convierte a un arreglo
    const data = localStorage.getItem("estudiantes");
    return data? JSON.parse(data) : [];
}

function validarDatos(carnet, nombre, apellidos){
    const errores = [];
    if(carnet.trim().legth == 0) {
        errores.push("El carnet es requerido");
    }
    if(nombre.trim().legth == 0) {
        errores.push("El nombre es requerido");
    }
    if(apellidos.trim().legth == 0) {
        errores.push("Los apellidos son requeridos");
    }
    return errores;
}