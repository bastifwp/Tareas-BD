import prisma from '../prismaClient.js'

/**************** CRUD REINOS *************/

//Peticion para crear un Reino (C)

const createReino = async (req, res) => {
    const { id, nombre, ubicacion, superficie } = req.body
    const Reino = await prisma.reinos.create({ 
        data: {
            id,
            nombre,
            ubicacion,
            superficie
        }
    })
    res.json(Reino) 
}

//Petición para ver un Reino (R)

const getReinos = async (req, res) => {
    const Reinos = await prisma.reinos.findMany()
    res.json(Reinos)
}

const getReinoById = async (req, res) => {
    const {id} = req.params
    const Reino = await prisma.reinos.findUnique({
        where: {
            id: id
        }
    })
    res.json(Reino)
}

//Petición para Actualizar un Reino (U)

const updateReinoById = async (req, res) => {
    const {id} = req.params
    const {nombre,ubicacion,superficie} = req.body
    const Reino = await prisma.reinos.update({
        where : {
            id:id
        },
        data : {
            nombre: nombre,
            ubicacion: ubicacion,
            superficie: superficie
        },
    })
    res.json(Reino)
}

//Petición para borrar un Reino (D)

const deleteReinoById = async (req, res) => {
    const {id} = req.params
    const deleteReino = await prisma.reinos.delete({
        where:{
            id: id
        },
    })
    res.json(deleteReino) 
}

const ReinosController = {
    createReino,
    getReinos,
    getReinoById,
    updateReinoById,
    deleteReinoById
}

export default ReinosController

