import mongoose, { Schema, Document } from "mongoose";


interface IContent extends Document {
    text: string;
    embedding: number[]
}

const contentSchema:Schema = new Schema<IContent>(
    {
        text: {required: true, type: String},
        embedding: {required: true, type: [Number] },
    },
    {timestamps: true}
)

export const ContentSchema = mongoose.model<IContent>('Content', contentSchema);
