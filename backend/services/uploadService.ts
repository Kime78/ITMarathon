import { UploadRepository } from "../repositories/uploadRepository";

export class UploadService {
    constructor(private readonly repo: UploadRepository) {}

    upload(filePath: string, bucket: string) {
        return this.repo.upload(filePath, bucket)
    }
}