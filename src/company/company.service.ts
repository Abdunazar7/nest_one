import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './models/company.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyModel: typeof Company
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companyModel.create(createCompanyDto);
  }

  findAll(): Promise<Company[]> {
    return this.companyModel.findAll({include: [{all:true}]});
  }

  findOne(id: number): Promise<Company | null> {
    return this.companyModel.findByPk(id);
  }

  findOneByName(name: string): Promise<Company | null> {
    return this.companyModel.findOne({ where: { name } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyModel.update(updateCompanyDto,{
      where: {id},
      returning: true
    })
    return company[1][0]
  }

  async remove(id: number) {
    const delCount = await this.companyModel.destroy({where:{id}})
    if(!delCount){
      return {message: "Bunday Company mavjud emas"}
    }
    return {message: "kompaniya ochrildi", id}
  }
}
