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

    //Debemos verificar que el personaje exista
    const find_personaje = await prisma.personajes.findUnique({
        where: {
            id: id_personaje
        }
    })
    ErrorController.ExistenceCheck(find_personaje, 'Personaje')

    //Debemos verificar que el reino exista
    const find_reino = await prisma.reinos.findUnique({
        where: {
            id: id_reino
        }
    })
    ErrorController.ExistenceCheck(find_reino, 'Reino')

    //Debemos verificar si ya existe el habitante
    const find_habitante = await prisma.personaje_habita_reino.findUnique({
        where: {
            id_reino_id_personaje : {id_reino, id_personaje}
        }
    })
    ErrorController.InDbCheck(find_habitante, 'Habitante')

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

    //Verificaremos si los id's entregados son numeros
    ErrorController.IdNumberCheck(id_reino)
    ErrorController.IdNumberCheck(id_personaje)


    const Habitante = await prisma.personaje_habita_reino.findUnique({
        where: {
            id_reino_id_personaje :{
                id_reino: Number(id_reino),
                id_personaje: Number(id_personaje)
            }
        }
    })

    //Verificamos si existe el habitante
    ErrorController.ExistenceCheck(Habitante, 'Habitante')

    res.json(Habitante)
}

//Petición para Actualizar un habitante (U)

const updateHabitanteById = async (req, res) => {
    const {id_reino,id_personaje} = req.params
    var {fecha_registro,es_gobernante} = req.body

    //Quiero guardar el string para luego poder usar expresiones regulares para verificar el formato
    let string_fecha_registro = fecha_registro 

    //Solo si se escribe algo se pasa a un Date
    if(fecha_registro != null){
        fecha_registro = new Date(fecha_registro)
    }    

    //Debemos verificar que el Habitante a modificar existe:
    ErrorController.IdNumberCheck(id_reino)
    ErrorController.IdNumberCheck(id_personaje)

    const find_habitante = await prisma.personaje_habita_reino.findUnique({
        where: {
            id_reino_id_personaje : {
                id_reino: Number(id_reino),
                id_personaje: Number(id_personaje)
            }
        }
    })
    ErrorController.ExistenceCheck(find_habitante, 'Habitante')

    //Ahora debemos verificar los atributos not null
    //Primeramente verificamos los notnull
    let not_null = [[fecha_registro, 'fecha_registro'],
                    [es_gobernante, 'es_gobernante']]

    ErrorController.NotNullCheck(not_null)

    //Ahora debemos verificar la sintaxis
    let sintaxis = [[fecha_registro, string_fecha_registro, 'fecha_registro'],
                    [es_gobernante, es_gobernante, 'es_gobernante']]

    let sintaxis_esperada = [['object', 45], //Date es de tipo 'object'
                             ['boolean', 0]]

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)


    //Ahora si podemos actualizar al habitante
    let Habitante = await prisma.personaje_habita_reino.update({
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

    //Debemos verifcar que los id sean enteros y que exista el habitante a eliminar
    ErrorController.IdNumberCheck(id_reino)
    ErrorController.IdNumberCheck(id_personaje)

    const find_habitante = await prisma.personaje_habita_reino.findUnique({
        where:{
            id_reino_id_personaje :{
                id_reino: Number(id_reino),
                id_personaje: Number(id_personaje)
            }
        },
    })
    ErrorController.ExistenceCheck(find_habitante, 'Habitante')

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


