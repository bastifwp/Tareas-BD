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
                    [fecha_inicio, string_fecha_inicio, 'fecha_inicio'],
                    [fecha_termino, string_fecha_termino, 'fecha_termino']]
    
    let sintaxis_esperada = [['number', 0],
                             ['number', 0],
                             ['object', 45],
                             ['object', 45]]

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    //Debemos verificar que el personaje exista
    const find_personaje = await prisma.personajes.findUnique({
        where: {
            id: id_personaje
        }
    })
    ErrorController.ExistenceCheck(find_personaje, 'Personaje')

    //Debemos verificar que el trabajo exista
    const find_trabajo = await prisma.trabajos.findUnique({
        where: {
            id: id_trabajo
        }
    })
    ErrorController.ExistenceCheck(find_trabajo, 'Trabajo')


    //Debemos verificar si ya existe el trabajo
    const find_contrato = await prisma.personaje_tiene_trabajo.findUnique({
        where: {
            id_trabajo_id_personaje : {id_trabajo, id_personaje}
        }
    })
    ErrorController.InDbCheck(find_contrato, 'Contrato')


    //Ahora creamos
    const Contrato = await prisma.personaje_tiene_trabajo.create({ 
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

    //Verificaremos si los id's entregados son numeros
    ErrorController.IdNumberCheck(id_trabajo)
    ErrorController.IdNumberCheck(id_personaje)

    const Contrato = await prisma.personaje_tiene_trabajo.findUnique({
        where: {
            id_trabajo_id_personaje : {
                id_trabajo: Number(id_trabajo),
                id_personaje: Number(id_personaje),
            }
        }
    })
    //Verificamos si existe el Contrato
    ErrorController.ExistenceCheck(Contrato, 'Contrato')
   
    res.json(Contrato)
}

//Petición para Actualizar un contrato (U)

const updateContratoById = async (req, res) => {
    const { id_trabajo,id_personaje } = req.params
    var {fecha_inicio, fecha_termino} = req.body

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

    //Debemos verificar que el contrato a modificar existe:
    ErrorController.IdNumberCheck(id_trabajo)
    ErrorController.IdNumberCheck(id_personaje)

    const find_contrato = await prisma.personaje_tiene_trabajo.findUnique({
        where:{
            id_trabajo_id_personaje:{
                id_trabajo: Number(id_trabajo),
                id_personaje: Number(id_personaje)
            }
        }
    })
    ErrorController.ExistenceCheck(find_contrato, 'Contrato')


    //Debemos verificar que los not null se cumplen.
    let not_null =[[fecha_inicio, 'fecha_inicio']]

    ErrorController.NotNullCheck(not_null)

    
    //Ahora debemos verificar que la sintaxis esté correcta:
    let sintaxis = [[fecha_inicio, string_fecha_inicio, 'fecha_inicio'],
                    [fecha_termino, string_fecha_termino, 'fecha_termino']]
    
    let sintaxis_esperada = [['object', 45],
                             ['object', 45]]

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)
    
    //Ahora podemos modificar el contrato
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

    //Debemos verificar que el contrato a eliminar exista:
    ErrorController.IdNumberCheck(id_trabajo)
    ErrorController.IdNumberCheck(id_personaje)    

    const find_contrato = await prisma.personaje_tiene_trabajo.findUnique({
        where:{
            id_trabajo_id_personaje :{
                id_trabajo: Number(id_trabajo),
                id_personaje: Number(id_personaje)
            }
        },
    })
    ErrorController.ExistenceCheck(find_contrato, 'Contrato')

    //Ahora si podemos eliminarlo
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