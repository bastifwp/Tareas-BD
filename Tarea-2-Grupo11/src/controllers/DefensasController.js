import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD DefensaS *************/

//Peticion para crear un Defensa (C)

const createDefensa = async (req, res) => {
    const { defensa } = req.body

    //Debemos realizar la gestión de errores

    //verificar si se cumplen los atributos que no pueden ser null
    //Lista con los atributos not null
    let not_null = [[defensa, 'defensa']] //atributos

    ErrorController.NotNullCheck(not_null)

    //Verificar errores de sintaxix:
    let sintaxis = [[defensa, defensa, 'defensa']]
    let sintaxis_esperada = [['string', 45]] //tipo de dato y largo max

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    const Defensa = await prisma.defensas.create({ 
        data: {
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

    //Antesde buscarlo debemos verificar que el id es un número entero
    ErrorController.IdNumberCheck(id)


    const Defensa = await prisma.defensas.findUnique({
        where: {
            id: Number(id)
        }
    })

    ErrorController.ExistenceCheck(Defensa,'defensa') 

    res.json(Defensa)
}

//Petición para Actualizar un Defensa (U)
const updateDefensaById = async (req, res) => {
    const {id} = req.params
    const {defensa} = req.body

    //Verificamos que el id sea un número
    ErrorController.IdNumberCheck(id)

    const Defensa = await prisma.defensas.findUnique({
        where : {
            id:Number(id)
        },
    })
    ErrorController.ExistenceCheck(Defensa,'defensa')

    let not_null = [[defensa, 'defensa']] //atributos
    ErrorController.NotNullCheck(not_null)

    //Verificar errores de sintaxix:
    let sintaxis = [[defensa, defensa, 'defensa']]
    let sintaxis_esperada = [['string', 45]] //tipo de dato y largo max

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    await prisma.defensas.update({
        where: {
            id : Defensa.id
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

    //Verificamos que el id sea un número
    ErrorController.IdNumberCheck(id)

    const Defensa = await prisma.defensas.findUnique({
        where : {
            id:Number(id)
        },
    })
    ErrorController.ExistenceCheck(Defensa,'Defensa')

    const deleteDefensa = await prisma.defensas.delete({
        where:{
            id: Defensa.id
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