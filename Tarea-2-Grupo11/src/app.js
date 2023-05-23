import express from 'express';
import TrabajosController from './controllers/TrabajosController.js';
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