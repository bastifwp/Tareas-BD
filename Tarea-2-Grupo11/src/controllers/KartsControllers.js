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
    res.json(Kart) //Podemos devolver un res.status(404), por ejemplo
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
