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

    let sintaxis_esperada = [['boolean', 0],
                             ['number', 0],
                             ['number', 0]]
    
    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    //Debemos verificar que los reinos que se envían existen 
    const find_reino1 = await prisma.reinos.findUnique({
        where: {
            id: Number(id_reino_1)
        },
    })
    const find_reino2 = await prisma.reinos.findUnique({
        where: {
            id: Number(id_reino_2)
        }
    })

    ErrorController.ExistenceCheck(find_reino1, 'Reino 1')
    ErrorController.ExistenceCheck(find_reino2, 'Reino 2')


    //Debemos verificar si ya existe la diplomacia 
    const find_diplomacia = await prisma.diplomacias.findUnique({
        where: {
            id_reino_1_id_reino_2 : {id_reino_1, id_reino_2}
        }
    })
    ErrorController.InDbCheck(find_diplomacia, 'Diplomacia')

    
    //Luego de validar todos los errores podemos crear la diplomacia
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

    //Verificamos que los id son enteros 
    ErrorController.IdNumberCheck(id_reino1)
    ErrorController.IdNumberCheck(id_reino2)


    const Diplomacia = await prisma.diplomacias.findUnique({
        where : {
            id_reino_1_id_reino_2 : {
                id_reino_1: Number(id_reino1),
                id_reino_2: Number(id_reino2)
            }
        },
    })

    ErrorController.ExistenceCheck(Diplomacia,'diplomacia')


    res.json(Diplomacia)
}

//Petición para Actualizar un Diplomacia (U)

const updateDiplomaciaById = async (req, res) => {
    const {id_reino1,id_reino2} = req.params
    const {es_aliado} = req.body

    //Debemos verificar que la diplomacia a modificar existe
    ErrorController.IdNumberCheck(id_reino1)
    ErrorController.IdNumberCheck(id_reino2)

    const Diplomacia = await prisma.diplomacias.findUnique({
        where : {
            id_reino_1_id_reino_2 : {
                id_reino_1: Number(id_reino1),
                id_reino_2: Number(id_reino2)
            }
        },
    })
    ErrorController.ExistenceCheck(Diplomacia,'diplomacia')

    //Verificaremos lo errores de los atributos null: 
    let not_null = [[es_aliado, 'es_aliado']]

    ErrorController.NotNullCheck(not_null)


    //Ahora veremos si la sintaxis es la correcta
    let sintaxis = [[es_aliado, es_aliado, 'es_aliado']]

    //No se si esta wea va a funcionar por lo de los rangos del booleano
    let sintaxis_esperada = [['boolean', 0]]
    
    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    let diplomacia_new = await prisma.diplomacias.update({
        where :{
            id_reino_1_id_reino_2 :{
                id_reino_1: Number(id_reino1),
                id_reino_2: Number(id_reino2) 
            }
        },
        data : {
            es_aliado: es_aliado
        },
    })

    res.json(diplomacia_new)
}

//Petición para borrar un Diplomacia (D)

const deleteDiplomaciaById = async (req, res) => {
    const {id_reino1,id_reino2} = req.params

    //Debemos veridficar que ambas pk sean números
    ErrorController.IdNumberCheck(id_reino1)
    ErrorController.IdNumberCheck(id_reino2)

    //Verificar que exista esa diplomacia
    const Diplomacia = await prisma.diplomacias.findUnique({
        where : {
            id_reino_1_id_reino_2 : {
                id_reino_1: Number(id_reino1),
                id_reino_2: Number(id_reino2)
            }
        },
    })

    ErrorController.ExistenceCheck(Diplomacia,'diplomacia')

    await prisma.diplomacias.delete({
        where:{
            id_reino_1_id_reino_2 : {
                id_reino_1: Diplomacia.id_reino_1,
                id_reino_2: Diplomacia.id_reino_2
            }
        },
    })
    res.json(Diplomacia) 
}

const DiplomaciasController = {
    createDiplomacia,
    getDiplomacias,
    getDiplomaciaById,
    updateDiplomaciaById,
    deleteDiplomaciaById
}

export default DiplomaciasController