import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Post} from "../post/post.entity";

// export enum TimeCost{
//     EXTREMELY_LOW= 'extremely_low',
//     LOW = 'low',
//     MEDIUM = 'medium',
//     HIGH = 'high',
//     EXTREMELY_HIGH = 'extremely_high',
// }


@Entity({name: 'comments'})
export class Comment{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    date_and_time_published: Date;

    @Column({nullable: true})
    reproducibility: boolean;

    @Column({nullable: true})
    time_cost: string;

    @ManyToOne(() => User, (user) => user.comments, {eager: true, onDelete:'CASCADE'})
    user: number

    @ManyToOne(() => Post, (post) => post.comments, {onDelete:'CASCADE'})
    post: number
}