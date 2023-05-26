import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'


/**************** CRUD TRABAJOS *************/
//Peticion para crear un trabajo (C)
const createTrabajo = async (req, res) => {
    const { descripcion, sueldo } = req.body

    //Realizamos las verificaciones necesarias
    if(typeof sueldo !== 'number'){

        //Creamos nuestro error
        throw new ErrorController.BaseError('Tipo de dato inválido', 418, "El atributo sueldo debe ser un entero")
    }

    if(sueldo < 0){
        throw new ErrorController.BaseError('Sueldo fuera de rango', 418, "weon cagon")
    }

    //En caso de que todo esté en orden lo ingresamos a la base de datos
    const trabajos = await prisma.trabajos.create({ //Creo que aquí podemos ver los errores
        data: {
            descripcion,
            sueldo
        }
    })
    res.json(trabajos) //Podemos devolver un res.status(404), por ejemplos
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