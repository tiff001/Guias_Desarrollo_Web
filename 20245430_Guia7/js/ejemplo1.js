// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElemento") || document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const usedControlIds = new Set();
const obtenerTipoElemento = (valor) => {
	const trimmed = valor.trim();
	if (!trimmed) return "";
	const match = trimmed.match(/type\s*=\s*["']?([a-zA-Z]+)["']?/i);
	if (match) return match[1].toLowerCase();
	if (/^<\s*textarea/i.test(trimmed)) return "textarea";
	if (/^<\s*select/i.test(trimmed)) return "select";
	return trimmed.toLowerCase();
};
newForm.querySelectorAll("[id]").forEach((control) => usedControlIds.add(control.id));

// AGREGANDO FUNCIONES
const vericarTipoElemento = function () {
	if (!cmbElemento.value.trim()) {
		alert("Debe seleccionar el elemento que se creará");
		return;
	}
	modal.show();
};

// Defina la siguiente función para crear un elemento de tipo SELECT.
const newSelect = function () {
	// Creando elementos
	let addElemento = document.createElement("select");

	// Creando atributos para el nuevo elemento
	addElemento.setAttribute("id", `id${nombreElemento.value}`);
	addElemento.setAttribute("class", "form-select");

	// Creando option para el select
	for (let i = 1; i <= 10; i++) {
		let addOption = document.createElement("option");
		addOption.value = i;
		addOption.innerHTML = `Opción ${i}`;
		addElemento.appendChild(addOption);
	}

	// Creando label para el nuevo control
	let labelElemento = document.createElement("label");
	labelElemento.setAttribute("for", `id${nombreElemento.value}`);
	labelElemento.textContent = tituloElemento.value;

	// Creando label de id
	let labelId = document.createElement("span");
	labelId.textContent = `ID de control : ${nombreElemento.value}`;

	// Creando plantilla de bootstrap para visualizar el nuevo elemento
	let divElemento = document.createElement("div");
	// Agregando atributos
	divElemento.setAttribute("class", "form-floating");

	// Creando el select que será hijo del div
	divElemento.appendChild(addElemento);
	// Creando el label que será hijo del div
	divElemento.appendChild(labelElemento);

	// Creando el SPAN que será hijo del nuevo Formulario
	newForm.appendChild(labelId);
	// Creando el Div que será hijo del nuevo Formulario
	newForm.appendChild(divElemento);
};

// Defina la siguiente función para crear un elemento de tipo RADIO o CHECKBOX.
const newRadioCheckbox = function (newElemento) {
	// Creando elementos
	let addElemento = document.createElement("input");

	// Creando atributos para el nuevo elemento
	addElemento.setAttribute("id", `id${nombreElemento.value}`);
	addElemento.setAttribute("type", newElemento);
	addElemento.setAttribute("class", "form-check-input");

	// Creando label para el nuevo control
	let labelElemento = document.createElement("label");
	labelElemento.setAttribute("class", "form-check-label");
	labelElemento.setAttribute("for", `id${nombreElemento.value}`);
	// Creando texto para label
	labelElemento.textContent = tituloElemento.value;

	// Creando label de id
	let labelId = document.createElement("span");
	labelId.textContent = `ID de control : ${nombreElemento.value}`;

	// Creando plantilla de bootstrap para visualizar el nuevo elemento
	let divElemento = document.createElement("div");
	// Agregando atributos
	divElemento.setAttribute("class", "form-check");

	// Creando el input que será hijo del div
	divElemento.appendChild(addElemento);
	// Creando el label que será hijo del div
	divElemento.appendChild(labelElemento);

	// Creando el SPAN que será hijo del nuevo Formulario
	newForm.appendChild(labelId);
	// Creando el Div que será hijo del nuevo Formulario
	newForm.appendChild(divElemento);
};

// Defina la siguiente función para crear un elemento de tipo TEXTAREA, TEXT, NUMBER, DATE U OTRO.
const newInput = function (newElemento) {
	const isTextarea = newElemento === "textarea";
	let addElemento = isTextarea ? document.createElement("textarea") : document.createElement("input");
	addElemento.setAttribute("id", `id${nombreElemento.value}`);
	if (!isTextarea) {
		addElemento.setAttribute("type", newElemento);
	} else {
		addElemento.removeAttribute("type");
		addElemento.setAttribute("rows", "3");
	}
	addElemento.setAttribute("class", "form-control");
	addElemento.setAttribute("placeholder", tituloElemento.value);

	// Creando label para el nuevo control
	let labelElemento = document.createElement("label");
	labelElemento.setAttribute("for", `id${nombreElemento.value}`);

	// Creando icono para el label
	let iconLabel = document.createElement("i");
	iconLabel.setAttribute("class", "bi bi-tag");

	// Creando texto para label
	labelElemento.textContent = tituloElemento.value;

	// Creando el elemento i como hijo del label, agregándolo le indicamos que se creará antes de su primer hijo
	labelElemento.insertAdjacentElement("afterbegin", iconLabel);

	// Creando label de id
	let labelId = document.createElement("span");
	labelId.textContent = `ID de control : ${nombreElemento.value}`;

	// Creando plantilla de bootstrap para visualizar el nuevo elemento
	let divElemento = document.createElement("div");
	// Agregando atributos
	divElemento.setAttribute("class", "form-floating mb-3");

	// Creando el input que será hijo del div
	divElemento.appendChild(addElemento);
	// Creando el label que será hijo del div
	divElemento.appendChild(labelElemento);

	// Creando el SPAN que será hijo del nuevo Formulario
	newForm.appendChild(labelId);
	// Creando el Div que será hijo del nuevo Formulario
	newForm.appendChild(divElemento);
};

const registrarNuevoControl = (tipo) => {
	const nombre = nombreElemento.value.trim();
	const idControl = `id${nombre}`;
	if (!nombre || document.getElementById(idControl) || usedControlIds.has(idControl)) {
		alert("El ID ingresado ya existe. Use un nombre diferente.");
		return false;
	}
	if (tipo === "select") {
		newSelect();
	} else if (tipo === "radio" || tipo === "checkbox") {
		newRadioCheckbox(tipo);
	} else {
		newInput(tipo);
	}
	usedControlIds.add(idControl);
	modal.hide();
	return true;
};

// Agregue eventos a los botones
buttonCrear.onclick = () => {
	vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
	const titulo = tituloElemento.value.trim();
	const nombre = nombreElemento.value.trim();
	const tipo = obtenerTipoElemento(cmbElemento.value);
	if (!titulo || !nombre || !tipo) {
		alert("Faltan campos por completar");
		return;
	}
	tituloElemento.value = titulo;
	nombreElemento.value = nombre;
	registrarNuevoControl(tipo);
};

const validarControles = () => {
	const controles = newForm.querySelectorAll("input, select, textarea");
	const invalidos = [];
	controles.forEach((control) => {
		const etiqueta = newForm.querySelector(`label[for="${control.id}"]`);
		const nombreCampo = etiqueta ? etiqueta.textContent.trim() : control.id;
		const tipo = control.type ? control.type.toLowerCase() : control.tagName.toLowerCase();
		let valido;
		if (tipo === "radio" || tipo === "checkbox") {
			valido = control.checked;
		} else if (tipo === "select-one") {
			valido = control.value !== "";
		} else {
			valido = control.value.trim() !== "";
		}
		if (!valido) invalidos.push(nombreCampo);
	});
	alert(invalidos.length ? `Complete o seleccione los campos: ${invalidos.join(", ")}` : "Todos los controles dinámicos están completos.");
};

buttonValidar.onclick = validarControles;

// Agregue la siguiente función para limpiar el formulario creado por el MODAL de Bootstrap.
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
	// Limpiando campos para los nuevos elementos
	tituloElemento.value = "";
	nombreElemento.value = "";
	// inicializando puntero en el campo del titulo para el control
	tituloElemento.focus();
});