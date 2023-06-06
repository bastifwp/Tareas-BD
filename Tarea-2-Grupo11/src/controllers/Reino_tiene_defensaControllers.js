import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD reino_tiene_defensa *************/

//Peticion para crear asignar un trabajo a una persona (C)

const createPosesion = async (req, res) => {
    const { id_reino, id_defensa } = req.body

    //Verificamos que los atributos not null esten presentes
    

    //Revisamos atributos


    

    const Posesion = await prisma.reino_tiene_defensa.create({ //Creo que aquí podemos ver los errores
        data: {
            id_reino,
            id_defensa
        }
    })
    res.json(Posesion) //Podemos devolver un res.status(404), por ejemplos
}


//Petición para ver Posesions (R)

const getPosesiones = async (req, res) => {
    const Posesions = await prisma.reino_tiene_defensa.findMany()
    res.json(Posesions)
}

const getPosesionById = async (req, res) => {
    const {id_reino,id_defensa} = req.params
    const Posesion = await prisma.reino_tiene_defensa.findUnique({
        where: {
            id_reino_id_defensa : {
                id_reino: Number(id_reino),
                id_defensa: Number(id_defensa),
            }
        }
    })
    res.json(Posesion)
}

//Petición para Actualizar un Posesion (U)

const updatePosesionById = async (req, res) => {
    const {id_reino,id_defensa} = req.params
    const {id_reinoNew,id_defensaNew} = req.body

    //Revisamos atributos
    ErrorController.Reino_tiene_DefensaSintaxError(id_reinoNew,id_defensaNew)

    const Posesion = await prisma.reino_tiene_defensa.update({
        where : {
            id_reino_id_defensa : {
                id_reino: Number(id_reino),
                id_defensa: Number(id_defensa),
            }
        },
        data : {
            id_reino: id_reinoNew,
            id_defensa: id_defensaNew
        },

    })
    res.json(Posesion)
}

//Petición para borrar un trabajo(D)

const deletePosesionById = async (req, res) => {
    const {id_reino,id_defensa} = req.params
    const deletePosesion = await prisma.reino_tiene_defensa.delete({
        where:{
            id_reino_id_defensa : {
                id_reino: Number(id_reino),
                id_defensa: Number(id_defensa),
            }
        },
    })
    res.json(deletePosesion) //Devuelve el trabajo que eliminó
}

const Reino_tiene_defensaController = {
    createPosesion,
    getPosesiones,
    getPosesionById,
    updatePosesionById,
    deletePosesionById,
}

export default Reino_tiene_defensaController