import { supabase } from "../../config/config";
import { Message } from "../../models/message";
import { MessageRepository } from "../messageRepository";
import { SupabaseUploadRepository } from "./supabaseUploadRepository";

export class SupabaseMessageRepository implements MessageRepository {
  async save(message: Omit<Message, "id" | "createdAt">): Promise<Message> {
    const uploadService = new SupabaseUploadRepository();
    const imgUrl = await uploadService.upload(message.imageUrl, "pictures")
    console.log({
      sender_id: message.senderId,
      image_url: imgUrl,
    })
    console.log(`uploaded image: ${imgUrl}`)
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: message.senderId,
        imageUrl: imgUrl,
      })
      .select()
      .single();

    if (error) {
      console.log(error)
      throw error;
    }

    return {
      id: data.id,
      senderId: data.sender_id,
      imageUrl: data.image_url,
      createdAt: data.created_at
    };
  }

}