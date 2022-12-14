import {app} from "../index";
import supertest from "supertest";
import {promises as fs} from 'fs';

describe('Image processing test suite', () => {

   const width = 300;
   const height = 100;
   const filename = '';


   it('should be accessible', async () => {
      const response = await supertest(app).get('/api/images');
      expect(response.status).toEqual(200);
   });

   it('should let transformation take place', async () => {
      expect(true).toBeFalsy();
   });

   it('should respect specified width and height dimensions', async () => {
      expect(true).toBeFalsy();
   });
});
