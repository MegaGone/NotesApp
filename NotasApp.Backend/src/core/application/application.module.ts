import { Module } from "@nestjs/common";
import { SeedService } from "../infrastructure/services/seed.service";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";
import { StoreUserUseCase, AuthenticateUserUseCase, RefreshTokenUseCase, LogoutUseCase } from "./use-cases";

@Module({
    imports: [InfrastructureModule],
    exports: [AuthenticateUserUseCase, StoreUserUseCase, RefreshTokenUseCase, LogoutUseCase],
    providers: [AuthenticateUserUseCase, StoreUserUseCase, RefreshTokenUseCase, LogoutUseCase, SeedService],
})
export class ApplicationModule { }
