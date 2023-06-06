//Creo que es un mal nombre pq en realidad no controla nada xdd

//En java existe una clase error, pero solo permite mostar el mensaje de error
//Para que se muestre un título, estatus (personalizable) y descripcion extenderemos la clase error

//Si hay una coma extra en el body falla random creo
//Hay que verificar por si se repiten los ids
//Cuando se cree una clase que ocupe una FK hay que ver que esa fk existe (en el caso de las relaciones que no tengan 0)
//Error al repetir un atributo en el body
//Ver que pasa cuando se pone un atributo extra


class BaseError extends Error{
    constructor(nombre, codigoHttp, descripcion){
        super(descripcion) //por defecto se llama como BaseError.message
        this.nombre = nombre
        this.codigoHttp = codigoHttp
    }
}

//Tipos utilizados
//Date
//Integer
//Varchar(45),Varchar(30)
//Boolean
//Timestamp

//sintaxis es un array de condiciones que debe cumplir el atributo
//[[type, max_lenght/min_quantity, name]]

const DateCheck = (date_recibida) => {


}

const SintaxCheck = (sintaxis,sintaxis_esperada) => {
    
    for (let index = 0; index < sintaxis.length; index++) {
        if(typeof sintaxis[index][0] !==  sintaxis_esperada[index][0] && sintaxis[index][0] !== undefined ){
            throw new ErrorController.BaseError('Tipo invalido',400,'El atributo '+sintaxis[index][2]+' debe ser un '+sintaxis_esperada[index][0])
        }
        
        //Errores de formato para un número, FALTA AGREGAR EL LÍMITE PARA MAYOR
        if(typeof sintaxis[index][0] == 'number'){
            if(sintaxis[index][1] < sintaxis_esperada[index][1]){
                var text = 'El atributo '+sintaxis[index][2]+' debe ser mayor a '+sintaxis_esperada[index][1].toString()
                throw new ErrorController.BaseError(sintaxis[index][2]+' fuera de rango',400,text)
            }    
        }

        //Errores de fotmato para un string
        if(typeof sintaxis[index][0] == 'string'){
            if(sintaxis[index][1].length > sintaxis_esperada[index][1]){
                var text = 'El atributo '+sintaxis[index][2]+' no puede tener mas de '+sintaxis_esperada[index][1].toString()+' caracteres'
                throw new ErrorController.BaseError(sintaxis[index][2]+' fuera de rango',400,text)
            }
        }

        //Errores de formato para un booleano
        if(typeof sintaxis[index][0] == 'boolean'){
            
        }

        //Erorres de formato en un date:
        if(sintaxis[index][0] instanceof Date){

            //Debemos verificar que se cumpla el formato AAAA/MM/DD ocupando expresiones regulares jujuuu
            //Como es un reino de fantasía asumimos que todos los meses tienen 28 dias
            const re = new RegExp("[0-9][0-9][0-9][0-9]\-((0[1-9])|(1[0-2]))\-((0[1-9])|(1[0-9])|(2[0-8]))$")
            console.log("te la presento: ", sintaxis[index][1].toString())

            //Probamos si el string de date es válido (el string está en la posicion 1)
            if(!re.test(sintaxis[index][1])){
                throw new ErrorController.BaseError("Formato de fecha erroeno", 400, "Formato esperado : AAAA\-MM\-DD (en el mundo champiñon cada mes tiene 28 días)" )
            }

        }

    }
}

//not_null es un array de atributos no nulos y sus nombres
//[[atributo, name]]

const NotNullCheck = (not_null) => {
    for (let index = 0; index < not_null.length; index++) {
        if (not_null[index][0] == null){
            throw new ErrorController.BaseError('Datos insuficientes',400,'El atributo '+not_null[index][1]+' es requerido')
        }
        
    }
}

const TrabajosSintaxCheck = (descripcion,sueldo) => {
    if(typeof sueldo !== 'number'){
        throw new ErrorController.BaseError('Tipo de dato inválido', 418, "El atributo sueldo debe ser un entero")
    }
    if(sueldo < 0){
        throw new ErrorController.BaseError('Sueldo fuera de rango', 418, "El atributo sueldo no puede ser un entero menor a 0")
    }
    if(typeof descripcion !== 'string'){
        throw new ErrorController.BaseError('Tipo de dato invalido',400,'El atributo descripcion debe ser un string')
    }
    if(descripcion.length > 45){
        throw new ErrorController.BaseError('Descripcion fuera de rango',400,'El atributo descripcion no puede sobrepasar los 45 caracteres')
    }
}

const TrabajosNotNullCheck = (sueldo) => {
    if(sueldo == null){
        throw new ErrorController.BaseError('Informacion insuficiente',400,'El atributo sueldo es requerido')
    }
}

const ReinosSintaxCheck = (nombre,ubicacion,superficie) => {
    if(typeof nombre !== 'string'){
        throw new ErrorController.BaseError('Tipo de dato invalido',400,'El atributo nombre debe ser un string')
    } 
    if(typeof ubicacion !== 'string'){
        throw new ErrorController.BaseError('Tipo de dato invalido',400,'El atributo ubicacion debe ser un string')
    }
    if(typeof superficie !== 'number'){
        throw new ErrorController.BaseError('Tipo de dato invalido',400,'El atributo superficie debe ser un numero')
    }
    if(nombre.length() > 45){
        throw new ErrorController.BaseError('Nombre fuera de rango',400,'El atributo nombre no puede sobrepasar los 45 caracteres')
    }
    if(ubicacion.length() > 45){
        throw new ErrorController.BaseError('Ubicacion fuera de rango',400,'El atributo ubicacion no puede sobrepasar los 45 caracteres')
    }
    if(superficie <= 0){
        throw new ErrorController.BaseError('Superficie fuera de rango',400,'El atributo superficie debe ser mayor o igual a cero')
    }
}

const ReinosNotNullCheck = (nombre,ubicacion,superficie) => {
    if(nombre == null){
        throw new ErrorController.BaseError('Informacion insuficiente',400,'El atributo nombre es requerido')
    }
    if(ubicacion == null){
        throw new ErrorController.BaseError('Informacion insuficiente',400,'El atributo ubicacion es requerido')
    }
    if(superficie == null){
        throw new ErrorController.BaseError('Informacion insuficiente',400,'El atributo superficie es requerido')  
    }

}

const Reino_tiene_DefensaSintaxCheck = (id_reino,id_defensa) => {
    if(typeof id_reino !== 'number'){
        throw new ErrorController.BaseError('Tipo de dato invalido',400,'El atributo id_reino debe ser un numero')
    }
    if(typeof id_defensa !== 'number'){
        throw new ErrorController.BaseError('Tipo de dato invalido',400,'El atributo id_defensa debe ser un numero')
    }
}

const Reino_tiene_DefensaNotNullCheck = (id_reino,id_defensa) => {
    if(id_reino == null){
        throw new ErrorController.BaseError('Informacion insuficiente',400,'El atributo id_reino es requerido')
    }
    if(id_defensa == null){
        throw new ErrorController.BaseError('Informacion insuficiente',400,'El atributo id_defensa es requerido')
    }
}


//Ahora queremos exportar este error base a los distintos módulos:
const ErrorController = {
    BaseError,
    SintaxCheck,
    NotNullCheck,
    Reino_tiene_DefensaSintaxCheck, Reino_tiene_DefensaNotNullCheck,
    ReinosSintaxCheck, ReinosNotNullCheck,
    TrabajosSintaxCheck, TrabajosNotNullCheck

}


export default ErrorController

