import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDto} from "./dto/user.dto";
import {AuthGuard} from "../authorization/auth.guard";

@Controller('users')
export class UserController{
    constructor(private userService: UserService) {
    }

    // @UseGuards(AuthGuard)
    // @UsePipes(ValidationPipe)
    // @Post()

    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Get('/user/:user_id')
    getById(@Param('user_id', new ParseIntPipe()) user_id: number){
        return this.userService.getById(user_id)
    }

    @Get('/keyword/:keyword')
    getByKeyword(@Param('keyword') keyword: string){
        return this.userService.getByKeyword(keyword)
    }


    @Get('/email?')
    getByEmail(@Query('email') email: string){
        return this.userService.getByEmail(email)
    }

}