import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD PERSONAJES *************/

//Peticion para crear un personaje (C)

const createPersonaje = async (req, res) => {
    var { id, nombre, fuerza, fecha_nacimiento, objeto } = req.body
    fecha_nacimiento = new Date(fecha_nacimiento)

    //Debemos ver los errores
    //Primeramente los errores de null:
    let not_null = [[nombre, 'nombre'],
                    [fuerza, 'fuerza'],
                    [fecha_nacimiento, 'fecha_nacimiento']]

    ErrorController.NotNullCheck(not_null)


    //Ahora veremos los errores de sintaxis
    /*let sintaxis = [[nombre, nombre, 'nombre'],
                    [fuerza, fuerza, 'fuerza'],
                    [fecha_nacimiento, 'fecha_nacimiento']]*/

   /* let sintaxis_esperada = [['string', 45],
                             ['number', 0],
                             []]*/

    

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
    const { id } = req.params
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
    const deletePersonaje = await prisma.personajes.delete({
        where:{
            id: id
        },
    })
    res.json(deletePersonaje) //Devuelve el trabajo que eliminó
}

const PersonajesController = {
    createPersonaje,
    getPersonaje,
    getPersonajeById,
    updatePersonajeById,
    deletePersonajeById
}

export default PersonajesController