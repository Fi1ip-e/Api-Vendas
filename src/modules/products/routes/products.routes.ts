import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.get('/', productsController.index);

//Exibir
productsRoutes.get('/:id', celebrate(
    {
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    productsController.Show);

    //Cadastrar
productsRoutes.post('/', celebrate(
    {
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        }
    }
), productsController.Create);

//Atualizar
productsRoutes.put('/:id', celebrate(
    {
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        },
        [Segments.PARAMS]: { id: Joi.string().uuid().required() }
    },
), productsController.Update);

//Deletar
productsRoutes.delete('/:id', celebrate(
    {
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        },
        [Segments.PARAMS]: { id: Joi.string().uuid().required() }
    }
), productsController.Delete);

export default productsRoutes;