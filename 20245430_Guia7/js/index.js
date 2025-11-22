// OBTENIENDO LA REFERENCIA DE LOS BOTONES
// POR MEDIO DEL .getElementById

const buttonSpan = document.getElementById("idBtnSpan");
const buttonP = document.getElementById("idBtnP");
const buttonDiv = document.getElementById("idBtnDiv");
const buttonButton = document.getElementById("idBtnButton");
const imprimir = document.getElementById("idImprimirResultado");

// DEFINICIÓN DE FUNCIONES
const contarElementos = function (elemento) {
	// OBTENIENDO EL NÚMERO DE ETIQUETAS QUE SE HAN CREADO EN EL DOCUMENTO HTML
	let arrayElement = document.getElementsByTagName(elemento);
	console.log(`Etiquetas buscadas <${elemento}></${elemento}> / Total encontradas : ${arrayElement.length}`);

	for (const i of arrayElement) {
		console.log(i);
	}

	alert("Revise la consola del navegador");
};

// DEFINICIÓN DE EVENTOS PARA LOS BOTONES
buttonSpan.onclick = () => {
	contarElementos("span");
};

buttonP.onclick = () => {
	contarElementos("p");
};

buttonDiv.onclick = () => {
	contarElementos("div");
};

buttonButton.onclick = () => {
	contarElementos("button");
};