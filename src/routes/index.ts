import express, {Request, Response} from "express";

const routes = express.Router();

routes.get('/images', ((req: Request, res: Response) => {
    let queryParameters = req.query;

    const filename = queryParameters.filename;
    const width = queryParameters.width;
    const height = queryParameters.height;

    res.send({filename: filename, width: width, height: height});
}))

export default routes;
