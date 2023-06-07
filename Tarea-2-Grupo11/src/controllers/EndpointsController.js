import prisma from '../prismaClient.js'



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



const EndpointsController =  {
    top5Fuerza,
    masKarts
}

export default EndpointsController