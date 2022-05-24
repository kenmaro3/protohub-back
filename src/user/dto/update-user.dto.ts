import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UpdateUserDto{

    @IsNotEmpty()
    readonly user_id: number;

    @IsString()
    @IsNotEmpty()
    readonly user_name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly github: string;

    @IsString()
    readonly twitter: string;

    @IsString()
    readonly website: string;
}