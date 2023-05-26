//Creo que es un mal nombre pq en realidad no controla nada xdd

//En java existe una clase error, pero solo permite mostar el mensaje de error
//Para que se muestre un título, estatus (personalizable) y descripcion extenderemos la clase error

class BaseError extends Error{
    constructor(nombre, codigoHttp, descripcion){
        super(descripcion) //por defecto se llama como BaseError.message
        this.nombre = nombre
        this.codigoHttp = codigoHttp
    }
}

//Ahora queremos exportar este error base a los distintos módulos:
const ErrorController = {
    BaseError
}

export default ErrorController

