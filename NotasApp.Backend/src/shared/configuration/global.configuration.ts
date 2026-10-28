import { registerAs } from "@nestjs/config";
import { ScalarTheme } from "../documentation/scalar.configuration";

export interface IGlobalConfiguration {
    PORT: number;
    API_VERSION: string;
    DEBUG_MODE: boolean;
    SCALAR_THEME: ScalarTheme;
}

export default registerAs<IGlobalConfiguration>("GLOBAL", () => ({
    PORT: +process.env.PORT || 3000,
    DEBUG_MODE: process.env.DEBUG_MODE === "1",
    API_VERSION: process.env.API_VERSION || "v1",
    SCALAR_THEME: (process.env.SCALAR_THEME as ScalarTheme) || "deepSpace",
}));
