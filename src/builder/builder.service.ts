import { Injectable } from '@nestjs/common';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { Builder } from './models/builder.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BuilderService {
  constructor(
    @InjectModel(Builder) private readonly builderModel: typeof Builder
  ) {}

  async create(createBuilderDto: CreateBuilderDto): Promise<Builder> {
    const newBuilder = await this.builderModel.create(createBuilderDto);
    return newBuilder;
  }

  findAll() {
    return this.builderModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const builder = await this.builderModel.findByPk(id, {
      include: { all: true },
    });
    if (!builder) return { message: `Builder ${id} not found` };
    return builder;
  }

  async update(id: number, updateBuilderDto: UpdateBuilderDto) {
    const builder = await this.builderModel.update(updateBuilderDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0];
  }

  async remove(id: number) {
    const delCount = await this.builderModel.destroy({ where: { id } });
    if (delCount === 0) {
      return { message: "No builder found to delete." };
    }
    return { message: "Builder deleted successfully.", id };
  }
}
