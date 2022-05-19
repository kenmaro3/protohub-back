import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "./commnet.entity";
import {Repository} from "typeorm";
import {CommentDto} from "./dto/comment.dto";
import {UserService} from "../user/user.service";
import {PostService} from "../post/post.service";
// import { TimeCost } from "./commnet.entity";

@Injectable()
export class CommentService{
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {
    }

    async createComment(commentDto: CommentDto): Promise<Comment>{
        const comment = new Comment();
        comment.text = commentDto.text
        comment.user = commentDto.user_id
        comment.post = commentDto.post_id
        comment.date_and_time_published = new Date()
        if(commentDto.reproducibility != "null"){
            comment.reproducibility = Boolean(commentDto.reproducibility)
        }
        if(commentDto.time_cost != "null"){
            comment.time_cost = commentDto.time_cost
        }
        const newComment = await this.commentRepository.save(comment)
        return this.commentRepository.findOne({id: newComment.id},{
            relations: ['user', 'post']
        })
    }

    async deleteById(comment_id: number): Promise<void>{
        const result = await this.commentRepository.delete(comment_id);

        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }
}