import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'


/**************** CRUD TRABAJOS *************/

//Peticion para crear un trabajo (C)
const createTrabajo = async (req, res) => {
    const { descripcion, sueldo } = req.body

    //Verificamos que los atributos not null estén presentes
    if(sueldo == null){
        throw new ErrorController.BaseError('Informacion insuficiente',400,'El atributo sueldo es requerido')
    }
    //Revisamos atributos
    if(typeof sueldo !== 'number'){
        throw new ErrorController.BaseError('Tipo de dato inválido', 418, "El atributo sueldo debe ser un entero")
    }
    if(sueldo < 0){
        throw new ErrorController.BaseError('Sueldo fuera de rango', 418, "El atributo sueldo no puede ser un entero menor a 0")
    }
    if(typeof descripcion !== 'string'){
        throw new ErrorController.BaseError('Tipo de dato invalido',400,'El atributo descripcion debe ser un string')
    }
    if(descripcion.length > 45){
        throw new ErrorController.BaseError('Descripcion fuera de rango',400,'El atributo descripcion no puede sobrepasar los 45 caracteres')
    }

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

    //Revisamos atributos
    if(typeof descripcion !== 'string'){
        throw new ErrorController.BaseError('Tipo de dato invalido',400,'El atributo descripcion debe ser un string')
    }
    if(sueldo.length > 45){
        throw new ErrorController.BaseError('Descripcion fuera de rango',400,'El atributo descripcion no puede sobrepasar los 45 caracteres')
    }
    if(typeof sueldo !== 'number'){
        throw new ErrorController.BaseError('Tipo de dato invalido',400,'El atributo sueldo debe ser un entero')
    }
    if(sueldo < 0){
        throw new ErrorController.BaseError('Sueldo fuera de rango', 418, "El atributo sueldo no puede ser un entero menor a 0")
    }

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