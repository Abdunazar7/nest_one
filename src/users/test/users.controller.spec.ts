import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from "@nestjs/testing";

jest.mock("../users.service");

describe("Users controller test", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();
    usersService = moduleRef.get(UsersService);
    usersController = moduleRef.get(UsersController);

    jest.clearAllMocks();
  });

  test("User controller should be defined.", () => {
    expect(usersController).toBeDefined();
  });
});
