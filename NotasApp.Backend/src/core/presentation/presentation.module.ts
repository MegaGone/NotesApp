import { Module } from "@nestjs/common";
import { AuthController } from "./transport/auth.controller";
import { ApplicationModule } from "../application/application.module";

@Module({
    imports: [ApplicationModule],
    controllers: [AuthController],
})
export class PresentationModule { }
