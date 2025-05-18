import formidable from "formidable";
import { UploadService } from "../services/uploadService";
import { Request, Response } from "express";
import fs from 'fs'

export class UploadPhoto {
    constructor(private readonly service: UploadService) { }

    upload = async (req: Request, res: Response) => {
        try {
            const form = formidable({ uploadDir: './uploads', keepExtensions: true });
            form.parse(req, async (err, fields, files) => {
                if (!fs.existsSync("./uploads")) {
                    fs.mkdirSync("./uploads", { recursive: true });
                } const image = Array.isArray(files.image) ? files.image[0] : files.image;
                const url = await this.service.upload(image!.filepath, "pictures")
                res.status(201).json(url)
            }

            )
        }
        catch (err) {
            res.status(500).json({ error: err })
        }

    }
}