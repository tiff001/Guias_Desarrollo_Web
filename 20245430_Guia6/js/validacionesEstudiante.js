//Ficha estudiante
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formEstudiante");
  const mensajeExito = document.getElementById("mensajeExito");

  const campos = {
    carnet: {
      input: document.getElementById("carnet"),
      // 2 letras + 3 dígitos
      regex: /^[A-Za-z]{2}\d{3}$/,
    },
    nombreCompleto: {
      input: document.getElementById("nombreCompleto"),
      // Solo letras (incluye acentos y ñ) y espacios, al menos dos palabras
      regex:
        /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/,
    },
    dui: {
      input: document.getElementById("dui"),
      // ########-#
      regex: /^\d{8}-\d$/,
    },
    nit: {
      input: document.getElementById("nit"),
      // ####-######-###-#
      regex: /^\d{4}-\d{6}-\d{3}-\d$/,
    },
    fechaNacimiento: {
      input: document.getElementById("fechaNacimiento"),
      // dd/mm/aaaa con validación básica de rangos
      regex:
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
    },
    correo: {
      input: document.getElementById("correo"),
      // Regex sencilla para correo
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    edad: {
      input: document.getElementById("edad"),
      // Solo números, 1 a 3 dígitos
      regex: /^\d{1,3}$/,
    },
  };

  function validarCampo(campo) {
    const { input, regex } = campo;
    const valor = input.value.trim();

    if (regex.test(valor)) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      return true;
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      return false;
    }
  }

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    mensajeExito.classList.add("d-none");

    let formularioValido = true;

    for (const key in campos) {
      const esValido = validarCampo(campos[key]);
      if (!esValido) {
        formularioValido = false;
      }
    }

    if (formularioValido) {
      mensajeExito.classList.remove("d-none");
  
    }
  });

  for (const key in campos) {
    campos[key].input.addEventListener("blur", () => {
      validarCampo(campos[key]);
    });
  }
});