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
import {PostService} from "./post.service";
import {PostDto} from "./dto/post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {AuthGuard} from "../authorization/auth.guard";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import { ForkPostDto } from "./dto/fork.dto";

@Controller('posts')
export class PostController{
    constructor(private postService: PostService) {
    }

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))
    create(@UploadedFiles() files ,@Body() postDto: PostDto){
        console.log("controller", postDto)
        return this.postService.createPost(postDto, files)
    }

    @UsePipes(ValidationPipe)
    @Post('/fork')
    fork(@Body() forkData: ForkPostDto){
        console.log("controller", forkData)
        return this.postService.createFork(forkData)
    }

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/update')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1}
    ]))
    update(@UploadedFiles() files ,@Body() updatePostDto: UpdatePostDto){
        return this.postService.updatePost(updatePostDto, files)
    }

    @Get('/post/:post_id')
    getPostById(@Param('post_id', new ParseIntPipe()) post_id: number){
        return this.postService.getPostById(post_id)
    }

    @Get('/parent/:post_id')
    getParentById(@Param('post_id', new ParseIntPipe()) post_id: number){
        return this.postService.getParentById(post_id)
    }

    @Get('/parenttree/:post_id')
    getParentTreeById(@Param('post_id', new ParseIntPipe()) post_id: number){
        return this.postService.getParentTreeById(post_id)
    }

    @Get('/childtree/:post_id')
    getChildTreeById(@Param('post_id', new ParseIntPipe()) post_id: number){
        return this.postService.getChildTreeById(post_id)
    }

    @Get('/keyword/:keyword')
    getPostByKeyword(@Param('keyword') keyword: string){
        return this.postService.getPostByKeyword(keyword)
    }

    @Delete('/post/:post_id')
    deletePostById(@Param('post_id', new ParseIntPipe()) post_id: number){
        return this.postService.deletePostById(post_id)
    }

    @Get()
    getAllPosts(){
        return this.postService.getAllPosts()
    }

    @Get('/today?')
    getTodayPosts(@Query('quantity') quantity: number){
        return this.postService.getTodayPosts(quantity)
    }

}