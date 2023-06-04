import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'


/**************** CRUD TRABAJOS *************/

//Peticion para crear un trabajo (C)
const createTrabajo = async (req, res) => {
    const { descripcion, sueldo } = req.body

    let sintaxis = [[typeof descripcion,descripcion,'descripcion'],
                    [typeof sueldo,sueldo,'sueldo']]

    let sintaxis_esperada = [['string',45],
                             ['number',0]]

    let not_null = [[sueldo,'sueldo']]

    //Verificamos que los atributos not null estén presentes
    ErrorController.NotNullCheck(not_null)

    //Revisamos atributos
    ErrorController.SintaxCheck(sintaxis,sintaxis_esperada)

    const trabajos = await prisma.trabajos.create({
        data: {
            descripcion,
            sueldo
        }
    })
    res.json(trabajos)
}

//Petición para ver trabajos (R)
const getTrabajos = async (req, res) => {

    const trabajos = await prisma.trabajos.findMany()
    res.json(trabajos)
}

const getTrabajoById = async (req, res) => {
    const {id} = req.params
    const trabajos = await prisma.trabajos.findUnique({
        where: {
            id: id
        }
    })
    res.json(trabajos)
}

//Petición para Actualizar un trabajo (U)
const updateTrabajoById = async (req, res) => {
    const { id } = req.params
    const {descripcion, sueldo} = req.body

    let sintaxis = [[typeof descripcion,descripcion,'descripcion'],
                    [typeof sueldo,sueldo,'sueldo']]

    let sintaxis_esperada = [['string',45],
                             ['number',0]]

    //Revisamos atributos
    ErrorController.SintaxError(sintaxis,sintaxis_esperada)

    const trabajos = await prisma.trabajos.update({
        where : {
            id: Number(id),
        },
        data : {
            descripcion: descripcion,
            sueldo: sueldo
        },

    })
    res.json(trabajos)
}


//Petición para borrar un trabajo(D)
const deleteTrabajoById = async (req, res) => {
    const {id} = req.params
    const deleteTrabajo = await prisma.trabajos.delete({
        where:{
            id: Number(id)
        },
    })
    res.json(deleteTrabajo) //Devuelve el trabajo que eliminó
}

const TrabajosController = {
    createTrabajo,
    getTrabajos,
    getTrabajoById,
    updateTrabajoById,
    deleteTrabajoById,
}

export default TrabajosController