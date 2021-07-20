import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from './routes/index';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);
app.use(errors());

//Pegar os erros. Evitar criação de try/cach
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

    //se a instancia do erro for da classe

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        })
    };

    // Error fora da classe

    return res.status(500).json({
        status: 'error',
        message: 'Erro interno',
    });

});

app.listen(3333, () => { console.log("servidor rodando na porta 3333!!") });