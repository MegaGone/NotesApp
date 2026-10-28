import { registerAs } from "@nestjs/config";

export interface IGlobalConfiguration {
    PORT: number;
    API_VERSION: string;
    DEBUG_MODE: boolean;
    SCALAR_THEME: string;
}

export default registerAs<IGlobalConfiguration>("GLOBAL", () => ({
    PORT: +process.env.PORT || 3000,
    DEBUG_MODE: process.env.DEBUG_MODE === "1",
    API_VERSION: process.env.API_VERSION || "v1",
    SCALAR_THEME: process.env.SCALAR_THEME || "deepSpace",
}));
