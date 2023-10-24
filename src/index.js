import express from 'express';
import morgan from 'morgan';
import router from './routes.js';

const app = express();
const PORT = process.env.PORT || 3000;



app.use(morgan('dev'));
app.use(express.json());//correción
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
