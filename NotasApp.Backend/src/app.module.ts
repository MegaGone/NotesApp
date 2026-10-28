import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import global from "./shared/configuration/global.configuration";
import database from "./shared/configuration/database.configuration";

import { ApplicationModule } from './core/application/application.module';
import { InfrastructureModule } from './core/infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [global, database],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions =>
        config.getOrThrow<TypeOrmModuleOptions>("DATABASE"),
    }),
    ApplicationModule,
    InfrastructureModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
