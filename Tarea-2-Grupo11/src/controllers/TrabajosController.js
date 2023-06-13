import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'




/**************** CRUD TRABAJOS *************/

//Peticion para crear un trabajo (C)
const createTrabajo = async (req, res) => {
    const { descripcion, sueldo } = req.body

    //Sintaxis que se recibe
    let sintaxis = [[descripcion,descripcion,'descripcion'],
                    [sueldo,sueldo,'sueldo']]

    
    //La sintaxis experada por cada tipo de dato
    let sintaxis_esperada = [['string',45],
                             ['number' ,0]]

    //Lista con los atributos que no pueden ser null y el nombre correspondiente
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

    //debemos verificar que el id es un numero y que existe el trabajo
    ErrorController.IdNumberCheck(id)

    const trabajos = await prisma.trabajos.findUnique({
        where: {
            id: Number(id)
        }
    })

    ErrorController.ExistenceCheck(trabajos, "Trabajo")
    res.json(trabajos)
}

//Petición para Actualizar un trabajo (U)
const updateTrabajoById = async (req, res) => {
    const { id } = req.params
    const {descripcion, sueldo} = req.body


    //Verificamos los not null
    let not_null = [[sueldo, 'sueldo']]
    ErrorController.NotNullCheck(not_null)

    //Verificamos la sintaxis
    let sintaxis = [[descripcion ,descripcion,'descripcion'],
                    [sueldo, sueldo,'sueldo']]

    let sintaxis_esperada = [['string',45],
                             ['number',0]]

    //Revisamos atributos
    ErrorController.SintaxCheck(sintaxis,sintaxis_esperada)

    //Debemos verificar que existe el trbabajo que queremos modificar:
    ErrorController.IdNumberCheck(id)

    const find_trabajo = await prisma.trabajos.findUnique({
        where : {
            id: Number(id)
        },
    })
    ErrorController.ExistenceCheck(find_trabajo, 'Trabajo')

    //Ahora podemos actualizar el trabajo en cuestion
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

    //Debemos verificar que lo que queremos eliminar exista
    ErrorController.IdNumberCheck(id)

    const find_trabajo = await prisma.trabajos.findUnique({
        where : {
            id: Number(id)
        },
    })
    ErrorController.ExistenceCheck(find_trabajo, 'Trabajo')

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