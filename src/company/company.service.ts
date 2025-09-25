import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Company } from "./models/company.model";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyModel: typeof Company
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const newCompany = await this.companyModel.create(createCompanyDto);
    return newCompany;
  }

  findAll() {
    return this.companyModel.findAll();
  }

  async findOne(id: number): Promise<Company | null> {
    const company = await this.companyModel.findByPk(id);
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    return company;
  }

  findByName(name: string): Promise<Company | null> {
    return this.companyModel.findOne({ where: { name } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyModel.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return company[1][0];
  }

  async remove(id: number) {
    const delCount = await this.companyModel.destroy({ where: { id } });
    if (delCount === 0) {
      return { message: "No company found to delete." };
    }
    return { message: "Company deleted successfully.", id };
  }
}
