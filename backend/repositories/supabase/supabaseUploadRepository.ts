import { randomUUID } from "crypto";
import path from "path";
import { supabase } from "../../config/config"; // Ensure this path is correct for your project
import { UploadRepository } from "../uploadRepository";
import fs from 'fs';
import * as mime from 'mime-types'; // Import mime-types

export class SupabaseUploadRepository implements UploadRepository {
    /**
     * Uploads a file to a specified Supabase Storage bucket.
     * Automatically detects the MIME type of the file.
     *
     * @param filePath The local path to the file to be uploaded.
     * @param bucket The name of the Supabase Storage bucket.
     * @returns A promise that resolves with the public URL of the uploaded file.
     * @throws Will throw an error if the upload fails or if the MIME type cannot be determined.
     */
    async upload(filePath: string, bucket: string): Promise<string> {
        // Read the file into a buffer.
        // For very large files, consider using streams if Supabase client and your setup support it efficiently.
        // However, readFileSync is straightforward for many common use cases.
        const fileBuffer = fs.readFileSync(filePath);

        // Extract the file extension to help with MIME type detection and to form the new filename.
        const fileExtension = path.extname(filePath);
        if (!fileExtension) {
            // It's good practice to handle cases where the file might not have an extension,
            // though path.extname returns an empty string if no '.' is found.
            // Supabase might still require a filename with an extension for proper handling or content type inference on its side.
            console.warn(`File path ${filePath} has no extension. MIME type detection might be less accurate.`);
        }

        // Generate a unique filename to prevent overwrites in the bucket.
        const filename = `${randomUUID()}${fileExtension}`;

        // Detect the MIME type of the file based on its extension.
        // mime.lookup(filePath) uses the full path, which is generally more reliable.
        const contentType = mime.lookup(filePath);

        if (!contentType) {
            // Fallback or error if MIME type can't be determined.
            // Supabase defaults to 'text/plain;charset=UTF-8' if not specified.
            // You might want to throw an error or use a default like 'application/octet-stream'.
            console.warn(`Could not determine MIME type for ${filePath}. Uploading with Supabase default or 'application/octet-stream'.`);
            // Forcing a generic MIME type if detection fails:
            // throw new Error(`Could not determine MIME type for file: ${filePath}`);
        }

        // Perform the upload to Supabase Storage.
        // The third argument to upload() is an options object where we can set contentType.
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filename, fileBuffer, {
                contentType: contentType || 'application/octet-stream', // Use detected MIME type, or a default
                upsert: false, // Default is false, set to true if you want to overwrite if file exists
                // cacheControl: '3600' // Optional: set cache control headers
            });

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            throw uploadError; // Rethrow the error to be handled by the caller
        }

        // Retrieve the public URL of the uploaded file.
        const { data: publicUrlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(filename);

        if (!publicUrlData || !publicUrlData.publicUrl) {
            // This case should ideally not happen if upload was successful and filename is correct.
            throw new Error(`Failed to get public URL for ${filename} in bucket ${bucket}.`);
        }

        return publicUrlData.publicUrl;
    }
}
