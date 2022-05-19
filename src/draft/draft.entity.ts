import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
} from "typeorm"

import {User} from "../user/user.entity";

@Entity({name: 'drafts'})
export class Draft{
    
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

    @Column({nullable: true})
    draft_image: string;

    @ManyToOne(() => User, (user) => user.drafts, {eager: true})
    user: number

}