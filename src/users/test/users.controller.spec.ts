import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from "@nestjs/testing";
import { User } from "../models/user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stubs/user.stub";

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

  it("User service should be defined.", () => {
    expect(usersService).toBeDefined();
  });

  describe("create user test", () => {
    describe("when create user is called", () => {
      let user: User;
      let createUserDto: CreateUserDto;
      const dto = userStub();

      beforeAll(async () => {
        createUserDto = {
          name: dto.name,
          email: dto.email,
          password: dto.password,
          value: dto.value,
        };

        user = await usersController.create(createUserDto);
      });

      it("then it should call usersService", () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });

      it("then it should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("findAll users test", () => {
    describe("when findAll is called", () => {
      let users: User[];

      beforeAll(async () => {
        users = await usersController.findAll();
      });

      it("then it should call usersService.findAll", () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });

      it("then it should return an array of users", () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe("findOne user test", () => {
    describe("when findOne is called", () => {
      let user: User | null;

      beforeAll(async () => {
        user = await usersController.findOne(userStub().id);
      });

      it("then it should call usersService.findOne with id", () => {
        expect(usersService.findOne).toHaveBeenCalledWith(userStub().id);
      });

      it("then it should return a user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("remove user test", () => {
    describe("when remove is called", () => {
      let result: string;

      beforeAll(async () => {
        result = await usersController.remove(userStub().id);
      });

      it("then it should call usersService.remove with id", () => {
        expect(usersService.remove).toHaveBeenCalledWith(userStub().id);
      });

      it("then it should return success message", () => {
        expect(result).toEqual({
          message: `User with ID ${userStub().id} was deleted successfully`,
        });
      });
    });
  });

  
});
