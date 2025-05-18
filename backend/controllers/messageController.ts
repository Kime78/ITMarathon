import { MessageService } from "../services/messageService";
import { Request, Response } from "express";
import formidable from "formidable";
import fs from 'fs';
import { io } from "../app";

export class MessageController {
    constructor(private service: MessageService) { }

    save = async (req: Request, res: Response) => {
        try {
            // const { senderId, imageUrl } = req.body;
            const form = formidable({ uploadDir: './uploads', keepExtensions: true });
            form.parse(req, async (err, fields, files) => {
                if (!fs.existsSync("./uploads")) {
                    fs.mkdirSync("./uploads", { recursive: true });
                }

                if (err || !fields.senderId || !files.image || !fields.groupId) {
                    res.status(400).json({ error: `Invalid form data: ${err}` })
                    return;
                }


                const image = Array.isArray(files.image) ? files.image[0] : files.image;

                try {
                    const saved = await this.service.save(
                        {
                            senderId: fields.senderId![0],
                            imageUrl: image!.filepath
                        }
                    );
                    console.log(saved)
                    // io.to(fields.groupId![0]).emit("message:new", saved);
                    res.status(201).json(saved);
                    return;
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ error: `cuc googs ${error} \n\n ${fields} \n\n ${files}` });
                }
            })

        } catch (err: any) {
            res.status(500).json({ error: err.message })
        }
    }
}