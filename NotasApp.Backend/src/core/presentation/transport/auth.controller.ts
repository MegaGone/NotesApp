import { LoginDto } from "./dto/login.dto";
import { AuthenticateUserUseCase } from "../../application/use-cases";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { AuthenticateUserResponseDto } from "../../application/use-cases/authenticate-user-use-case/authenticate-user.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly _authenticateUserUseCase: AuthenticateUserUseCase,
    ) { }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Authenticate a user and issue access/refresh tokens" })
    @ApiOkResponse({
        description: "Authentication successful.",
        schema: {
            properties: {
                accessToken: { type: "string" },
                refreshToken: { type: "string" },
            },
        },
    })
    @ApiBadRequestResponse({ description: "Validation failed (malformed email or empty password)." })
    @ApiUnprocessableEntityResponse({ description: "Invalid credentials or inactive user." })
    public login(@Body() { email, password }: LoginDto): Promise<AuthenticateUserResponseDto> {
        return this._authenticateUserUseCase.execute({ email, password });
    }
}
