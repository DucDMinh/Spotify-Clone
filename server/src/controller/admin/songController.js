import { addNewSong, getAllSong, deleteSong, updateSong } from "../../services/songService.js";
import { uploadToCloudinary } from "../../services/uploadService.js"
import { parseBuffer } from 'music-metadata';

const CreateNewSong = async (req, res) => {
    try {
        const audioFile = req.files['audioFile'] ? req.files['audioFile'][0] : null;
        const coverImage = req.files['coverImage'] ? req.files['coverImage'][0] : null;

        if (!audioFile || !coverImage) {
            return res.status(400).json({ message: "Vui lòng upload đủ file nhạc và ảnh bìa" });
        }

        // TÍNH DURATION NGAY TẠI SERVER
        let duration = 0;
        try {
            // Đọc thông tin từ Buffer của file nhạc
            const metadata = await parseBuffer(audioFile.buffer, audioFile.mimetype);
            duration = metadata.format.duration; // Lấy thời lượng (giây)
        } catch (err) {
            console.error("Lỗi tính duration local:", err.message);
            // Nếu lỗi thì để = 0, hoặc chờ lấy từ Cloudinary 
        }

        // 1. Upload Audio
        // Vì đã có duration rồi, upload Cloudinary chỉ cần lấy URL thôi, không quan trọng duration nữa
        const audioPromise = uploadToCloudinary(audioFile.buffer, 'spotify-clone/songs', 'video');

        // 2. Upload Image
        const imagePromise = uploadToCloudinary(coverImage.buffer, 'spotify-clone/coverImage', 'image');

        // Chạy song song cả 2 để tiết kiệm thời gian
        const [audioResult, imageResult] = await Promise.all([audioPromise, imagePromise]);

        // 3. Chuẩn bị dữ liệu
        const songData = {
            ...req.body,
            audioFile: audioResult.secure_url,
            audioPublicId: audioResult.public_id,
            coverImage: imageResult.secure_url,
            // Ưu tiên lấy duration tính tại server, nếu lỗi thì lấy từ Cloudinary, không thì = 0
            duration: duration || audioResult.duration || 0
        };

        const result = await addNewSong(songData);

        res.status(201).json({
            message: 'Tạo bài hát thành công!',
            data: result
        });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi tạo bài hát: ' + error.message });
    }
}

const GetAllSong = async (req, res) => {
    try {
        const songs = await getAllSong();
        if (songs.length === 0) {
            return res.status(404).json({ message: 'No songs found' });
        }
        res.status(200).json({
            data: songs
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching songs: ' + error.message });
    }
}

const DeleteSong = async (req, res) => {
    try {
        const songId = req.params.id;
        await deleteSong(songId);
        res.status(200).json({
            message: 'Song deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting song: ' + error.message });
    }
}

const UpdateSong = async (req, res) => {
    try {
        const songId = req.params.id;
        const songData = req.body;
        const result = await updateSong(songId, songData);
        if (!result) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json({
            message: 'Song updated successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating song: ' + error.message });
    }
}

export { CreateNewSong, GetAllSong, DeleteSong, UpdateSong }