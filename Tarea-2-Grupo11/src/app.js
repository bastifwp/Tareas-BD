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

//endpoints(Routes)

//Endpoits para Trabajos:
app.post('/trabajos', TrabajosController.createTrabajo)
app.get('/trabajos', TrabajosController.getTrabajos)
app.get('/trabajos/:id', TrabajosController.getTrabajoById)
app.delete('/trabajos/:id', TrabajosController.deleteTrabajoById)
app.put('/trabajos/:id', TrabajosController.updateTrabajoById)

//Endpoints para Personaje_Tiene_Trabajo
app.post('/personaje_tiene_trabajo',Personaje_tiene_trabajoController.createContrato)
app.get('/personaje_tiene_trabajo',Personaje_tiene_trabajoController.getContrato)
app.get('/personaje_tiene_trabajo/:id_trabajo/:id_personaje',Personaje_tiene_trabajoController.getContratoById)
app.delete('/personaje_tiene_trabajo/:id_trabajo/:id_personaje',Personaje_tiene_trabajoController.deleteContratoById)
app.put('/personaje_tiene_trabajo/:id_trabajo/:id_personaje',Personaje_tiene_trabajoController.updateContratoById)

//Endpoints para Personajes
app.post('/personajes',PersonajesController.createPersonaje)
app.get('/personajes', PersonajesController.getPersonaje)
app.get('/personajes/:id',PersonajesController.getPersonajeById)
app.delete('/personajes/:id',PersonajesController.deletePersonajeById)
app.put('/personajes/:id', PersonajesController.updatePersonajeById)

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