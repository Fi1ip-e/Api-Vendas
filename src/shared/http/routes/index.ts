import {Router} from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({message: "Ola mundo!"});
})

export default routes;