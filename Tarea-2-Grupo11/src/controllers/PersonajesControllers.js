import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD PERSONAJES *************/

//Peticion para crear un personaje (C)

const createPersonaje = async (req, res) => {
    var { id, nombre, fuerza, fecha_nacimiento, objeto } = req.body
    
    //Quiero guardar el string para luego poder usar expresiones regulares para verificar el formato
    let string_fecha_nacimiento = fecha_nacimiento 

    //Si no se hace esto se crea un tipo de dato objeto llamado "Invalid"
    if(fecha_nacimiento != null){
        fecha_nacimiento = new Date(fecha_nacimiento)
    }

    console.log("objeto ", objeto)


    //Debemos ver los errores
    //Primeramente los errores de null:
    let not_null = [[nombre, 'nombre'],
                    [fuerza, 'fuerza'],
                    [fecha_nacimiento, 'fecha_nacimiento']]

    ErrorController.NotNullCheck(not_null)


    //Ahora veremos los errores de sintaxis
    let sintaxis = [[nombre, nombre, 'nombre'],
                    [fuerza, fuerza, 'fuerza'],
                    [fecha_nacimiento, string_fecha_nacimiento, 'fecha_nacimiento'],
                    [objeto, objeto, "objeto"]]

    let sintaxis_esperada = [['string', 45],
                             ['number', 0],
                             ['object', 45],
                             ['string', 30]] //Date es tipo object, no es necesario pasarle el rango máximo, pues una re se encarga del formato completo

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    const Personaje = await prisma.personajes.create({ 
        data: {
            id,
            nombre,
            fuerza,
            fecha_nacimiento,
            objeto
        }
    })
    res.json(Personaje) //Podemos devolver un res.status(404), por ejemplo
}

//Petición para ver personajes (R)

const getPersonaje = async (req, res) => {
    const Personajes = await prisma.personajes.findMany()
    res.json(Personajes)
}

const getPersonajeById = async (req, res) => {
    const {id} = req.params

    //Debemos verificar que el id es un numero
    ErrorController.IdNumberCheck(id)

    const Personaje = await prisma.personajes.findUnique({
        where: {
            id: Number(id)
        }
    })

    //Debemos verificar si encontramos al personaje en cuestión
    ErrorController.ExistenceCheck(Personaje, 'Personaje')

    res.json(Personaje)
}

//Petición para Actualizar un personaje (U)

const updatePersonajeById = async (req, res) => {
    const {id} = req.params
    var {nombre,fuerza,fecha_nacimiento,objeto} = req.body

    //Quiero guardar el string para luego poder usar expresiones regulares para verificar el formato
    let string_fecha_nacimiento = fecha_nacimiento 

    //Si no se hace esto se crea un tipo de dato objeto llamado "Invalid"
    if(fecha_nacimiento != null){
        fecha_nacimiento = new Date(fecha_nacimiento)
    }    

    //Verifiamos que el id sea un número
    ErrorController.IdNumberCheck(id)

    //Debemos verificar si la persona existe
    const find_personaje = await prisma.personajes.findUnique({
        where: {
            id: Number(id)
        }
    })
    ErrorController.ExistenceCheck(find_personaje, 'Personaje')

    //Primeramente los errores de null:
    let not_null = [[nombre, 'nombre'],
                    [fuerza, 'fuerza'],
                    [fecha_nacimiento, 'fecha_nacimiento']]

    ErrorController.NotNullCheck(not_null)


    //Ahora veremos los errores de sintaxis
    let sintaxis = [[nombre, nombre, 'nombre'],
                    [fuerza, fuerza, 'fuerza'],
                    [fecha_nacimiento, string_fecha_nacimiento, 'fecha_nacimiento'],
                    [objeto, objeto, "objeto"]]

    let sintaxis_esperada = [['string', 45],
                             ['number', 0],
                             ['object', 45]
                             ['string', 30]] //Date es tipo object, no es necesario pasarle el rango máximo, pues una re se encarga del formato completo

    
    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    //Ahora podemos actualizar al personaje
    const Personaje = await prisma.personajes.update({
        where : {
            id: Number(id)
        },
        data : {
            nombre: nombre,
            fuerza: fuerza,
            fecha_nacimiento: fecha_nacimiento,
            objeto: objeto
        },

    })
        res.json(Personaje)
}

//Petición para borrar un personaje (D)

const deletePersonajeById = async (req, res) => {
    const {id} = req.params
    
    //debemos verificar que el personaje a eliminar existe
    ErrorController.IdNumberCheck(id)
    const find_personaje = await prisma.personajes.findUnique({
        where:{
            id: Number(id)
        },
    })
    ErrorController.ExistenceCheck(find_personaje,"Personaje")

    const Personaje = await prisma.personajes.delete({
        where:{
            id: Number(id)
        }, 
    })

    res.json(Personaje) //Devuelve el trabajo que eliminó
}

const PersonajesController = {
    createPersonaje,
    getPersonaje,
    getPersonajeById,
    updatePersonajeById,
    deletePersonajeById
}

export default PersonajesController