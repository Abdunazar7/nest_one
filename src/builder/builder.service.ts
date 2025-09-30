import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Builder } from './models/builder.model';
import { Company } from '../company/models/company.model';
import { CompanyService } from '../company/company.service';

@Injectable()
export class BuilderService {

  constructor(
      @InjectModel(Builder) private readonly builderModel: typeof Builder,
      @InjectModel(Company) private readonly companyModel: typeof Company,
      private readonly companyService:CompanyService
    ) {}

  async create(createBuilderDto: CreateBuilderDto) {
    const {companyId} = createBuilderDto
    const company = this.companyService.findOne(companyId)
    // const company = await this.companyModel.findByPk(companyId)
    if(!company){
      throw new NotFoundException("bunay company mavjus emas")
    }
    return this.builderModel.create(createBuilderDto)
  }

  findAll() {
    return this.builderModel.findAll({include:{all: true}})
  }

  findOne(id: number) {
    return `This action returns a #${id} builder`;
  }

  update(id: number, updateBuilderDto: UpdateBuilderDto) {
    return `This action updates a #${id} builder`;
  }

  remove(id: number) {
    return `This action removes a #${id} builder`;
  }
}
