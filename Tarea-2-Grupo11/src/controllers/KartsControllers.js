import prisma from '../prismaClient.js'

/**************** CRUD KARTS *************/

//Peticion para crear un kart (C)

const createKart = async (req, res) => {
    const { id, modelo, color, velocidad_maxima, id_personaje } = req.body
    const Kart = await prisma.karts.create({ 
        data: {
            id,
            modelo,
            color,
            velocidad_maxima,
            id_personaje
        }
    })
    res.json(Kart) 
}

//Petición para ver karts (R)

const getKarts = async (req, res) => {
    const Karts = await prisma.karts.findMany()
    res.json(Karts)
}

const getKartById = async (req, res) => {
    const {id} = req.params
    const Kart = await prisma.karts.findUnique({
        where: {
            id: id
        }
    })
    res.json(Kart)
}

//Petición para Actualizar un kart (U)

const updateKartById = async (req, res) => {
    const { id } = req.params
    const {modelo,color,velocidad_maxima,id_personaje} = req.body
    const Kart = await prisma.karts.update({
        where : {
            id: id
        },
        data : {
            modelo: modelo,
            color: color,
            velocidad_maxima: velocidad_maxima,
            id_personaje: id_personaje
        },

    })
    res.json(Kart)
}

//Petición para borrar un kart (D)

const deleteKartById = async (req, res) => {
    const {id} = req.params
    const deleteKart = await prisma.karts.delete({
        where:{
            id: id
        },
    })
    res.json(deleteKart) 
}

const KartsController = {
    createKart,
    getKarts,
    getKartById,
    updateKartById,
    deleteKartById
}

export default KartsController