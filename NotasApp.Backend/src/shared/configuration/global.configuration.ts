import { registerAs } from "@nestjs/config";

export interface IGlobalConfiguration {
    PORT: number;
    API_VERSION: string;
}

export default registerAs<IGlobalConfiguration>("GLOBAL", () => ({
    PORT: +process.env.PORT || 3000,
    API_VERSION: process.env.API_VERSION || "v1",
}));