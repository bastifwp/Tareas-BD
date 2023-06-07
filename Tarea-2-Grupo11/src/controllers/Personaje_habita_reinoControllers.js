import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD PERSONAJE_HABITA_REINO *************/

//Peticion para crear un habitante (C)

const createHabitante = async (req, res) => {
    var { id_personaje, id_reino, fecha_registro, es_gobernante } = req.body

    //Quiero guardar el string para luego poder usar expresiones regulares para verificar el formato
    let string_fecha_registro = fecha_registro 

    //Solo si se escribe algo se pasa a un Date
    if(fecha_registro != null){
        fecha_registro = new Date(fecha_registro)
    }


    //Verificaremos los errores
    //Primeramente verificamos los notnull
    let not_null = [[id_personaje, 'id_personaje'],
                    [id_reino, 'id_reino'],
                    [fecha_registro, 'fecha_registro'],
                    [es_gobernante, 'es_gobernante']]

    ErrorController.NotNullCheck(not_null)

    //Ahora debemos verificar la sintaxis
    let sintaxis = [[id_personaje, id_personaje, 'id_personaje'],
                    [id_reino, id_reino, 'id_reino'],
                    [fecha_registro, string_fecha_registro, 'fecha_registro'],
                    [es_gobernante, es_gobernante, 'es_gobernante']]

    let sintaxis_esperada = [['number', 0],
                             ['number', 0],
                             ['object', 45], //Date es de tipo 'object'
                             ['boolean', 0]]

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)


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
                id_reino: Number(id_reino),
                id_personaje: Number(id_personaje)
            }
        }
    })
    res.json(Habitante)
}

//Petición para Actualizar un habitante (U)

const updateHabitanteById = async (req, res) => {
    const {id_reino,id_personaje} = req.params
    var {fecha_registro,es_gobernante} = req.body
    fecha_registro = new Date(fecha_registro)
    const Habitante = await prisma.personaje_habita_reino.update({
        where : {
            id_reino_id_personaje :{
                id_reino: Number(id_reino),
                id_personaje: Number(id_personaje)
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
                id_reino: Number(id_reino),
                id_personaje: Number(id_personaje)
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


