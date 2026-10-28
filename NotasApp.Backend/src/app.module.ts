import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import global from "./shared/configuration/global.configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [global],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
