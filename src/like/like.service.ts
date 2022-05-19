import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "../comment/commnet.entity";
import {Repository} from "typeorm";
import {Like} from "./like.entity";
import {LikeDto} from "./dto/like.dto";
import {PostService} from "../post/post.service";
import {UserService} from "../user/user.service";

@Injectable()
export class LikeService{
    constructor(@InjectRepository(Like) private likeRepository: Repository<Like>,
                private postService: PostService,
                private userService: UserService) {
    }

    async likePost(likeDto: LikeDto){
        const like = new Like()
        like.user = likeDto.user_id
        like.post = likeDto.post_id
        const newLike =  await this.likeRepository.save(like)
        return await this.likeRepository.findOne(newLike.id)
    }

    async deleteLikeById(like_id: number){
        const result = await this.likeRepository.delete(like_id);
        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }
}