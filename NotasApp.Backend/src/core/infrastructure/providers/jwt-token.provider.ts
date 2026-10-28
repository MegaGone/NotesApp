import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { UserEntity } from "../../domain/entities/user.entity";
import { IGlobalConfiguration } from "../../../shared/configuration/global.configuration";
import { ITokenProvider, ITokenProviderResponse } from "../../domain/providers/token.provider";

@Injectable()
export class JwtTokenProvider implements ITokenProvider {
    private readonly _config: IGlobalConfiguration;

    constructor(
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService,
    ) {
        this._config = this._configService.getOrThrow<IGlobalConfiguration>("GLOBAL");
    }

    public async generate(user: Partial<UserEntity>): Promise<ITokenProviderResponse> {
        const payload = { sub: user.id };

        const accessToken = await this._jwtService.signAsync(payload, {
            secret: this._config.JWT_SECRET,
            expiresIn: this._config.JWT_ACCESS_EXPIRATION,
        } as JwtSignOptions);

        const refreshToken = await this._jwtService.signAsync(payload, {
            secret: this._config.JWT_SECRET,
            expiresIn: this._config.JWT_REFRESH_EXPIRATION,
        } as JwtSignOptions);

        return { accessToken, refreshToken };
    }
}
