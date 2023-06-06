import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD PERSONAJE_TIENE_TRABAJO *************/

//Peticion para crear asignar un trabajo a una persona (C)

const createContrato = async (req, res) => {
    var { id_trabajo, id_personaje, fecha_inicio, fecha_termino } = req.body

    //Nos interesa guardar los strings para después validar el formato a través de expresiones regulares
    let string_fecha_inicio = fecha_inicio
    let string_fecha_termino = fecha_termino

    //Los convertimos a Date sólo si no son null
    if (fecha_inicio != null){
        fecha_inicio = new Date(fecha_inicio)
    }

    if (fecha_termino != null){
        fecha_termino = new Date(fecha_termino)
    }

    //Debemos verificar que los not null se cumplen.
    let not_null =[[id_trabajo, 'id_trabajo'],
                    [id_personaje, 'id_personaje'],
                    [fecha_inicio, 'fecha_inicio']]

    ErrorController.NotNullCheck(not_null)

    
    //Ahora debemos verificar que la sintaxis esté correcta:
    let sintaxis = [[id_trabajo, id_trabajo, 'id_trabajo'],
                    [id_personaje, id_personaje, 'id_personaje'],
                    [fecha_inicio, string_fecha_inicio, 'fecha_inicio']]
    
    let sintaxis_esperada = [['number', 0],
                             ['number', 0],
                             ['object', 45]]

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

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
            id_trabajo_id_personaje : {
                id_trabajo: Number(id_trabajo),
                id_personaje: Number(id_personaje),
            }
        }
    })
    res.json(Contrato)
}

//Petición para Actualizar un contrato (U)

const updateContratoById = async (req, res) => {
    const { id_trabajo,id_personaje } = req.params
    var {fecha_inicio, fecha_termino} = req.body
    fecha_inicio = new Date(fecha_inicio)
    fecha_termino = new Date(fecha_termino)
    const Contrato = await prisma.personaje_tiene_trabajo.update({
        where : {
            id_trabajo_id_personaje : {
                id_trabajo: Number(id_trabajo),
                id_personaje: Number(id_personaje),
            }
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
            id_trabajo_id_personaje : {
                id_trabajo: Number(id_trabajo),
                id_personaje: Number(id_personaje),
            }
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