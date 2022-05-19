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
import {CommentService} from "./comment.service";
import {CommentDto} from "./dto/comment.dto";
import {AuthGuard} from "../authorization/auth.guard";

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentController{
    constructor(private commentService: CommentService) {
    }

    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() commentDto: CommentDto){
        return this.commentService.createComment(commentDto)
    }

    @Delete('/comment/:comment_id')
    deleteCommentById(@Param('comment_id', new ParseIntPipe()) post_id: number){
        return this.commentService.deleteById(post_id)
    }

}