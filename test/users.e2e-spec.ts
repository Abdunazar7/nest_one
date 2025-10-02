import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe ("User e2e", () => {
    let app: INestApplication;
    let token: String;

    jest.setTimeout(15000);
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            
        }).compile();
        app = moduleFixture.createNestApplication();
        //app.setGlobalPrefix("api");
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        const response = await request(app.getHttpServer())
          .post("/auth/signin")
          .send({
            email: "john.doe@example.com",
            password: "12345",
          });
            token = response.body.token;
            console.log("token", token);

    });
    it("/users (GET)--> 200 OK", () => {
        return request(app.getHttpServer())
            .get("/users")
            .set("Authorization", `Bearer ${token}`)
            .expect("Content-Type", /json/)
            .expect(200);

    });


    afterAll(async () => {
        await app.close();
    })

})