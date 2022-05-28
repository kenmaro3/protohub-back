import {
    Entity,
    Tree,
    Column,
    PrimaryGeneratedColumn,
    TreeChildren,
    TreeParent,
    TreeLevelColumn,
    ManyToOne,
    OneToMany
} from "typeorm"
import {User} from "../user/user.entity";
import {Comment} from "../comment/commnet.entity";
import {Like} from "../like/like.entity";

@Entity({name: 'posts'})
@Tree("materialized-path")
export class Post{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    description: string;

    @Column()
    text: string;

    @Column()
    date_and_time_published: Date

    @Column({nullable: true})
    date_and_time_edited: Date

    @OneToMany(() => Like, (like) => like.post)
    user_likes: Like[]

    @Column({nullable: true})
    post_image: string;

    @ManyToOne(() => User, (user) => user.posts, {eager: true, onDelete:'CASCADE'})
    user: number

    @OneToMany(() => Comment, (comment) => comment.post, {eager: true})
    comments: Comment[]

    @TreeChildren()
    children: Post[]

    @TreeParent()
    parent: Post


}