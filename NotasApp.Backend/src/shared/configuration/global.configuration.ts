import { registerAs } from "@nestjs/config";
import { ScalarTheme } from "../documentation/scalar.configuration";

export interface IGlobalConfiguration {
    PORT: number;
    SALT: number;
    JWT_SECRET: string;
    API_VERSION: string;
    DEBUG_MODE: boolean;
    SCALAR_THEME: ScalarTheme;
    JWT_ACCESS_EXPIRATION: string;
    JWT_REFRESH_EXPIRATION: string;
}

export default registerAs<IGlobalConfiguration>("GLOBAL", () => ({
    SALT: +process.env.SALT || 10,
    PORT: +process.env.PORT || 3000,
    DEBUG_MODE: process.env.DEBUG_MODE === "1",
    API_VERSION: process.env.API_VERSION || "v1",
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "15m",
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "7d",
    SCALAR_THEME: (process.env.SCALAR_THEME as ScalarTheme) || "deepSpace",
    JWT_SECRET: process.env.JWT_SECRET || "change-me-to-a-long-random-secret",
}));
