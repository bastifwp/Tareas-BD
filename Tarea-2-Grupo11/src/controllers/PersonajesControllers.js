import prisma from '../prismaClient.js'

/**************** CRUD PERSONAJES *************/

//Peticion para crear un personaje (C)

const createPersonaje = async (req, res) => {
    const { id, nombre, fuerza, a, objeto } = req.body
    const fecha_nacimiento = new Date(a)
    const Personaje = await prisma.personajes.create({ 
        data: {
            id,
            nombre,
            fuerza,
            fecha_nacimiento,
            objeto
        }
    })
    res.json(Personaje) //Podemos devolver un res.status(404), por ejemplo
}

const PersonajesController = {
    createPersonaje
}

export default PersonajesController