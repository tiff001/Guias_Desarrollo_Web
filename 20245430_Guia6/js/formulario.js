//Accediendo a los elementos HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");
const contenedorTablaPacientes = document.getElementById("idTablaPacientes");

//Botones
const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

// Notificaciones
const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];
let pacienteEnEdicion = null;

/*
Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/
const limpiarForm = () => {
	inputNombre.value = "";
	inputApellido.value = "";
	inputFechaNacimiento.value = "";
	inputRdMasculino.checked = false;
	inputRdFemenino.checked = false;
	cmbPais.value = 0;
	inputDireccion.value = "";
	inputNombrePais.value = "";
	inputNombre.focus();
	pacienteEnEdicion = null;
	buttonAgregarPaciente.innerHTML = `<i class="bi bi-person-plus-fill"></i> Guardar Datos`;
};

/*
Funcion para validar el ingreso del paciente
*/
const addPaciente = function () {
	let nombre = inputNombre.value.trim();
	let apellido = inputApellido.value.trim();
	let fechaNacimiento = inputFechaNacimiento.value;
	let sexo =
		inputRdMasculino.checked == true
			? "Hombre"
			: inputRdFemenino.checked == true
			? "Mujer"
			: "";
	let pais = cmbPais.value;
	let labelPais = cmbPais.options[cmbPais.selectedIndex]?.text ?? "";
	let direccion = inputDireccion.value.trim();

	if (
		nombre !== "" &&
		apellido !== "" &&
		fechaNacimiento !== "" &&
		sexo !== "" &&
		pais !== "0" &&
		direccion !== ""
	) {
		const paciente = {
			nombre,
			apellido,
			fechaNacimiento,
			sexo,
			paisValor: pais,
			paisEtiqueta: labelPais,
			direccion,
		};

		if (pacienteEnEdicion !== null) {
			arrayPaciente[pacienteEnEdicion] = paciente;
			mensaje.innerHTML = "Se actualizó la información del paciente";
		} else {
			arrayPaciente.push(paciente);
			mensaje.innerHTML = "Se ha registrado un nuevo paciente";
		}

		toast.show();
		limpiarForm();
		pacienteEnEdicion = null;
		imprimirPacientes();
	} else {
		mensaje.innerHTML = "Faltan campos por completar";
		toast.show();
	}
};

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
	let $fila = "";

	arrayPaciente.forEach((paciente, indice) => {
		const contador = indice + 1;
		$fila += `<tr>
<td scope="row" class="text-center fw-bold">${contador}</td>
<td>${paciente.nombre}</td>
<td>${paciente.apellido}</td>
<td>${paciente.fechaNacimiento}</td>
<td>${paciente.sexo}</td>
<td>${paciente.paisEtiqueta}</td>
<td>${paciente.direccion}</td>
<td>
	<button type="button" class="btn btn-primary" data-accion="editar" data-indice="${indice}">
		<i class="bi bi-pencil-square"></i>
	</button>
	<button type="button" class="btn btn-danger" data-accion="eliminar" data-indice="${indice}">
		<i class="bi bi-trash3-fill"></i>
	</button>
</td>
</tr>`;
	});

	return $fila;
}

const imprimirPacientes = () => {
	if (!arrayPaciente.length) {
		contenedorTablaPacientes.innerHTML = "Ninguno";
		return;
	}

	contenedorTablaPacientes.innerHTML = `<div class="table-responsive">
<table class="table table-striped table-hover table-bordered">
	<tr>
		<th scope="col" class="text-center" style="width:5%">#</th>
		<th scope="col" class="text-center" style="width:15%">Nombre</th>
		<th scope="col" class="text-center" style="width:15%">Apellido</th>
		<th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
		<th scope="col" class="text-center" style="width:10%">Sexo</th>
		<th scope="col" class="text-center" style="width:10%">País</th>
		<th scope="col" class="text-center" style="width:25%">Dirección</th>
		<th scope="col" class="text-center" style="width:10%">Opciones</th>
	</tr>
	${imprimirFilas()}
</table>
</div>`;
};

// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
	let paisNew = inputNombrePais.value;

	if (paisNew != "") {
		let option = document.createElement("option");
		option.textContent = paisNew;
		option.value = contadorGlobalOption + 1;
		cmbPais.appendChild(option);
		contadorGlobalOption++;
		mensaje.innerHTML = "Pais agregado correctamente";
		toast.show();
	} else {
		mensaje.innerHTML = "Faltan campos por completar";
		toast.show();
	}
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
	limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
	addPaciente();
};

buttonMostrarPaciente.onclick = () => {
	imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
	addPais();
};

// Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
	inputNombrePais.value = "";
	inputNombrePais.focus();
});

// Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();

const cargarPacienteEnFormulario = (indice) => {
	const paciente = arrayPaciente[indice];
	if (!paciente) return;

	inputNombre.value = paciente.nombre;
	inputApellido.value = paciente.apellido;
	inputFechaNacimiento.value = paciente.fechaNacimiento;
	inputRdMasculino.checked = paciente.sexo === "Hombre";
	inputRdFemenino.checked = paciente.sexo === "Mujer";
	cmbPais.value = paciente.paisValor;
	inputDireccion.value = paciente.direccion;

	buttonAgregarPaciente.innerHTML = `<i class="bi bi-save"></i> Actualizar paciente`;
	pacienteEnEdicion = indice;
	inputNombre.focus();
};

const eliminarPaciente = (indice) => {
	if (indice < 0 || indice >= arrayPaciente.length) return;

	arrayPaciente.splice(indice, 1);

	if (pacienteEnEdicion === indice) {
		limpiarForm();
	} else if (pacienteEnEdicion !== null && pacienteEnEdicion > indice) {
		pacienteEnEdicion -= 1;
	}

	mensaje.innerHTML = "Paciente eliminado";
	toast.show();
	imprimirPacientes();
};

contenedorTablaPacientes.addEventListener("click", (event) => {
	const boton = event.target.closest("button[data-accion]");
	if (!boton) return;

	const indice = Number(boton.dataset.indice);
	if (Number.isNaN(indice)) return;

	if (boton.dataset.accion === "editar") {
		cargarPacienteEnFormulario(indice);
	} else if (boton.dataset.accion === "eliminar") {
		eliminarPaciente(indice);
	}
});