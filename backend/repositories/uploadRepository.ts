export interface UploadRepository {
    upload(filePath: string, bucket: string): Promise<string>
}