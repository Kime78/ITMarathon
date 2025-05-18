import { randomUUID } from "crypto";
import { createReadStream } from "fs";
import path from "path";
import { supabase } from "../../config/config";
import { UploadRepository } from "../uploadRepository";
import fs from 'fs'

export class SupabaseUploadRepository implements UploadRepository {
    async upload(filePath: string, bucket: string): Promise<string> {
        const fileBuffer = fs.readFileSync(filePath);
        const filename = `${randomUUID()}${path.extname(filePath)}`;
        const { error } = await supabase.storage
            .from(bucket)
            .upload(filename, fileBuffer);

        if (error) throw error;

        return supabase.storage.from(bucket).getPublicUrl(filename).data.publicUrl;
    }

}

