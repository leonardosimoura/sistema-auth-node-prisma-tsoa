import { PrismaClient, } from '@prisma/client'
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Request,
    Security,
    Tags,
} from "tsoa";
import { CreateUserViewModel, LoginViewModel } from '../viewModels/user.viewmodel';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../authentication';



@Route("user")
@Tags("User")
export class UsersController extends Controller {

    private prisma: PrismaClient;
    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    @Security("jwt")
    @Get("info")
    public async getUserInfo(@Request() request: any): Promise<any> {
        return request.user;
    }

    @SuccessResponse("201")
    @Post()
    public async createUser(
        @Body() requestBody: CreateUserViewModel
    ): Promise<void> {
        this.setStatus(201);
        await this.prisma.user.create(
            {
                data: {
                    ...requestBody
                }
            }
        )
        return;
    }

    @SuccessResponse("200")
    @Post("authenticate")
    public async authenticate(
        @Body() requestBody: LoginViewModel
    ): Promise<string> {

        const users = await this.prisma.user.findMany(
            {
                where: {
                    email: { equals: requestBody.email },
                    senha: { equals: requestBody.senha },
                },
                take: 1
            }
        );

        if (users != null && users.length > 0) {
            this.setStatus(200);
            const user = users[0];

            var token = jwt.sign({
                id: user.id,
                nome: user.nome,
                apelido: user.apelido,
                email: user.email,
                scopes: ["user"]
            }, jwtSecret, {
                algorithm: 'HS256',
                expiresIn: 36000,
                audience: "http://sistema-auth.com.br",
                issuer: "http://sistema-auth.com.br",
            });

            return token;
        }
        else {
            this.setStatus(404);
            return '';
        }
    }
}