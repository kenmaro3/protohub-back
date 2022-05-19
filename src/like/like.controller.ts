import {
    Body,
    Controller,
    Get,
    Delete,
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
import {LikeService} from "./like.service";
import {LikeDto} from "./dto/like.dto";
import {AuthGuard} from "../authorization/auth.guard";

@Controller('likes')
export class LikeController{
    constructor(private likeService: LikeService) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async likePost(@Body() likeDto: LikeDto){
        return await this.likeService.likePost(likeDto)
    }

    @Delete('/like/:like_id')
    deleteLikeById(@Param('like_id', new ParseIntPipe()) post_id: number){
        return this.likeService.deleteLikeById(post_id)
    }
}