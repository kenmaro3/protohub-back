import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserService} from "./user.service";
import {FileModule} from "../file/file.module";
import {FileService} from "../file/file.service";
import { UserController } from './user.controller';
import {AuthorizationModule} from "../authorization/authorization.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        FileModule,
        UserModule,
        AuthorizationModule
    ],
    providers: [UserService, FileService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
