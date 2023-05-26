import prisma from '../prismaClient.js'

/**************** CRUD DefensaS *************/

//Peticion para crear un Defensa (C)

const createDefensa = async (req, res) => {
    const { id, defensa } = req.body
    const Defensa = await prisma.defensas.create({ 
        data: {
            id,
            defensa
        }
    })
    res.json(Defensa) 
}

//Petición para ver un Defensa (R)

const getDefensas = async (req, res) => {
    const Defensas = await prisma.defensas.findMany()
    res.json(Defensas)
}

const getDefensaById = async (req, res) => {
    const {id} = req.params
    const Defensa = await prisma.defensas.findUnique({
        where: {
            id: id
        }
    })
    res.json(Defensa)
}

//Petición para Actualizar un Defensa (U)

const updateDefensaById = async (req, res) => {
    const {id} = req.params
    const {defensa} = req.body
    const Defensa = await prisma.defensas.update({
        where : {
            id:id
        },
        data : {
            defensa: defensa
        },
    })
    res.json(Defensa)
}

//Petición para borrar un Defensa (D)

const deleteDefensaById = async (req, res) => {
    const {id} = req.params
    const deleteDefensa = await prisma.defensas.delete({
        where:{
            id: id
        },
    })
    res.json(deleteDefensa) 
}

const DefensasController = {
    createDefensa,
    getDefensas,
    getDefensaById,
    updateDefensaById,
    deleteDefensaById
}

export default DefensasController