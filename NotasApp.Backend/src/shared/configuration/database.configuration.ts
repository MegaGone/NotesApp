import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs("DATABASE", (): TypeOrmModuleOptions => ({
    entities: [],
    dropSchema: false,
    type: "better-sqlite3",
    autoLoadEntities: false,
    logging: process.env.SQL_LOGGING === "1",
    synchronize: process.env.SQL_SYNCHRONIZE === "1",
    database: process.env.SQL_DATABASE || "notas.sqlite",
}));
