import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "./schemas/user.schema";
import { NoteSchema } from "./schemas/note.schema";
import { UserRepository } from "./repositories/user.repository";
import { JwtTokenProvider } from "./providers/jwt-token.provider";
import { ITokenProvider } from "../domain/providers/token.provider";
import { ICryptoProvider } from "../domain/providers/crypto.provider";
import { IUserRepository } from "../domain/repositories/user.repository";
import { BcryptCryptoProvider } from "./providers/bcrypt-crypto.provider";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSchema, NoteSchema]),
        JwtModule.register({}),
    ],
    providers: [
        { provide: IUserRepository, useClass: UserRepository },
        { provide: ITokenProvider, useClass: JwtTokenProvider },
        { provide: ICryptoProvider, useClass: BcryptCryptoProvider },
    ],
    exports: [IUserRepository, ICryptoProvider, ITokenProvider],
})
export class InfrastructureModule { }
