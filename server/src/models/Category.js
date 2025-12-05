import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // VD: "Pop", "Indie", "Workout"
    value: { type: String, required: true, unique: true }, // VD: "pop", "workout" (slug)

    image: { type: String, required: true }, // URL ảnh đại diện cho Category
    color: { type: String, required: true }, // Màu nền (Hex) cho thẻ Card (VD: #E91429)

    description: { type: String }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;