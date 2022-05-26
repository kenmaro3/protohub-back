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
import { UpdateCommentDto } from "./dto/update-comment.dto";
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
    @UsePipes(ValidationPipe)
    @Post('/update')
    update(@Body() updateCommentDto: UpdateCommentDto){
        return this.commentService.updateComment(updateCommentDto)
    }

    @Delete('/comment/:comment_id')
    deleteCommentById(@Param('comment_id', new ParseIntPipe()) post_id: number){
        return this.commentService.deleteById(post_id)
    }

}