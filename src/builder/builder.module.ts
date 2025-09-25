import { Module, forwardRef } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { BuilderController } from './builder.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from '../company/models/company.model';
import { Builder } from './models/builder.model';
import { CompanyModule } from '../company/company.module';


@Module({
  imports: [SequelizeModule.forFeature([Company, Builder]),
  forwardRef(() => CompanyModule),
  ],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
