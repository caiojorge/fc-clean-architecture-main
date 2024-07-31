import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "../../product/find/find.product.usecase";
import CreateProductUseCase from "../../product/create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputCreateCustomerDto } from "../../customer/create/create.customer.dto";

describe("Test update product use case", () => {
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

  it("should update a customer", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const findProductUseCase = new FindProductUseCase(productRepository);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

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

    const updateInput = {
      id: createOutput.id,
      name: "Product 2",
      price: 20,
    };

    const updateOutput = await updateProductUseCase.execute(updateInput);

    expect(updateOutput).toEqual(updateInput);

  });
});
