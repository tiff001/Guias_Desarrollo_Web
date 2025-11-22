const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const bodyModal = document.getElementById("idBodyModal");


function validarFormulario() {

    let errores = [];

    const nombres = document.getElementById("idNombre").value.trim();
    const apellidos = document.getElementById("idApellidos").value.trim();
    const fecha = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value.trim();
    const pass1 = document.getElementById("idPassword").value;
    const pass2 = document.getElementById("idPasswordRepetir").value;

    const pais = document.getElementById("idCmPais");
    const carrera = formulario.querySelector("input[name='idRdCarrera']:checked");

    const intereses = [
        document.getElementById("idCkProgramacion"),
        document.getElementById("idCkBD"),
        document.getElementById("idCkRedes"),
        document.getElementById("idCkSeguridad")
    ].filter(x => x.checked);


    // a) campos vacíos
    if (!nombres) errores.push("El nombre es obligatorio.");
    if (!apellidos) errores.push("El apellido es obligatorio.");
    if (!fecha) errores.push("La fecha de nacimiento es obligatoria.");
    if (!correo) errores.push("El correo es obligatorio.");

    // b) fecha no supere a hoy
if (fecha) {
    const hoy = new Date();
    hoy.setHours(0,0,0,0);  
    const f = new Date(fecha + "T00:00:00");  

    if (f > hoy) {
        errores.push("La fecha de nacimiento no puede superar la fecha actual.");
    }
}

    // c) regex correo
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo && !regex.test(correo)) errores.push("Correo inválido.");

    // d) contraseñas
    if (!pass1) errores.push("Debe escribir una contraseña.");
    if (!pass2) errores.push("Debe repetir la contraseña.");
    if (pass1 && pass2 && pass1 !== pass2) errores.push("Las contraseñas no coinciden.");

    // e) intereses
    if (intereses.length === 0) errores.push("Debe elegir al menos un interés.");

    // f) carrera
    if (!carrera) errores.push("Debe seleccionar una carrera.");

    // g) país
    if (pais.selectedIndex === 0) errores.push("Debe seleccionar un país.");

    if (errores.length > 0) {
        alert(errores.join("\n"));
        return false;
    }

    return true;
}


function mostrarDatosEnModal() {

    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    const tabla = document.createElement("table");
    tabla.className = "table table-bordered";

    const tbody = document.createElement("tbody");

    function addRow(label, value) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");

        td1.appendChild(document.createTextNode(label));
        td2.appendChild(document.createTextNode(value));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    }

    addRow("Nombres", document.getElementById("idNombre").value);
    addRow("Apellidos", document.getElementById("idApellidos").value);
    addRow("Fecha nacimiento", document.getElementById("idFechaNac").value);
    addRow("Correo", document.getElementById("idCorreo").value);

    // Carrera
    const carrera = formulario.querySelector("input[name='idRdCarrera']:checked");
    if (carrera) {
        const textoCarrera = carrera.nextElementSibling.innerText;
        addRow("Carrera", textoCarrera);
    }

    // País
    const pais = document.getElementById("idCmPais");
    addRow("País de origen", pais.options[pais.selectedIndex].text);

    // Intereses
    const intereses = [];
    if (idCkProgramacion.checked) intereses.push("Programación");
    if (idCkBD.checked) intereses.push("Base de Datos");
    if (idCkRedes.checked) intereses.push("Inteligencia Artificial");
    if (idCkSeguridad.checked) intereses.push("Seguridad Informática");

    addRow("Intereses", intereses.join(", "));

    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);

    modal.show();
}


button.onclick = () => {

    if (!validarFormulario()) return;

    mostrarDatosEnModal();
};