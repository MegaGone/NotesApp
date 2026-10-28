import { Module } from "@nestjs/common";
import { StoreUserUseCase, AuthenticateUserUseCase } from "./use-cases";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";

@Module({
    imports: [InfrastructureModule],
    exports: [AuthenticateUserUseCase, StoreUserUseCase],
    providers: [AuthenticateUserUseCase, StoreUserUseCase],
})
export class ApplicationModule { }
