import { UserEntity } from "../entities/user.entity";

export type ITokenProviderResponse = {
    accessToken: string;
    refreshToken: string;
}

export abstract class ITokenProvider {
    public abstract generate(user: Partial<UserEntity>): Promise<ITokenProviderResponse>
}