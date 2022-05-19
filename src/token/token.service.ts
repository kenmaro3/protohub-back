import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Token} from "./token.entity";
import {Repository} from "typeorm";
import {User} from "../user/user.entity";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Injectable()
export class TokenService{
    constructor(@InjectRepository(Token) private tokenRepository: Repository<Token>,
                private jwtService: JwtService,
                private userService: UserService) {
    }

     generateTokens(user: User){
        const payload = {id: user.id, user_name: user.user_name, email: user.email}
        const access_token =  this.jwtService.sign(payload, {expiresIn: '10m', secret: process.env.ACCESS_SECRET})
        const refresh_token = this.jwtService.sign(payload, {expiresIn: '30d', secret: process.env.REFRESH_SECRET})
        return{
            access_token,
            refresh_token
        }
    }

    async saveToken(user_id: number, refresh_token: string){
        const userWithToken = await this.userService.getById(user_id)
        const tokenData = await this.tokenRepository.findOne({user: userWithToken})
        if(tokenData){
            tokenData.refresh_token = refresh_token;
            return this.tokenRepository.save(tokenData)
        }
        const token = new Token()
        token.user = userWithToken;
        token.refresh_token = refresh_token
        await this.tokenRepository.save(token)
        return token
    }

    async removeToken(refresh_token: string){
        await this.tokenRepository.delete({refresh_token: refresh_token})
    }


    validaterefresh_token(token: string){
        try{
            return this.jwtService.verify(token, {secret: process.env.REFRESH_SECRET})
        }catch(e){
            throw new HttpException('Token is invalid!!!', HttpStatus.UNAUTHORIZED)
        }
    }

    async findToken(refresh_token: string){
        return await this.tokenRepository.findOne({refresh_token: refresh_token}, {relations: ['user']})
    }
}