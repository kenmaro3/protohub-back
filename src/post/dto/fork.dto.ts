import {IsInt, IsNumber, IsString, Length, MaxLength, MinLength, IsNotEmpty} from "class-validator";
import { ColumnDescription } from "sequelize/types";

export class ForkPostDto{

    @IsNotEmpty()
    readonly original_post_id: string;

    @IsNotEmpty()
    readonly original_user_id: string;

    @IsNotEmpty()
    readonly destination_user_id: string;

    @MinLength(10, {message: 'Minimum length of title must be 10'})
    @IsString({message: 'Title must be string'})
    readonly title: string;

    @MaxLength(200, {message: 'Maximum length of description must be 200'})
    readonly description: string;

}