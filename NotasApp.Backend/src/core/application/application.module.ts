import {
    LogoutUseCase,
    StoreUserUseCase,
    StoreNoteUseCase,
    DeleteNoteUseCase,
    RefreshTokenUseCase,
    AuthenticateUserUseCase,
    FindNotesPaginatedUseCase,
} from "./use-cases";
import { Module } from "@nestjs/common";
import { SeedService } from "../infrastructure/services/seed.service";
import { InfrastructureModule } from "../infrastructure/infrastructure.module";

@Module({
    imports: [InfrastructureModule],
    exports: [
        LogoutUseCase,
        StoreUserUseCase,
        StoreNoteUseCase,
        DeleteNoteUseCase,
        RefreshTokenUseCase,
        AuthenticateUserUseCase,
        FindNotesPaginatedUseCase,
    ],
    providers: [
        SeedService,
        LogoutUseCase,
        StoreUserUseCase,
        StoreNoteUseCase,
        DeleteNoteUseCase,
        RefreshTokenUseCase,
        AuthenticateUserUseCase,
        FindNotesPaginatedUseCase,
    ],
})
export class ApplicationModule { }
