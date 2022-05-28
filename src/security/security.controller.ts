import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Post, Put,
    Req,
    Res, UploadedFiles, UseGuards, UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {SecurityService} from "./security.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import {LoginUserDto} from "../user/dto/login.user.dto";
import {UpdateUserDto} from "../user/dto/update-user.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {UserService} from "../user/user.service";
import { AuthGuard } from "../authorization/auth.guard";

@Controller('auth')
export class SecurityController{
    constructor(private securityService: SecurityService,
                private userService: UserService) {
    }

    @UsePipes(ValidationPipe)
    @Post('/register')
    async register(@Body() userDto: CreateUserDto, @Res() res){
        const userData = await this.securityService.registration(userDto)
        res.cookie('refresh_token', userData.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData)
    }

    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res){
        const userData = await this.securityService.login(loginUserDto)
        res.cookie('refresh_token', userData.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData)
    }

    @UseGuards(AuthGuard)
    @Delete('/logout')
    async logout(@Req() req, @Res() res){
        const {refresh_token} = req.cookies
        if(!refresh_token){
            throw new HttpException('Logged out', HttpStatus.BAD_REQUEST)
        }
        await this.securityService.logout(refresh_token)
        res.clearCookie('refresh_token')
        res.sendStatus(HttpStatus.OK)
    }


    @Get('/refresh')
    async refresh(@Req() req, @Res() res){
        const {refresh_token} = req.cookies
        const userData = await this.securityService.refresh(refresh_token)
        res.cookie('refresh_token', userData.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.json(userData)
    }



    @Put('/update')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))
    async updateUser(@UploadedFiles() files, @Body() user: UpdateUserDto){
        return this.userService.updateUser(user, files)
    }

}