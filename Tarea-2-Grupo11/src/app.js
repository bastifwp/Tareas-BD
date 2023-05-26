import express from 'express';
import TrabajosController from './controllers/TrabajosController.js';
import Personaje_tiene_trabajoController from './controllers/Personaje_tiene_trabajoControllers.js';
import PersonajesController from './controllers/PersonajesControllers.js';
import morgan from 'morgan';

const ENV = process.env;
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//ErrorHandler
//Encapsula funciones en un tipo de "try catch"
//En caso de cualquier error lo lleva al "Manejo de errores" mediante next
const use = fn => async (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next)
}

//endpoints(Routes)

//Endpoits para Trabajos:
app.post('/trabajos', use(TrabajosController.createTrabajo))
app.get('/trabajos', use(TrabajosController.getTrabajos))
app.get('/trabajos/:id', use(TrabajosController.getTrabajoById))
app.delete('/trabajos/:id', use(TrabajosController.deleteTrabajoById))
app.put('/trabajos/:id', use(TrabajosController.updateTrabajoById))

//Endpoints para Personaje_Tiene_Trabajo
app.post('/personaje_tiene_trabajo',use(Personaje_tiene_trabajoController.createContrato))
app.get('/personaje_tiene_trabajo',use(Personaje_tiene_trabajoController.getContrato))
app.get('/personaje_tiene_trabajo/:id_trabajo/:id_personaje', use(Personaje_tiene_trabajoController.getContratoById))
app.delete('/personaje_tiene_trabajo/:id_trabajo/:id_personaje', use(Personaje_tiene_trabajoController.deleteContratoById))
app.put('/personaje_tiene_trabajo/:id_trabajo/:id_personaje', use(Personaje_tiene_trabajoController.updateContratoById))

//Endpoints para Personajes
app.post('/personajes', use(PersonajesController.createPersonaje))
app.get('/personajes', use(PersonajesController.getPersonaje))
app.get('/personajes/:id', use(PersonajesController.getPersonajeById))
app.delete('/personajes/:id', use(PersonajesController.deletePersonajeById))
app.put('/personajes/:id', use(PersonajesController.updatePersonajeById))

//Endpoints para Karts

//==========================================================//
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!!' });
})
//==========================================================//


// 404 not found route
app.use((_, res) => {
    res.status(404).json({ message: 'Not found Crack!' });
})


//Init server
app.listen(ENV.API_PORT, () => {
    console.log(`Server running on port ${ENV.API_PORT}`);
})

//Manejo de errores (mostrarlos para evitar que se caiga app)
app.use(function(BaseError, req, res, next){
    console.log(BaseError) //Creo que esto no es necesario
    
    //Mostramos la respuesta para que no se caiga
    res.status(BaseError.codigoHttp).json({Error : BaseError.nombre, Descripcion : BaseError.message})
})