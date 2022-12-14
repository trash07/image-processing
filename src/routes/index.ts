import express, {Request, Response} from "express";
import {fileExists, ls} from "../utils/file-management";

const routes = express.Router();

routes.get('/images', async (req: Request, res: Response) => {
    let queryParameters = req.query;

    const filename = queryParameters.filename;
    const width = queryParameters.width;
    const height = queryParameters.height;

    // await fileExists('./src/full/ok.jpeg')
    // await ls('./src/full')
    res.send();
})

export default routes;
