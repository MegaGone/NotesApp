import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./transport/auth.controller";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ApplicationModule } from "../application/application.module";

@Module({
    imports: [ApplicationModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [JwtAuthGuard],
})
export class PresentationModule { }
