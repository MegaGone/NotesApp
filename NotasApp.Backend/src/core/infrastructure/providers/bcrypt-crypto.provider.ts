import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ICryptoProvider } from "../../domain/providers/crypto.provider";
import { IGlobalConfiguration } from "../../../shared/configuration/global.configuration";

@Injectable()
export class BcryptCryptoProvider implements ICryptoProvider {
    private readonly _salt: number;

    constructor(private readonly _configService: ConfigService) {
        const { SALT } = this._configService.getOrThrow<IGlobalConfiguration>("GLOBAL");
        this._salt = SALT;
    }

    public cipher(input: string): Promise<string> {
        return bcrypt.hash(input, this._salt);
    }

    public compare(plain: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plain, hash);
    }
}
