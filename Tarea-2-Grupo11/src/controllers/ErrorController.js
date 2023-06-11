//Creo que es un mal nombre pq en realidad no controla nada xdd

//En java existe una clase error, pero solo permite mostar el mensaje de error
//Para que se muestre un título, estatus (personalizable) y descripcion extenderemos la clase error

//Si hay una coma extra en el body falla random creo
//Hay que verificar por si se repiten los ids (cuando se crean cosas con pk compuestas, en los otros casos simplemente no se debe pedir id)
//Cuando se cree una clase que ocupe una FK hay que ver que esa fk existe (en el caso de las relaciones que no tengan 0)
//Error al repetir un atributo en el body
//Ver que pasa cuando se pone un atributo extra
//Ver como validar con la sintaxis los q son esperados y los recibidos, creo que sólo agrege a sintaxis y sintaxis_esperada los q son not_null


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

const SintaxCheck = (sintaxis,sintaxis_esperada) => {

    for (let index = 0; index < sintaxis.length; index++) {

        if(typeof sintaxis[index][0] !==  sintaxis_esperada[index][0] && sintaxis[index][0] !== undefined ){
            console.log("Holas, entre aquí gracias a: ", sintaxis[index][0])

            throw new ErrorController.BaseError('Tipo invalido',400,'El atributo '+sintaxis[index][2]+' debe ser un '+sintaxis_esperada[index][0])
        }
        

        //Errores de formato para un número, FALTA AGREGAR EL LÍMITE PARA MAYOR
        if(typeof sintaxis[index][0] == 'number'){

            if(sintaxis[index][1] < sintaxis_esperada[index][1]){
                var text = 'El atributo '+sintaxis[index][2]+' debe ser mayor a '+ sintaxis_esperada[index][1].toString()
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

            meses_30 = '|((04|06|09|11)-(((0[1-9])|(1[0-9])|(2[0-9])|(30)))'
            meses_31 = '|((01|03|05|07|08|10|12)-((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1])))'
            febrero_perkin = '(02-((0[1-9])|(1[0-9])|(2[0-8])))'

            const re = new RegExp("[0-9][0-9][0-9][0-9]\-"+febrero_perkin+meses_30+meses_31+"$")

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

const ExistenceCheck = (objeto,nombre) => {
    if(objeto == null){
        throw new ErrorController.BaseError('Error de existencia',400,'No existe tal '+nombre)
    }
}


//Ahora queremos exportar este error base a los distintos módulos:
const ErrorController = {
    BaseError,
    SintaxCheck,
    NotNullCheck,
    ExistenceCheck
}


export default ErrorController

