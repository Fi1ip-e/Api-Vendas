import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";

export default class ProductsController {

    public async index(req: Request, res: Response): Promise<Response> {

        const ListProducts = new ListProductService();
        const products = await ListProducts.execute();

        return res.json(products);
    }

    //Exibir um produto. puxa o serviço ShowProductService
    public async Show(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;
        const showProduct = new ShowProductService();

        const products = await showProduct.execute({id});

        return res.json(products)
    }

    //Create
    public async Create(req: Request, res: Response): Promise<Response> {

        const {name, price, quantity} = req.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name,
            price,
            quantity
        });

        return res.json(product);
    }

    //Atualização
    public async Update(req: Request, res: Response): Promise<Response> {

        const {name, price, quantity} = req.body;
        const {id} = req.params;

        const updateProduct = new UpdateProductService();
        const product = await updateProduct.execute({
            id,
            name,
            price,
            quantity,
        });

        return res.json(product)

    }

    public async Delete(req: Request, res: Response): Promise<Response> {

        const {id} = req.params;
        
        const deleteProduct = new DeleteProductService();
        await deleteProduct.execute({id});

        return res.json([]);
    }
}