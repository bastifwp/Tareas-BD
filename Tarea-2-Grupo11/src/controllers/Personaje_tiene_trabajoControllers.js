import prisma from '../prismaClient.js'

/**************** CRUD PERSONAJE_TIENE_TRABAJO *************/

//Peticion para crear asignar un trabajo a una persona (C)

const createContrato = async (req, res) => {
    const { id_trabajo, id_personaje, a, fecha_termino } = req.body
    const fecha_inicio = new Date(a)
    const Contrato = await prisma.personaje_tiene_trabajo.create({ //Creo que aquí podemos ver los errores
        data: {
            id_trabajo,
            id_personaje,
            fecha_inicio,
            fecha_termino
        }
    })
    res.json(Contrato) //Podemos devolver un res.status(404), por ejemplos
}


//Petición para ver contratos (R)

const getContrato = async (req, res) => {
    const Contratos = await prisma.personaje_tiene_trabajo.findMany()
    res.json(Contratos)
}

const getContratoById = async (req, res) => {
    const {id_trabajo,id_personaje} = req.params
    const Contrato = await prisma.personaje_tiene_trabajo.findUnique({
        where: {
            id_trabajo: id_trabajo,
            id_personaje: id_personaje
        }
    })
    res.json(Contrato)
}

//Petición para Actualizar un contrato (U)

const updateContratoById = async (req, res) => {
    const { id_trabajo,id_personaje } = req.params
    const {fecha_inicio, fecha_termino} = req.body
    const Contrato = await prisma.personaje_tiene_trabajo.update({
        where : {
            id_trabajo: Number(id_trabajo),
            id_personaje: Number(id_personaje)
        },
        data : {
            fecha_inicio: fecha_inicio,
            fecha_termino: fecha_termino
        },

    })
    res.json(Contrato)
}

//Petición para borrar un trabajo(D)

const deleteContratoById = async (req, res) => {
    const {id_trabajo,id_personaje} = req.params
    const deleteContrato = await prisma.personaje_tiene_trabajo.delete({
        where:{
            id_trabajo: Number(id_trabajo),
            id_personaje: Number(id_personaje)
        },
    })
    res.json(deleteContrato) //Devuelve el trabajo que eliminó
}

const Personaje_tiene_trabajoController = {
    createContrato,
    getContrato,
    getContratoById,
    updateContratoById,
    deleteContratoById,
}

export default Personaje_tiene_trabajoController