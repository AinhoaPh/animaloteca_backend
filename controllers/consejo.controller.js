// controllers/consejos.controller.js
import { Consejo } from "../db/models/index.js";

const ResponseAPI = {
  msg: "",
  status: "ok",
  data: []
};

export const getConsejos = async (req, res, next) => {
  try {
    const consejos = await Consejo.find();

    ResponseAPI.msg = "Consejos obtenidos";
    ResponseAPI.data = consejos;
    res.status(200).json(ResponseAPI);
  } catch (e) {
    next(e);
  }
};