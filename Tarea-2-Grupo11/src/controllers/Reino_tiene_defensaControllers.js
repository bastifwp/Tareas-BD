import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD reino_tiene_defensa *************/

//Peticion para crear asignar un trabajo a una persona (C)

const createPosesion = async (req, res) => {
    const { id_reino, id_defensa } = req.body

    //Verificamos que los atributos not null esten presentes
    let not_null = [[id_reino, 'id_reino '],
                    [id_defensa, 'id_defensa']]

    ErrorController.NotNullCheck(not_null)


    //Revisamos que la syntaxis esté correcta:
    let sintaxis = [[id_reino, id_reino, 'id_reino'],
                    [id_defensa, id_defensa, 'id_defensa']]

    let sintaxis_esperada = [['number', 0],
                             ['number', 0]]

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    //Debemos verificar que el reino exista
    const find_reino = await prisma.reinos.findUnique({
        where: {
            id: id_reino
        }
    })
    ErrorController.ExistenceCheck(find_reino, 'Reino')

    //Debemos verificar que la defensa exista 
    const find_defensa = await prisma.reinos.findUnique({
        where: {
            id: id_defensa
        }
    })
    ErrorController.ExistenceCheck(find_defensa, 'Defensa')

    //Debemos verificar si ya existe la posesión
    const find_posesion = await prisma.reino_tiene_defensa.findUnique({
        where: {
            id_defensa_id_reino : {id_defensa, id_reino}
        }
    })
    ErrorController.InDbCheck(find_posesion, "Posesion")   

    //ahora podemos crear la posesion 
    const Posesion = await prisma.reino_tiene_defensa.create({ //Creo que aquí podemos ver los errores
        data: {
            id_reino,
            id_defensa
        }
    })
    res.json(Posesion) //Podemos devolver un res.status(404), por ejemplos
}


//Petición para ver Posesions (R)

const getPosesiones = async (req, res) => {
    const Posesions = await prisma.reino_tiene_defensa.findMany()
    res.json(Posesions)
}

const getPosesionById = async (req, res) => {
    const {id_reino,id_defensa} = req.params

    //Verificaremos si los id's entregados son numeros
    ErrorController.IdNumberCheck(id_reino)
    ErrorController.IdNumberCheck(id_defensa)    

    const Posesion = await prisma.reino_tiene_defensa.findUnique({
        where: {
            id_reino_id_defensa : {
                id_reino: Number(id_reino),
                id_defensa: Number(id_defensa),
            }
        }
    })
    //Verificamos si existe el habitante
    ErrorController.ExistenceCheck(Posesion, 'Posesion')   

    res.json(Posesion)
}

//Petición para Actualizar un Posesion (U)

const updatePosesionById = async (req, res) => {
    const {id_reino,id_defensa} = req.params
    const {id_reinoNew,id_defensaNew} = req.body


    ErrorController.Reino_tiene_DefensaSintaxError(id_reinoNew,id_defensaNew)

    const Posesion = await prisma.reino_tiene_defensa.update({
        where : {
            id_reino_id_defensa : {
                id_reino: Number(id_reino),
                id_defensa: Number(id_defensa),
            }
        },
        data : {
            id_reino: id_reinoNew,
            id_defensa: id_defensaNew
        },

    })
    res.json(Posesion)
}

//Petición para borrar un trabajo(D)

const deletePosesionById = async (req, res) => {
    const {id_reino,id_defensa} = req.params

    //Debemos verificar si existe la posesión a eliminar:
    ErrorController.IdNumberCheck(id_reino)
    ErrorController.IdNumberCheck(id_defensa)

    const find_posesion = await prisma.reino_tiene_defensa.findUnique({
        where:{
            id_defensa_id_reino :{
                id_defensa: Number(id_defensa),
                id_reino: Number(id_reino)
            }
        },
    })
    ErrorController.ExistenceCheck(find_posesion, 'Posesion')

    
    const deletePosesion = await prisma.reino_tiene_defensa.delete({
        where:{
            id_reino_id_defensa : {
                id_reino: Number(id_reino),
                id_defensa: Number(id_defensa),
            }
        },
    })
    res.json(deletePosesion) //Devuelve el trabajo que eliminó
}

const Reino_tiene_defensaController = {
    createPosesion,
    getPosesiones,
    getPosesionById,
    updatePosesionById,
    deletePosesionById,
}

export default Reino_tiene_defensaController