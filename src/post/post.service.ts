import {HttpException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {Repository, TreeRepository} from "typeorm";
import {Like as LIKE} from "typeorm";
import {PostDto} from "./dto/post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {UserService} from "../user/user.service";
import {FileService} from "../file/file.service";
import {Like} from "../like/like.entity";
import { ForkPostDto } from "./dto/fork.dto";

@Injectable()
export class PostService{
    constructor(@InjectRepository(Post) private postRepository: TreeRepository<Post>,
                private usersService: UserService,
                private fileService: FileService) {
    }

    async createPost(postDto: PostDto, files): Promise<Post>{
        const {picture} = files
        if(!picture){
            //throw new HttpException('Image not provided', HttpStatus.BAD_REQUEST)
            const post = new Post()
            post.title = postDto.title
            post.text = postDto.text
            post.user = Number(postDto.user_id)
            post.date_and_time_published = new Date();
            post.description = postDto.description
            await this.postRepository.save(post)
            return this.getPostById(post.id)
        }
        else{
            const picturePath = await this.fileService.createFile(picture[0])
            const post = new Post()
            post.title = postDto.title
            post.text = postDto.text
            post.user = Number(postDto.user_id)
            post.post_image = picturePath
            post.date_and_time_published = new Date();
            post.description = postDto.description
            await this.postRepository.save(post)
            return this.getPostById(post.id)

        }
    }

    async createFork(forkDto: ForkPostDto): Promise<Post>{
        const post = new Post()

        console.log("forkDto", forkDto)

        const originalPost = await this.postRepository.findOne(Number(forkDto.original_post_id), {
        // const originalPost = await this.postRepository.findOne(10, {
            // relations: ['comments', 'user_likes']
        })
        if(originalPost){
            // return originalPost
            post.title = originalPost.title
            post.text = originalPost.text
            post.user = Number(forkDto.destination_user_id)
            post.date_and_time_published = new Date();
            post.parent = originalPost
            await this.postRepository.save(post)
            return post
        }else{
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
        }
    }

    async updatePost(updatePostDto: UpdatePostDto, files): Promise<Post>{
        const {picture} = files
        if(!picture){
            //throw new HttpException('Image not provided', HttpStatus.BAD_REQUEST)
            const title = updatePostDto.title
            const text = updatePostDto.text
            const user = Number(updatePostDto.user_id)
            const date_and_time_edited = new Date();
            const description = updatePostDto.description
            await this.postRepository.update(updatePostDto.post_id, {title, description, text, date_and_time_edited, user})
            return this.getPostById(updatePostDto.post_id)
        }
        else{
            const picturePath = await this.fileService.createFile(picture[0])
            const title = updatePostDto.title
            const text = updatePostDto.text
            const user = Number(updatePostDto.user_id)
            const date_and_time_edited = new Date();
            const post_image = picturePath
            const description = updatePostDto.description
            await this.postRepository.update(updatePostDto.post_id, {title, description, text, date_and_time_edited, user, post_image})
            return this.getPostById(updatePostDto.post_id)

        }
    }

    async getAllPosts(): Promise<Post[]>{
        return await this.postRepository.find({
            relations: ['comments', 'user_likes']
        })
    }

    async getPostById(post_id: number): Promise<Post>{
        const post = await this.postRepository.findOne(post_id, {
            relations: ['comments', 'user_likes']
        })
        if(post){
            return post
        }else{
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
        }
    }

    async getParentById(post_id: number): Promise<Post[]>{
        const post = await this.postRepository.findOne(post_id, {
            relations: ['comments', 'user_likes']
        })
        if(post){
            const parent = await this.postRepository.findAncestors(post)
            
            return parent
        }else{
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
        }
    }

    async getParentTreeById(post_id: number): Promise<Post>{
        const post = await this.postRepository.findOne(post_id, {
            relations: ['comments', 'user_likes', 'user']
        })
        if(post){
            const parent = await this.postRepository.findAncestorsTree(post)
            
            return parent
        }else{
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
        }
    }

    async getChildTreeById(post_id: number): Promise<Post>{
        const post = await this.postRepository.findOne(post_id, {
            relations: ['comments', 'user_likes', 'user']
        })
        if(post){
            const parent = await this.postRepository.findDescendantsTree(post)
            
            return parent
        }else{
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
        }
    }

    async getPostByKeyword(keyword: string): Promise<Post[]>{
        const loadedPosts = await this.postRepository.find({
            title: LIKE(`%${keyword}%`)
        });
        return loadedPosts
    }


    async deletePostById(post_id: number): Promise<void>{
        const result = await this.postRepository.delete(post_id);

        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }

    async getTodayPosts(quantity: number) {
        return this.postRepository.find({
            order: {date_and_time_published: 'DESC'},
            take: quantity
        })
    }
}