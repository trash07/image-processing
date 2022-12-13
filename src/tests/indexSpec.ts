import {app} from "../index";
import supertest from "supertest";

describe('Image processing test suite', () => {

   it('should be accessible', async () => {
      const response = await supertest(app).get('/api/images');
      expect(response.status).toEqual(200);
   });
});
