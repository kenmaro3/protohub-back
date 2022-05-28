import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {TokenService} from "../token/token.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs'
import * as uuid from 'uuid'
import {LoginUserDto} from "../user/dto/login.user.dto";
import {User} from "../user/user.entity";

@Injectable()
export class SecurityService{
    constructor(private tokenService: TokenService,
                private userService: UserService) {
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getByEmail(userDto.email)
        if(candidate){
            console.log("registration if candidate")
            throw new HttpException(`User with email: ${userDto.email} already exists`, HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashedPassword})
        const tokens =  this.tokenService.generateTokens(user);
        await this.tokenService.saveToken(user.id, tokens.refresh_token)

        return{
            ...tokens,
            user
        }
    }

    async login(loginUserDto: LoginUserDto){
        const user = await this.userService.getByEmail(loginUserDto.email)
        if(!user){
            throw new HttpException(`User with email: ${loginUserDto.email} not found`, HttpStatus.NOT_FOUND)
        }
        const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password)
        if(!passwordMatch){
            throw new HttpException('Password is invalid', HttpStatus.UNAUTHORIZED)
        }
        const tokens =  this.tokenService.generateTokens(user);
        await this.tokenService.saveToken(user.id, tokens.refresh_token)
        return{
            ...tokens,
            user
        }
    }

    async logout(refresh_token: string){
        await this.tokenService.removeToken(refresh_token)
    }

    async refresh(refresh_token){
        if(!refresh_token){
            throw new HttpException('Token is not provided', HttpStatus.UNAUTHORIZED)
        }
        const userData = await this.tokenService.validaterefresh_token(refresh_token)
        const tokenFromDb = await this.tokenService.findToken(refresh_token)
        if(!userData || !tokenFromDb){
            throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED)
        }
        const user = await this.userService.getById(tokenFromDb.user.id)
        const tokens =  this.tokenService.generateTokens(user);
        await this.tokenService.saveToken(user.id, tokens.refresh_token)

        return{
            ...tokens,
            user
        }
    }

}