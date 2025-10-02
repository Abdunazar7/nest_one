import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { userStub } from "./stubs/user.stub";
import { JwtService } from "@nestjs/jwt";
import { RoleService } from "../../role/role.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { Role } from "../../role/models/role.model";
import { CreateUserDto } from "../dto/create-user.dto";

describe("Users service", () => {
  let usersService: UsersService;

  const mockUserModel = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
    destroy: jest.fn(),
  };

  const mockRoleModel = {
    findOne: jest.fn().mockImplementation(() => "USER"),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        RoleService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRoleModel,
        },
      ],
    }).compile();

    usersService = moduleRef.get(UsersService);
  });

  it("should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("createUser", () => {
    describe("when create User is called.", () => {
      let createUserDto: CreateUserDto;
      let newUser: User;
      beforeEach(async () => {
        createUserDto = {
          name: userStub().name!,
          email: userStub().email!,
          password: userStub().password!,
          value: userStub().value!,
        };
        newUser = await usersService.create(createUserDto);
        console.log(newUser);
      });

      it("should be create newUser", async () => {
        expect(newUser).toMatchObject({
          ...userStub(),
        });
      });
    });
  });



  

});
