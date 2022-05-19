import {IsInt, IsNumber, IsString, Length, MaxLength, MinLength, IsNotEmpty} from "class-validator";

export class DraftDto{

    @MinLength(10, {message: 'Minimum length of title must be 10'})
    @IsString({message: 'Title must be string'})
    readonly title: string;

    @MaxLength(200, {message: 'Maximum length of description must be 200'})
    @IsString({message: 'Description must be string'})
    readonly description: string;

    @MinLength(15, {message: 'Minimum length of text must be 15'})
    @IsString({message: 'Text must be string'})
    readonly text: string;


    @IsNotEmpty()
    readonly user_id: number;
}

