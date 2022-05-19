import {IsInt, IsNumber, IsString, Length, MaxLength, MinLength, IsNotEmpty} from "class-validator";
import { ColumnDescription } from "sequelize/types";

export class ForkPostDto{

    @IsNotEmpty()
    readonly original_post_id: string;

    @IsNotEmpty()
    readonly original_user_id: string;

    @IsNotEmpty()
    readonly destination_user_id: string;

}