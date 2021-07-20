import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

interface IRequest {

    name: string;
    price: number;
    quantity: number;
};

class CreateProductService {
    
    public async execute({name, price, quantity}: IRequest): Promise<Product> {

        const productsRepository = getCustomRepository(ProductRepository);

        //Verificar se ja existe o nome do produto cadastrado
        const productExists = await productsRepository.findByName(name);

        if (productExists) {

            throw new AppError('Ja existe um produto com esse nome');
        };

        // caso o if retorne negativo, cria.
        const product = productsRepository.create(
            {
                name,
                price,
                quantity,
            }
        );

        await productsRepository.save(product);

        return product;

    }
}

export default CreateProductService;