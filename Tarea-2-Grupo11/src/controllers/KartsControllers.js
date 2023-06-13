import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'

/**************** CRUD KARTS *************/

//Peticion para crear un kart (C)

const createKart = async (req, res) => {
    const { modelo, color, velocidad_maxima, id_personaje } = req.body

    //Debemos ver los errores posibles
    //Debemos ver los errores not null, la fk de id_personaje puede ser null por el tipo de relación
    let not_null = [[modelo, 'modelo'],
                    [color, 'color']]
    
    ErrorController.NotNullCheck(not_null)

    //Ahora debemos ver los errores de sintaxis
    let sintaxis = [[modelo, modelo, 'modelo'],
                    [color, color, 'color'],
                    [velocidad_maxima, velocidad_maxima, 'velocidad_maxima'],
                    [id_personaje, id_personaje, 'id_personaje']]

    let sintaxis_esperada = [['string', 45],
                             ['string', 45],
                             ['number', 0],
                             ['number', 0]]

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)

    //Debemos verificar que existe el personaje sólo si es distinto a null
    if(id_personaje != null){
        ErrorController.IdNumberCheck(id_personaje)
    
        const find_personaje = await prisma.personajes.findUnique({
            where: {
                id: Number(id_personaje)
            }
        })
        ErrorController.ExistenceCheck(find_personaje, 'Personaje')
    }


    const Kart = await prisma.karts.create({ 
        data: {
            modelo,
            color,
            velocidad_maxima,
            id_personaje
        }
    })
    res.json(Kart) 
}

//Petición para ver karts (R)

const getKarts = async (req, res) => {
    const Karts = await prisma.karts.findMany()
    res.json(Karts)
}

const getKartById = async (req, res) => {
    const {id} = req.params

    //Debemos verificar que el id sea un número
    ErrorController.IdNumberCheck(id)
    

    const Kart = await prisma.karts.findUnique({
        where: {
            id: Number(id)
        }
    })

    //Ahora debeoms verificar de qué existió el id:
    ErrorController.ExistenceCheck(Kart, 'Kart')

    res.json(Kart)
}

//Petición para Actualizar un kart (U)

const updateKartById = async (req, res) => {
    const { id } = req.params
    const {modelo,color,velocidad_maxima,id_personaje} = req.body
    

    //Verificaremos la sintaxis del body
    let sintaxis = [[modelo, modelo, 'modelo'],
                    [color, color, 'color'],
                    [velocidad_maxima, velocidad_maxima, 'velocidad_maxima']]

    let sintaxis_esperada = [['string', 45],
                             ['string', 45],
                             ['number', 0]]

    ErrorController.SintaxCheck(sintaxis, sintaxis_esperada)


    //Debemos verificar que el id del kart sea un número y que exista ese kart
    ErrorController.IdNumberCheck(id)

    const find_kart = await prisma.karts.findUnique({
        where: {
            id: Number(id)
        }
    })
    ErrorController.ExistenceCheck(find_kart,'Kart')
    
    //Debemos verificar que existe el personaje sólo si es distinto a null
    if(id_personaje != null){
        ErrorController.IdNumberCheck(id_personaje)

        const find_personaje = await prisma.personajes.findUnique({
            where: {
                id: Number(id_personaje)
            }
        })
        ErrorController.ExistenceCheck(find_personaje, 'Personaje')
    }


    const Kart = await prisma.karts.update({
        where : {
            id: Number(id)
        },
        data : {
            modelo: modelo,
            color: color,
            velocidad_maxima: velocidad_maxima,
            id_personaje: id_personaje
        },

    })
    res.json(Kart)
}

//Petición para borrar un kart (D)

const deleteKartById = async (req, res) => {
    const {id} = req.params

    //Debemos verificar que el id sea un numero
    ErrorController.IdNumberCheck(id)

    const deleteKart = await prisma.karts.delete({
        where:{
            id: Number(id)
        },
    })

    ErrorController.ExistenceCheck(deleteKart, 'Kart')
    
    res.json(deleteKart) 
}

const KartsController = {
    createKart,
    getKarts,
    getKartById,
    updateKartById,
    deleteKartById
}

export default KartsController