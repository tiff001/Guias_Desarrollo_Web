
// Leyendo elementos del DOM
const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");
const inputCarnet = document.querySelector("#inputCarnet");
const inputNombre = document.querySelector("#inputNombre");
const inputApellidos = document.querySelector("#inputApellidos");
const container = document.querySelector('#idContainerEstudiantes');

//Esta variable almacena el carnet del estudiante que se estÃ¡ editando
let carnetEditando = null;


btnAddEstudiante.addEventListener("click", guardarEstudiante);
btnViewEstudiantes.addEventListener('click', mostrarEstudiantes);
document.addEventListener('DOMContentLoaded', () => {
    mostrarEstudiantes();
    inputCarnet.focus();
});

//Almacena el arreglo de estudiantes en el localstorage
function guardarEstudiantes(estudiantes) {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}


// Recupera el arreglo de estudiantes desde el localstorage
function recuperarEstudiantes() {
    const data = localStorage.getItem("estudiantes");
    return data ? JSON.parse(data) : [];
}

function guardarEstudiante() {
    const nombre = inputNombre.value.trim();
    const carnet = inputCarnet.value.trim();
    const apellidos = inputApellidos.value.trim();
    const errores = validarDatos(carnet, nombre, apellidos); //esta funcion devuelve un arreglo de errores
    if (errores.length > 0) { // Si hay algun elemento en el arreglo de errores
        alert("Errores: \n " + errores.join("\n ")); //Esto se puede imprimir en una cajita de errores
        return;
    }

    const estudiantes = recuperarEstudiantes(); // Leyendo la lista de estudiantes desde el localstorage
    const estudiante = { carnet, nombre, apellidos }; //Creando un objeto literal

   
    if (carnetEditando) {  // Verificar si estamos en modo ediciÃ³n
        if (carnetEditando !== carnet) {
            alert('No se puede modificar el carnet de un estudiante');
            return;
        }

        // Actualizar estudiante existente
        const indice = estudiantes.findIndex(est => est.carnet === carnet); //Recuperamos el indice del estudiante que estamos modificando
        if (indice !== -1) {
            estudiantes[indice] = estudiante;
            guardarEstudiantes(estudiantes);
            alert('Estudiante modificado exitosamente');
        }
    }
    else { // Si estamos en modo inserciÃ³n

        //Verificamos si ya existe un estudiante con ese carnet
        const existe = estudiantes.some(est => est.carnet === carnet);
        if (existe) {
            alert('Ya existe un estudiante con ese carnet');
            return;
        }
        //Agregar nuevo estudiante
        estudiantes.push(estudiante);
        guardarEstudiantes(estudiantes);
        alert('Estudiante agregado exitosamente');
    }
    mostrarEstudiantes();
    limpiarFormulario();

}



function validarDatos(carnet, nombre, apellidos) {
    const errores = [];
    if (carnet.trim().length == 0) {
        errores.push("El carnet es requerido");
    }
    if (nombre.trim().length == 0) {
        errores.push("El nombre es requerido");
    }
    if (apellidos.trim().length == 0) {
        errores.push(" Los apellidos son requeridos");
    }
    return errores;
}

function mostrarEstudiantes() {
    const estudiantes = recuperarEstudiantes();//Leyendo los estudiantes desde el localstorage

    if (estudiantes.length === 0) {
        container.innerHTML = `
      <div class="alert alert-info">
        No hay estudiantes registrados
      </div>
    `;
        return;
    }

    let tabla = `
    <table class="table table-light table-striped">
      <thead>
        <tr>
          <th scope="col" style="width: 5%;">#</th>
          <th scope="col" style="width: 15%;">Carnet</th>
          <th scope="col">Nombres</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Operaciones</th>
        </tr>
      </thead>
      <tbody>
  `;

    estudiantes.forEach((estudiante, index) => {
        tabla += `
      <tr>
        <td scope="row" style="font-weight: bold;">${index + 1}</td>
        <td>${estudiante.carnet}</td>
        <td>${estudiante.nombre}</td>
        <td>${estudiante.apellidos}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="modificarEstudiante('${estudiante.carnet}')">
            Modificar
          </button>
          <button class="btn btn-danger btn-sm" onclick="eliminarEstudiante('${estudiante.carnet}')">
            Eliminar
          </button>
        </td>
      </tr>
    `;
    });

    tabla += `
      </tbody>
    </table>
    <div class="mt-3">
      <strong>Total de estudiantes:</strong> ${estudiantes.length}
    </div>
  `;

    container.innerHTML = tabla;
}

function limpiarFormulario() {
    inputCarnet.value = '';
    inputNombre.value = '';
    inputApellidos.value = '';
    carnetEditando = null;
    btnAddEstudiante.textContent = 'Agregar Estudiante';
    inputCarnet.focus();
}

function modificarEstudiante(carnet) {
    const estudiantes = recuperarEstudiantes();
    const estudiante = estudiantes.find(est => est.carnet === carnet);

    if (estudiante) {
        inputCarnet.value = estudiante.carnet;
        inputNombre.value = estudiante.nombre;
        inputApellidos.value = estudiante.apellidos;

        carnetEditando = carnet;
        btnAddEstudiante.textContent = 'Actualizar Estudiante';

        inputNombre.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}


function eliminarEstudiante(carnet) {
  const estudiantes = recuperarEstudiantes();
  const estudiante = estudiantes.find(est => est.carnet === carnet);

  if (!estudiante) {
    alert('No se encontrÃ³ el estudiante');
    return;
  }

  const confirmacion = confirm(
    `Â¿EstÃ¡s seguro que deseas eliminar al estudiante?\n\n` +
    `${estudiante.nombre} ${estudiante.apellidos}\n` +
    `Carnet: ${estudiante.carnet}`
  );

  if (confirmacion) {
    const nuevosEstudiantes = estudiantes.filter(est => est.carnet !== carnet);
    guardarEstudiantes(nuevosEstudiantes);
    alert('Estudiante eliminado exitosamente');
    
    if (carnetEditando === carnet) {
      limpiarFormulario();
    }
    
    mostrarEstudiantes();
  }
}