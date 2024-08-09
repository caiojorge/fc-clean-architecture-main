import express, { Request, Response } from "express";
import CreateUseCase from "../../../usecase/product/create/create.product.usecase";
import ListUseCase from "../../../usecase/product/list/list.product.usecase";
import Repository from "../../product/repository/sequelize/product.repository";
import Presenter from "../presenters/product.presenter";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateUseCase(new Repository());
  try {
    const productDto = {
      id: "",
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListUseCase(new Repository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(Presenter.listXML(output)),
  });
});
