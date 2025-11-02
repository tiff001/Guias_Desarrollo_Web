//Generemos un número aleatorio que se encuentre en el rango de 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;

//Creamos una constante que permite identificar el máximo de intentos 
const numeroIntentos =3;

//Guardar el número de intentos que realiza el usuario
let intentos =1;
function generarNumeroAleatorio(){
    //Definimos una variable para impresión de mensajes 
    let mensaje;

    //Utilizamos el DOM para acceder para acceder al párrafo creado 
    const parrafo = document.querySelector("#idParrafo");

    //Verificamos en que intento está el usuario
    if (intentos <= numeroIntentos){
        let numero = prompt("¿Qué número se ha generado (Intento " +intentos+ ")?");

    //Verificamos el número aleatorio con el ingresado por el usuario
    if(numero == numeroAleatorio){
        mensaje = `¡Es sorprendente, pudiste adivinar el número oculto (${numeroAleatorio}). 
        Refresque la página para volver a jugar.`;

    }else if(intentos == numeroIntentos){
        mensaje = `Su número de intentos ha terminado.
        El número oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;

    }else{

        if(numero < numeroAleatorio){
            mensaje = `El número debe de ser más alto. Vuelve a intentarlo, te quedan ${numeroIntentos - intentos} intentos.`
        }else{
            mensaje = `El número debe ser más bajo. Vuelve a intentarlo, te quedan ${numeroIntentos - intentos} intentos.`
        }
    }

    //aumentamos el valor de los intentos
    intentos++;
    }else{
        mensaje = `Su número de intentos ha terminado.
        el númeo oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }   
    parrafo.innerHTML = mensaje;
}

