import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD REINOS *************/

//Peticion para crear un Reino (C)

const createReino = async (req, res) => {
    const { id, nombre, ubicacion, superficie } = req.body

    //Verificamos que los atributos not null esten presentes
    let not_null = [[nombre, 'nombre'],
                    [ubicacion, 'ubicacion'],
                    [superficie, 'superficie']]

    ErrorController.NotNullCheck(not_null)


    //Ahora veamos los errores de sintaxis
    let sintaxis = [[nombre, nombre, 'nombre'],
                    [ubicacion, ubicacion, 'ubicacion'],
                    [superficie, superficie, 'superficie']]

    let sintaxis_esperada = [['string', 45],
                             ['string', 45],
                             ['number', 0]]
    
    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    
    //ErrorController.ReinosNotNullCheck(nombre,ubicacion,superficie)

    //Revisamos atributos
    //ErrorController.ReinosSintaxCheck(nombre,ubicacion,superficie)

    const Reino = await prisma.reinos.create({ 
        data: {
            id,
            nombre,
            ubicacion,
            superficie
        }
    })
    res.json(Reino) 
}

//Petición para ver un Reino (R)

const getReinos = async (req, res) => {
    const Reinos = await prisma.reinos.findMany()
    res.json(Reinos)
}

const getReinoById = async (req, res) => {
    const {id} = req.params
    const Reino = await prisma.reinos.findUnique({
        where: {
            id: id
        }
    })
    res.json(Reino)
}

//Petición para Actualizar un Reino (U)

const updateReinoById = async (req, res) => {
    const {id} = req.params
    const {nombre,ubicacion,superficie} = req.body

    //Revisamos atributos
    ErrorController.ReinosSintaxCheck(nombre,ubicacion,superficie)

    const Reino = await prisma.reinos.update({
        where : {
            id:id
        },
        data : {
            nombre: nombre,
            ubicacion: ubicacion,
            superficie: superficie
        },
    })
    res.json(Reino)
}

//Petición para borrar un Reino (D)

const deleteReinoById = async (req, res) => {
    const {id} = req.params
    const deleteReino = await prisma.reinos.delete({
        where:{
            id: Number(id)
        },
    })
    res.json(deleteReino) 
}

const ReinosController = {
    createReino,
    getReinos,
    getReinoById,
    updateReinoById,
    deleteReinoById
}

export default ReinosController

