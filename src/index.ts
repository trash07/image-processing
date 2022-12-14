import express from 'express';
import routes from "./routes";

export const app = express();
const port = 3000;

app.use('/api', routes);

app.listen(port, ():void =>  {
    console.log(`Listening on port ${port}!`)
});
