import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD PERSONAJE_HABITA_REINO *************/

//Peticion para crear un habitante (C)

const createHabitante = async (req, res) => {
    var { id_personaje, id_reino, fecha_registro, es_gobernante } = req.body
    fecha_registro = Date(fecha_registro)
    const Habitante = await prisma.personaje_habita_reino.create({ 
        data: {
            id_personaje,
            id_reino,
            fecha_registro,
            es_gobernante
        }
    })
    res.json(Habitante) 
}

//Petición para ver un habitante (R)

const getHabitantes = async (req, res) => {
    const Habitantes = await prisma.personaje_habita_reino.findMany()
    res.json(Habitantes)
}

const getHabitanteById = async (req, res) => {
    const {id_reino,id_personaje} = req.params
    const Habitante = await prisma.personaje_habita_reino.findUnique({
        where: {
            id_reino_id_personaje :{
                id_reino: id_reino,
                id_personaje: id_personaje
            }
        }
    })
    res.json(Habitante)
}

//Petición para Actualizar un habitante (U)

const updateHabitanteById = async (req, res) => {
    const {id_reino,id_personaje} = req.params
    var {fecha_registro,es_gobernante} = req.body
    fecha_registro = Date(f)
    const Habitante = await prisma.personaje_habita_reino.update({
        where : {
            id_reino_id_personaje :{
                id_reino: id_reino,
                id_personaje: id_personaje
            }
        },
        data : {
            fecha_registro: fecha_registro,
            es_gobernante: es_gobernante
        },
    })
    res.json(Habitante)
}

//Petición para borrar un Habitante (D)

const deleteHabitanteById = async (req, res) => {
    const {id_reino,id_personaje} = req.params
    const deleteHabitante = await prisma.personaje_habita_reino.delete({
        where:{
            id_reino_id_personaje :{
                id_reino: id_reino,
                id_personaje: id_personaje
            }
        },
    })
    res.json(deleteHabitante) 
}

const Personaje_habita_reinoController = {
    createHabitante,
    getHabitantes,
    getHabitanteById,
    updateHabitanteById,
    deleteHabitanteById
}

export default Personaje_habita_reinoController


