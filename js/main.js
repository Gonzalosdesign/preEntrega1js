/* PRE-ENTREGA 1 - Gonzalo Souto - 2023

Este script simula un proceso de importación y ventas

- declara variables globales
- declara las funciones

- inicia el programa llamando a la funcion importar()
    - solicita los datos de importación
    - llama a la función validarTamaño()

- validarTamaño()
    - si el producto no cabe en el contendor lanza una alerta y vuelve a llamar a importar() para reingresar datos
    - si el producto cabe en el contenedor llama a la funcion de calcularImportacion()

- calcularImportacion()
    - calcula la cantidad de unidades importadas en base a su tamaño, el tamaño del contenedor y la cantidad de contenedores importados
    - imprime los datos en consola
    - calcula el stock sumando la importacion al stock previo
    - llama a vender()

- vender()
    - siempre qu el stock sea mayor que cero solicitara la cantidad de unidades vendidas
    - si la venta es mayor que el stock no se realizara la venta, lanzara una alerta y volvera a llamar vender()
    - si la venta es valida la restara del stock
    - cuando el stock llegue a cero solicitara volver a importar()

elementos utilizados:
variables, función, función anonima, función flecha, condicional if, ciclo while
*/



// DECLARAR VARIABLES ----------------------------------------------------------

// Al comienzo del programa el stock es de cero unidades
let stock = 0;
// calcularImportacionemos contenedores con tamaño predefinido
let tamañoContenedor = 1000;
//Declara variables globales
let tamañoProducto;
let cantidadContenedores;


// DECLARAR FUNCIONES ----------------------------------------------------------

//se define cuantas unidades entran en cada contenedor dividiendo el tamaño del contenedor entre el tamaño del producto
const lote = (tamañoContenedor, tamañoProducto) => parseInt(tamañoContenedor / tamañoProducto);
//se define cuantas unidades totales se importan multiplicando el lote por la cantidad de contenedores
const importacion = (lote, cantidadContenedores) => lote * cantidadContenedores;


function importar(){
    //se pide al usuario el tamaño del producto a calcularImportacion
    tamañoProducto = parseInt(prompt("Ingrese el tamaño del producto importado, entre 0 y 1000cm2"));
    //se pide al usuario la cantidad de contenedores a calcularImportacion
    cantidadContenedores = prompt("Ingrese la cantidad de contenedores importados");
    //Se llama a la función que valida el tamaño
    validarTamaño();
}


function validarTamaño(){
    if (tamañoProducto > tamañoContenedor) {
        //Si el producto es más grande que el contenedor se lanza una alerta y se vuelve a pedir un tamaño de producto
        alert("El tamaño máximo del contenedor es 1000, ese producto no cabe.");
        tamañoProducto = parseInt(prompt("Ingrese el tamaño del producto importado"));
        validarTamaño();
    }
    else {
        //Si el producto cabe en el contenedor continua el proceso
        calcularImportacion();
    }
};

function calcularImportacion(){
    //asignamos el valor de la importacion a una variable para simplificar la llamada
    let importacionActual = importacion(lote(tamañoContenedor, tamañoProducto), cantidadContenedores);
    
    //sumamos la importacion al stock
    stock = stock + importacionActual;
    
    //prsentamos todos los valores por consola
    console.log(`el tamaño del producto es ${tamañoProducto} y la cantidad de contenedores es ${cantidadContenedores}`);
    console.log(`entran ${lote(tamañoContenedor, tamañoProducto)} unidades en cada contenedor`);
    console.log(`en total se importaron ${importacionActual} unidades`);
    console.log(`Luego de la importación el stock es de ${stock}`);
    
    //Continua el proceso
    vender();
};


function vender(){
    //siempre que haya stock la venta estará disponible
    while (stock > 0){
        //El stock es mayor que cero
        alert(`el stock es de: ${stock} unidades, las ventas pueden continuar.`);
        //se consulta al usuario la cantidad de unidades vendidas
        let venta = parseInt(prompt("ingrese la cantidad de unidades vendidas"));
        
        if (venta > stock){
            //en caso de que la venta supere el stock lanza una alerta y vuelve a solicitar los datos de venta
            alert(`No hay stock suficiente para esa venta`);
            vender();
        } else {
            stock = stock - venta;
        }
    }
    //Cuando se termine el stock vuelve a solicitar una importación
    alert(`Se acabó el stock, vuelva a realizar una importación para continuar con las ventas`);
    importar();
}


// EJECUCIÓN -------------------------------------------------------------------

//El programa inicia con la llamada a la función importar() con el evento click en el botón del html

// Vamos a ver unos mensajes de bienvenida y el stock previo
console.log(`Bienvenido al simulador de logistica`);
console.log(`el stock previo es: ${stock}`);
console.log(`Se le solicitarán los datos de la importación`);