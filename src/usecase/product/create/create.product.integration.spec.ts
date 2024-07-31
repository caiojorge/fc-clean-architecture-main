import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "../find/find.product.usecase";
import CreateProductUseCase from "./create.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputCreateCustomerDto } from "../../customer/create/create.customer.dto";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const findProductUseCase = new FindProductUseCase(productRepository);

    //const product1 = ProductFactory.create("a", "Product 1", 10) as Product;

    //await productRepository.create(product1);

    const createInput = {
      id: "",
      name: "Product 1",
      price: 10,
    };

    const createOutput = await createProductUseCase.execute(createInput);

    const input = {
      id: createOutput.id,
    };

    const output = {
      id: createOutput.id,
      name: createOutput.name,
      price: createOutput.price,
    };

    const findOutput = await findProductUseCase.execute(input);

    expect(findOutput).toEqual(output);
  });
});
