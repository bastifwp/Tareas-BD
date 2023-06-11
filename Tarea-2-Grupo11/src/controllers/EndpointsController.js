import prisma from '../prismaClient.js'
import ErrorController from './ErrorController.js'



//Función que devuelve los 5 personajes con mayor fuerza
const top5Fuerza = async (req, res) => {

    //Ordenamos los personajes de manera descendiente y tomamos los 5 primeros 
    const Personajes = await prisma.personajes.findMany({
        orderBy: {
            fuerza: 'desc'
        },

        take: 5
    })
    res.json(Personajes)
}


//Función que encuentra el personaje que tiene más karts
const masKarts = async (req, res) => {
    //Primeramente obtendremos todos los karts
    const Karts = await prisma.karts.findMany()

    //Ahora con un diccionaro {"id_personaje": 1} iremos subando respectivamente
    let id_personaje_nKarts = {}

    for(let i = 0; i < Karts.length; i++){
        if(!(Karts[i].id_personaje in id_personaje_nKarts)){
            id_personaje_nKarts[Karts[i].id_personaje] = 1
        }
        else{
            id_personaje_nKarts[Karts[i].id_personaje] += 1
        }
    }

    //Una vez tenemos cuántos karts tiene cada personaje debemos identificar el que tiene más:
    let id_personaje = NaN
    let n_karts = 0

    //Recorremos el diccionario y ocupamos algoritmo para encontrar el mayor
    for (const key of Object.keys(id_personaje_nKarts)){ 
        if(id_personaje_nKarts[key] > n_karts){
            id_personaje = key
            n_karts = id_personaje_nKarts[key]
        } 
     };

    //Ahora debemos buscar el nombre del personaje con el id correspondiente
    let personaje_return = await prisma.personajes.findUnique({
        where:{
            id: Number(id_personaje)
        }
    })

    //Ahora guardamos lo que debemos devolver
    let json_return = {
        "Nombre" : personaje_return.nombre,
        "Cantidad de Karts" : n_karts
    }


    res.json(json_return) 
}

const cantidadHabitantes = async (req, res) => {

    const {id_reino} = req.params

    const Reino = prisma.reinos.findUnique({
        where: {
            id : Number(id_reino)
        }
    })

    ErrorController.ExistenceCheck(Reino,'reino')

    //obtenemos todos los habitantes del reino
    const Habitantes = await prisma.personaje_habita_reino.findMany({
        where:{
            id_reino : Reino.id
        }
    })

    //Luego contamos los habitantes
    const n_habitantes = Habitantes.length


    console.log(Habitantes[0])

    let json_return = {
        "Nombre reino" : Reino.nombre,
        "Cantidad de habitantes" : n_habitantes
    }

    res.json(json_return)
}

const gobernante = async (req, res) => {

    var {id_reino} = req.params

    if(id_reino == null){
        
        //Buscamos habitantes 
        var Habitantes = await prisma.personaje_habita_reino.findMany()

        //Estructura del diccionario: {id_reino1:[id_gobernante1, id_gobernante2...], }
        let Gobernantes = {}


        for (let index = 0; index < Habitantes.length; index++) {
            if(!(Habitantes[index].id_reino in Gobernantes)){
                Gobernantes[Habitantes[index].id_reino] = []
            }
            if(Habitantes[index].es_gobernante == true){
                Gobernantes[Habitantes[index].id_reino].push(Habitantes[index].id_personaje)
            }
        }

        let Json = {}

        for (const key of Object.keys(Gobernantes)) {
            var Reino = await prisma.reinos.findUnique({
                where:{
                    id : Number(key)
                }
            })
            var nombreReino = Reino.nombre
            if(!(nombreReino in Json)){
                Json[nombreReino] = []
            }
            for (let index = 0; index < Gobernantes[key].length; index++) {
                var Personaje = await prisma.personajes.findUnique({
                    where:{
                        id : Number(Gobernantes[key][index])
                    }
                })
                var nombrePersonaje = Personaje.nombre
                Json[nombreReino].push(nombrePersonaje)
            }
        }

        res.json(Json)

    }
    else{

        var Reino = await prisma.reinos.findUnique({
            where:{
                id : Number(id_reino)
            }
        })

        ErrorController.ExistenceCheck(Reino,'reino')


        var nombreReino = Reino.nombre

        var Habitantes = await prisma.personaje_habita_reino.findMany({
            where:{
                id_reino: Number(id_reino)
            }
        })

        var nombresGobernantes = []
        var personaje = null

        for (let index = 0; index < Habitantes.length; index++) {
            if(Habitantes[index].es_gobernante == true){
                console.log(Habitantes[index].id_personaje)
                personaje = await prisma.personajes.findUnique({
                    where:{
                        id : Habitantes[index].id_personaje
                    }
                })
                nombresGobernantes.push(personaje.nombre)
            }
        }

        let Json = {"Nombre reino" : nombreReino,
                    "Gobernantes" : nombresGobernantes}
        res.json(Json)
        
    }
}



const EndpointsController =  {
    top5Fuerza,
    masKarts,
    cantidadHabitantes,
    gobernante
}

export default EndpointsController