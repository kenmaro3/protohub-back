import {Injectable} from "@nestjs/common";
import {Repository, Like as LIKE} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {FileService} from "../file/file.service";


@Injectable()
export class UserService{
    constructor(@InjectRepository(User)private usersRepository: Repository<User>,
                private fileService: FileService) {
    }

    async createUser(userDto: CreateUserDto | User): Promise<User>{
        return await this.usersRepository.save(userDto)
    }

    async updateUser(updateUserDto: UpdateUserDto, file){
        let picturePath
        if('picture' in file){
            const {picture} = file
            picturePath = await this.fileService.createFile(picture[0])
        }
        const user_name = updateUserDto.user_name
        const email = updateUserDto.email
        const description = updateUserDto.description
        const github = updateUserDto.github
        const twitter = updateUserDto.twitter
        const website = updateUserDto.website
        if(picturePath){
            await this.usersRepository.update(updateUserDto.user_id, {user_name, email, description, profile_picture: picturePath, github, twitter, website})
        }else{
            await this.usersRepository.update(updateUserDto.user_id, {user_name, email, description, github, twitter, website})
        }

        return this.getById(updateUserDto.user_id)
    }

    async getAllUsers(){
        return await this.usersRepository.find({
            relations: ['posts', 'comments']
        });
    }

    async getById(user_id: number){
        return await this.usersRepository.findOne(user_id, {
            relations: ['posts']
        })
    }

    async getByKeyword(keyword: string){
        const loadedPosts = await this.usersRepository.find({
            user_name: LIKE(`%${keyword}%`)
        });
        return loadedPosts
    }

    async getByEmail(email: string){
        return await this.usersRepository.findOne({email: email}, {relations: ['posts']})
    }
}