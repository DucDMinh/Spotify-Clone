import { addNewSong, getAllSong, deleteSong, updateSong } from "../../services/songService.js";

const CreateNewSong = async (req, res) => {
    try {
        // 1. Kiểm tra xem đã upload đủ file chưa
        const audioFile = req.files['audioFile'] ? req.files['audioFile'][0] : null;
        const coverImage = req.files['coverImage'] ? req.files['coverImage'][0] : null;

        if (!audioFile || !coverImage) {
            return res.status(400).json({ message: "Vui lòng upload cả file nhạc và ảnh bìa" });
        }

        // 2. Chuẩn bị dữ liệu để lưu vào DB
        // req.body chứa các trường text (title, artist, genre...)
        const songData = {
            ...req.body,
            audioFile: audioFile.path,  // Link nhạc từ Cloudinary
            coverImage: coverImage.path, // Link ảnh từ Cloudinary
            // Các trường khác như artist, album, duration...
        };

        // 3. Gọi Service tạo bài hát
        const result = await addNewSong(songData);

        res.status(201).json({
            message: 'New song added successfully',
            data: result
        });

    } catch (error) {
        res.status(500).json({ message: 'Error adding new song: ' + error.message });
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