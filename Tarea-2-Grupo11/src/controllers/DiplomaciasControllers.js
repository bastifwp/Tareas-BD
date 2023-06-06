import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD diplomacias *************/

//Peticion para crear un Diplomacia (C)

const createDiplomacia = async (req, res) => {
    const { id_reino_1, id_reino_2, es_aliado } = req.body

    //Verificaremos lo errores de los atributos null: 
    let not_null = [[es_aliado, 'es_aliado'],
                    [id_reino_1, 'id_reino_1'],
                    [id_reino_2, 'id_reino_2']]

    ErrorController.NotNullCheck(not_null)


    //Ahora veremos si la sintaxis es la correcta
    let sintaxis = [[es_aliado, es_aliado, 'es_aliado'],
                    [id_reino_1, id_reino_1, 'id_reino_1'],
                    [id_reino_2, id_reino_2, 'id_reino_2']]

    //No se si esta wea va a funcionar por lo de los rangos del booleano
    let sintaxis_esperada = [['boolean', 0],
                             ['number', 0],
                             ['number', 0]]
    
    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)


    //Debemos verificar que los id que se envían existen 
                             


    const Diplomacia = await prisma.diplomacias.create({ 
        data: {
            id_reino_1,
            id_reino_2,
            es_aliado
        }
    })
    res.json(Diplomacia) 
}

//Petición para ver un Diplomacia (R)

const getDiplomacias = async (req, res) => {
    const Diplomacias = await prisma.diplomacias.findMany()
    res.json(Diplomacias)
}

const getDiplomaciaById = async (req, res) => {
    const {id_reino1,id_reino2} = req.params
    const Diplomacia = await prisma.diplomacias.findUnique({
        where: {
            id_reino1_id_reino2 : {
                id_reino1: id_reino1,
                id_reino2: id_reino2
            }
        }
    })
    res.json(Diplomacia)
}

//Petición para Actualizar un Diplomacia (U)

const updateDiplomaciaById = async (req, res) => {
    const {id_reino1,id_reino2} = req.params
    const {es_aliado} = req.body
    const Diplomacia = await prisma.diplomacias.update({
        where : {
            id_reino1_id_reino2 : {
                id_reino1: id_reino1,
                id_reino2: id_reino2
            }
        },
        data : {
            es_aliado: es_aliado
        },
    })
    res.json(Diplomacia)
}

//Petición para borrar un Diplomacia (D)

const deleteDiplomaciaById = async (req, res) => {
    const {id_reino1,id_reino2} = req.params
    const deleteDiplomacia = await prisma.diplomacias.delete({
        where:{
            id_reino1_id_reino2 : {
                id_reino1: id_reino1,
                id_reino2: id_reino2
            }
        },
    })
    res.json(deleteDiplomacia) 
}

const DiplomaciasController = {
    createDiplomacia,
    getDiplomacias,
    getDiplomaciaById,
    updateDiplomaciaById,
    deleteDiplomaciaById
}

export default DiplomaciasController