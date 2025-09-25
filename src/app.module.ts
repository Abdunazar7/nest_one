import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from './company/company.module';
import { Company } from './company/models/company.model';
import { DriverModule } from './driver/driver.module';
import { BuilderModule } from './builder/builder.module';
import { Driver } from './driver/models/driver.model';
import { Builder } from './builder/models/builder.model';
import { MachineModule } from './machine/machine.module';
import { Machine } from './machine/models/machine.model';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [Company, Driver, Builder, Machine],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    CompanyModule,
    DriverModule,
    BuilderModule,
    MachineModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
