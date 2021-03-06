import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../post/post.entity";
import {Comment} from "../comment/commnet.entity";
import {Like} from "../like/like.entity";
import { Draft } from "../draft/draft.entity";


export enum UserRole{
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager'
}

@Entity({name: 'users'})
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column({unique: true})
    email: string

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    github: string

    @Column({nullable: true})
    twitter: string

    @Column({nullable: true})
    website: string

    @Column()
    password: string;

    @Column({default: 'https://firebasestorage.googleapis.com/v0/b/post-images-storage.appspot.com/o/%2Fposts%2Fsquare_avatar.png?alt=media&token=1bf5a1c9-9691-45dc-bd26-b2d1753f7c53'})
    profile_picture: string;

    @Column({type: "enum", enum: UserRole, default: UserRole.USER})
    role: UserRole

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]

    @OneToMany(() => Like, (like) => like.user)
    liked_posts: Like[]

    @OneToMany(() => Draft, (draft) => draft.user)
    drafts: Draft[]

}