import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './models/company.model';
import { Machine } from '../machine/models/machine.model';
import { Builder } from '../builder/models/builder.model';
import { BuilderModule } from '../builder/builder.module';


@Module({
  imports: [SequelizeModule.forFeature([Company, Machine, Builder]),
  forwardRef(() => BuilderModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
