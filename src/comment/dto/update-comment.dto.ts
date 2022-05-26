import {IsNotEmpty, IsNumber, IsString, MaxLength, MinLength} from "class-validator";

export class UpdateCommentDto{

    @IsString()
    @MinLength(7, {message: 'Minimum length of comment must be 7'})
    readonly text: string;

    @IsNotEmpty()
    @IsNumber()
    readonly post_id: number;

    @IsNotEmpty()
    @IsNumber()
    readonly user_id: number;

    readonly reproducibility: string;
    readonly time_cost: string;

    @IsNotEmpty()
    @IsNumber()
    readonly comment_id: number;
}