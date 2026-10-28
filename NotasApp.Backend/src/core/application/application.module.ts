import { Module } from "@nestjs/common";
import { StoreUserUseCase, AuthenticateUserUseCase } from "./use-cases";

@Module({
    providers: [AuthenticateUserUseCase, StoreUserUseCase],
    exports: [AuthenticateUserUseCase, StoreUserUseCase],
})
export class ApplicationModule { }
