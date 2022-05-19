import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Draft } from "./draft.entity";
import { Repository } from "typeorm";
import { Like as LIKE } from "typeorm";
import { DraftDto } from "./dto/draft.dto";
import { UpdateDraftDto } from "./dto/update-draft.dto";

@Injectable()
export class DraftService {
    constructor(@InjectRepository(Draft) private draftRepository: Repository<Draft>) {
    }

    async createDraft(draftDto: DraftDto): Promise<Draft> {
        //throw new HttpException('Image not provided', HttpStatus.BAD_REQUEST)
        const draft = new Draft()
        draft.title = draftDto.title
        draft.text = draftDto.text
        draft.user = Number(draftDto.user_id)
        draft.date_and_time_published = new Date();
        draft.description = draftDto.description
        await this.draftRepository.save(draft)
        return this.getDraftById(draft.id)
    }

    async updateDraft(updateDraftDto: UpdateDraftDto): Promise<Draft> {
            //throw new HttpException('Image not provided', HttpStatus.BAD_REQUEST)
            const title = updateDraftDto.title
            const text = updateDraftDto.text
            const user = Number(updateDraftDto.user_id)
            const date_and_time_edited = new Date();
            const description = updateDraftDto.description
            await this.draftRepository.update(updateDraftDto.draft_id, { title, description, text, date_and_time_edited, user })
            return this.getDraftById(updateDraftDto.draft_id)
    }

    async getAllDrafts(): Promise<Draft[]> {
        return await this.draftRepository.find({
        })
    }

    async getMyDrafts(user_id: number): Promise<Draft[]> {
        return await this.draftRepository.find({
            user: user_id
        })
    }

    async getDraftById(draft_id: number): Promise<Draft> {
        const draft = await this.draftRepository.findOne(draft_id, {
        })
        if (draft) {
            return draft
        } else {
            throw new HttpException('Draft not found', HttpStatus.NOT_FOUND)
        }
    }

    async getDraftByKeyword(keyword: string): Promise<Draft[]> {
        const loadedDrafts = await this.draftRepository.find({
            title: LIKE(`%${keyword}%`)
        });
        return loadedDrafts
    }


    async deleteDraftById(draft_id: number): Promise<void> {
        const result = await this.draftRepository.delete(draft_id);

        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }

    async getTodayDrafts(quantity: number) {
        return this.draftRepository.find({
            order: { date_and_time_published: 'DESC' },
            take: quantity
        })
    }
}