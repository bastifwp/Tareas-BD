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


    //Debemos ver los errores
    //Primeramente los errores de null:
    let not_null = [[nombre, 'nombre'],
                    [fuerza, 'fuerza'],
                    [fecha_nacimiento, 'fecha_nacimiento']]

    ErrorController.NotNullCheck(not_null)


    //Ahora veremos los errores de sintaxis
    let sintaxis = [[nombre, nombre, 'nombre'],
                    [fuerza, fuerza, 'fuerza'],
                    [fecha_nacimiento, string_fecha_nacimiento, 'fecha_nacimiento']]

    let sintaxis_esperada = [['string', 45],
                             ['number', 0],
                             ['object', 45]] //Date es tipo object, no es necesario pasarle el rango máximo, pues una re se encarga del formato completo

    
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
    const Personaje = await prisma.personajes.findUnique({
        where: {
            id: id
        }
    })
    res.json(Personaje)
}

//Petición para Actualizar un personaje (U)

const updatePersonajeById = async (req, res) => {
    const {id} = req.params
    var {nombre,fuerza,fecha_nacimiento,objeto} = req.body
    fecha_nacimiento = new Date(fecha_nacimiento)
    const Personaje = await prisma.personajes.update({
        where : {
            id: id
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
    
    const Personaje = await prisma.personajes.findUnique({
        where:{
            id: Number(id)
        },
    })
    ErrorController.ExistenceCheck(Personaje,"personaje")

    await prisma.personajes.delete({
        where:{
            id: Personaje.id
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