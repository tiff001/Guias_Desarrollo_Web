//Acceder al contenedor donde se mostrar los estudiantes
const containerResultado = document.querySelector("#idContainerResultado");

//Acceder a cada botón por medio de la API DOM
const btnCalcular = document.querySelector("#idBtnCalcular");

//Agregar el evento click al botón calcular
//Se le asigna la función que realizará la operación
btnCalcular.addEventListener("click", calcularTabla);

function calcularTabla() {
    //capturando el valor del campo
    const inputTabla = document.querySelector("#inputTabla").value;

    //inicializamos nuestro contador
    let contador = 1;

    //verifiquemos que el dato colocado sea un numero entero positivo
    if (inputTabla > 0) {
        let tabla = `<h2>Tabla de multiplicar del ${inputTabla}</h2>`;
        //utilizaremos do while para generar la tabla de multiplicar
        //que el usuario ha indicado
        do {
            let resultado = contador * inputTabla;
            tabla += `<div class="row text-center">`;
            tabla += `<div class="col-md-1 colum"><h3>${contador}</h3></div>`;
            tabla += `<div class="col-md-1 colum-green"><h3>x</h3></div>`;
            tabla += `<div class="col-md-1 colum"><h3>${inputTabla}</h3></div>`;
            tabla += `<div class="col-md-1 colum-green"><h3>=</h3></div>`;
            tabla += `<div class="col-md-1 colum"><h3>${resultado}</h3></div>`;
            tabla += `</div>`;

            //incrementamos el valor del contador
            //para que podamos salir del do while
            contador++;
        } while (contador <= 12);

        document.querySelector("#inputTabla").value = 1;
        document.querySelector("#inputTabla").focus();
        containerResultado.innerHTML = tabla;
    } else {
        alert("No se ha ingresado un número válido");
    }
}
