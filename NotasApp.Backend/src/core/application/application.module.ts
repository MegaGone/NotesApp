import { Module } from "@nestjs/common";
import { SeedService } from "../infrastructure/services/seed.service";
import { StoreUserUseCase, AuthenticateUserUseCase } from "./use-cases";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";

@Module({
    imports: [InfrastructureModule],
    exports: [AuthenticateUserUseCase, StoreUserUseCase],
    providers: [AuthenticateUserUseCase, StoreUserUseCase, SeedService],
})
export class ApplicationModule { }
