import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Post} from "../post/post.entity";

@Entity({name: 'likes'})
export class Like{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.liked_posts, {eager: true, onDelete:'CASCADE'})
    user: number;

    @ManyToOne(() => Post, (post) => post.user_likes, {eager: true, onDelete:'CASCADE'})
    post: number;
}