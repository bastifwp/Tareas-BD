import express from 'express';
import TrabajosController from './controllers/TrabajosController.js';
import Personaje_tiene_trabajoController from './controllers/Personaje_tiene_trabajoControllers.js';
import PersonajesController from './controllers/PersonajesControllers.js';
import KartsController from './controllers/KartsControllers.js';
import Personaje_habita_reinoController from './controllers/Personaje_habita_reinoControllers.js';
import ReinosController from './controllers/ReinosControllers.js';
import Reino_tiene_defensaController from './controllers/Reino_tiene_defensaControllers.js';
import DefensasController from './controllers/DefensasController.js';
import DiplomaciasController from './controllers/DiplomaciasControllers.js';
import EndpointsController from './controllers/EndpointsController.js';
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
app.post('/api/trabajos', use(TrabajosController.createTrabajo))
app.get('/api/trabajos', use(TrabajosController.getTrabajos))
app.get('/api/trabajos/:id', use(TrabajosController.getTrabajoById))
app.delete('/api/trabajos/:id', use(TrabajosController.deleteTrabajoById))
app.put('/api/trabajos/:id', use(TrabajosController.updateTrabajoById))

//Endpoints para Personaje_Tiene_Trabajo
app.post('/api/personaje_tiene_trabajo',use(Personaje_tiene_trabajoController.createContrato))
app.get('/api/personaje_tiene_trabajo',use(Personaje_tiene_trabajoController.getContrato))
app.get('/api/personaje_tiene_trabajo/:id_trabajo/:id_personaje', use(Personaje_tiene_trabajoController.getContratoById))
app.delete('/api/personaje_tiene_trabajo/:id_trabajo/:id_personaje', use(Personaje_tiene_trabajoController.deleteContratoById))
app.put('/api/personaje_tiene_trabajo/:id_trabajo/:id_personaje', use(Personaje_tiene_trabajoController.updateContratoById))

//Endpoints para Personajes
app.post('/api/personajes', use(PersonajesController.createPersonaje))
app.get('/api/personajes', use(PersonajesController.getPersonaje))
app.get('/api/personajes/:id', use(PersonajesController.getPersonajeById))
app.delete('/api/personajes/:id', use(PersonajesController.deletePersonajeById))
app.put('/api/personajes/:id', use(PersonajesController.updatePersonajeById))

//Endpoints para Karts
app.post('/api/karts',use(KartsController.createKart))
app.get('/api/karts',use(KartsController.getKarts))
app.get('/api/karts/:id',use(KartsController.getKartById))
app.delete('/api/karts/:id',use(KartsController.deleteKartById))
app.put('/api/karts/:id',use(KartsController.updateKartById))

//Endpoints para Personaje_habita_reino
app.post('/api/personaje_habita_reino',use(Personaje_habita_reinoController.createHabitante))
app.get('/api/personaje_habita_reino',use(Personaje_habita_reinoController.getHabitantes))
app.get('/api/personaje_habita_reino/:id_reino/:id_personaje',use(Personaje_habita_reinoController.getHabitanteById))
app.delete('/api/personaje_habita_reino/:id_reino/:id_personaje',use(Personaje_habita_reinoController.deleteHabitanteById))
app.put('/api/personaje_habita_reino/:id_reino/:id_personaje',use(Personaje_habita_reinoController.updateHabitanteById))

//Endpoints para Reinos
app.post('/api/reinos',use(ReinosController.createReino))
app.get('/api/reinos',use(ReinosController.getReinos))
app.get('/api/reinos/:id',use(ReinosController.getReinoById))
app.delete('/api/reinos/:id',use(ReinosController.deleteReinoById))
app.put('/api/reinos/:id',use(ReinosController.updateReinoById))

//Endpoints para Reino_tiene_defensa
app.post('/api/reino_tiene_defensa',use(Reino_tiene_defensaController.createPosesion))
app.get('/api/reino_tiene_defensa',use(Reino_tiene_defensaController.getPosesiones))
app.get('/api/reino_tiene_defensa/:id_reino/:id_defensa',use(Reino_tiene_defensaController.getPosesionById))
app.delete('/api/reino_tiene_defensa/:id_reino/:id_defensa',use(Reino_tiene_defensaController.deletePosesionById))

//Endpoints para Defensas
app.post('/api/defensas',use(DefensasController.createDefensa))
app.get('/api/defensas',use(DefensasController.getDefensas))
app.get('/api/defensas/:id',use(DefensasController.getDefensaById))
app.delete('/api/defensas/:id',use(DefensasController.deleteDefensaById))
app.put('/api/defensas/:id',use(DefensasController.updateDefensaById))

//Endpoints para Diplomacias
app.post('/api/diplomacias',use(DiplomaciasController.createDiplomacia))
app.get('/api/diplomacias',use(DiplomaciasController.getDiplomacias))
app.get('/api/diplomacias/:id_reino1/:id_reino2',use(DiplomaciasController.getDiplomaciaById))
app.delete('/api/diplomacias/:id_reino1/:id_reino2',use(DiplomaciasController.deleteDiplomaciaById))
app.put('/api/diplomacias/:id_reino1/:id_reino2',use(DiplomaciasController.updateDiplomaciaById))

//Endpoints
app.get('/api/top5personajesConMasFuerza', use(EndpointsController.top5Fuerza))
app.get('/api/personajeConMasKarts', use(EndpointsController.masKarts))
app.get('/api/cantidadHabitantes/:id_reino',use(EndpointsController.cantidadHabitantes))
app.get('/api/gobernante/:id_reino', use(EndpointsController.gobernante))
app.get('/api/gobernante', use(EndpointsController.gobernante))
//==========================================================//
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!!' });
})
//==========================================================//


// 404 not found route
app.use((_, res) => {
    res.status(404).json({ message: 'Not found' });
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