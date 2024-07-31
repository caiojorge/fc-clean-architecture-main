import ProductRepositoryInterface from "../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";
import ProductFactory from "../../domain/product/factory/product.factory";
import Product from "../../domain/product/entity/product";

export default class UpdateProductUseCase {

  private ProductRepository: ProductRepositoryInterface;
  
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {

    const product = await this.ProductRepository.find(input.id) as Product;
    product.changeName(input.name);
    product.changePrice(input.price);

    await this.ProductRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
