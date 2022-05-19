import {
    Body,
    Controller,
    Get,
    Delete,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {DraftService} from "./draft.service";
import {DraftDto} from "./dto/draft.dto";
import {UpdateDraftDto} from "./dto/update-draft.dto";
import {AuthGuard} from "../authorization/auth.guard";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('drafts')
export class DraftController{
    constructor(private draftService: DraftService) {
    }

    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/create')
    create(@Body() draftDto: DraftDto){
        console.log("controller", draftDto)
        return this.draftService.createDraft(draftDto)
    }


    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/update')
    update(@Body() updateDraftDto: UpdateDraftDto){
        return this.draftService.updateDraft(updateDraftDto)
    }

    @Get('/draft/:draft_id')
    getDraftById(@Param('draft_id', new ParseIntPipe()) draft_id: number){
        return this.draftService.getDraftById(draft_id)
    }

    @Get('/keyword/:keyword')
    getDraftByKeyword(@Param('keyword') keyword: string){
        return this.draftService.getDraftByKeyword(keyword)
    }

    @Delete('/draft/:draft_id')
    deleteDraftById(@Param('draft_id', new ParseIntPipe()) draft_id: number){
        return this.draftService.deleteDraftById(draft_id)
    }

    @Get()
    getAllDrafts(){
        return this.draftService.getAllDrafts()
    }

    @Get('/user/:user_id')
    getMyDrafts(@Param('user_id', new ParseIntPipe()) user_id: number){
        return this.draftService.getMyDrafts(user_id)
    }

    @Get('/today?')
    getTodayDrafts(@Query('quantity') quantity: number){
        return this.draftService.getTodayDrafts(quantity)
    }

}