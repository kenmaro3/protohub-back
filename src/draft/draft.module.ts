import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Draft} from "./draft.entity";
import {UserModule} from "../user/user.module";
import {DraftService} from "./draft.service";
import {DraftController} from "./draft.controller";
import {AuthorizationModule} from "../authorization/authorization.module";
import {FileService} from "../file/file.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Draft]),
        UserModule,
        AuthorizationModule
    ],
    providers: [DraftService, FileService],
    controllers: [DraftController],
    exports: [DraftService]
})
export class DraftModule {}
