import Album from "../../models/Album.js";
import { deleteAlbum, getAllAlbum, allNewAlbum } from "../../services/albumService.js";
import sharp from 'sharp';

const GetAlbumForSelect = async (req, res) => {
    try {
        const albums = await Album.find().select('_id title');
        res.status(200).json({
            data: albums
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi lấy danh sách album: ' + error.message });
    }
}

const GetAllAlbum = async (req, res) => {
    try {
        const albums = await getAllAlbum();
        if (albums.length == 0) {
            return res.status(404).json({ message: "No Album found" });
        } return res.status(200).json({
            data: albums
        });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error });
    }
}

const AddNewAlbum = async (req, res) => {
    try {
        // 1. Lấy file từ request (Giả sử dùng upload.fields hoặc upload.array)
        const coverImage = req.files && req.files['coverImage'] ? req.files['coverImage'][0] : null;

        // SỬA: Dùng 'let' vì biến này sẽ thay đổi nếu upload thành công
        let coverImageUrl = "https://res.cloudinary.com/dnhm50qe9/image/upload/v1765042020/OIP_fdrjau.webp";

        // 2. Xử lý ảnh (Sharp + Upload Cloudinary)
        if (coverImage) {
            try {
                // SỬA: Dùng 'coverImage.buffer' thay vì 'avatarFile.buffer'
                const compressedBuffer = await sharp(coverImage.buffer)
                    .resize(500, 500, {
                        fit: 'cover',
                        position: 'center'
                    })
                    .toFormat('jpeg')
                    .jpeg({ quality: 80 })
                    .toBuffer();

                // Gửi buffer đã nén lên Cloudinary
                const coverImageResult = await uploadToCloudinary(compressedBuffer, 'spotify-clone/Album-CoverImage', 'image');
                coverImageUrl = coverImageResult.secure_url;

            } catch (uploadError) { // SỬA: Đặt tên biến lỗi là 'uploadError' để khớp với log bên dưới
                console.error("Lỗi upload ảnh:", uploadError);
                // Nếu lỗi upload, code sẽ tiếp tục chạy và dùng ảnh mặc định
            }
        }

        // 3. Xử lý dữ liệu Form-Data (Quan trọng)
        // Vì gửi qua form-data, các field array như 'songs' hay 'artist' sẽ là String.
        // Cần parse về Array JSON để Mongoose hiểu.
        let processedBody = { ...req.body };

        if (processedBody.songs && typeof processedBody.songs === 'string') {
            try { processedBody.songs = JSON.parse(processedBody.songs); } catch (e) { }
        }
        if (processedBody.artist && typeof processedBody.artist === 'string') {
            try { processedBody.artist = JSON.parse(processedBody.artist); } catch (e) { }
        }

        // 4. Gom dữ liệu để lưu
        const data = {
            ...processedBody,
            coverImage: coverImageUrl,
        };

        // 5. Gọi Service tạo Album
        const album = await allNewAlbum(data); // Đảm bảo hàm này trả về document album

        if (!album) {
            return res.status(400).json({ message: 'Album creation failed' });
        }

        // 6. Trả về kết quả
        return res.status(201).json({
            message: 'Album created successfully',
            data: album // SỬA: Trả về biến 'album', không phải 'user'
        });

    } catch (error) {
        console.error(error); // Log lỗi ra console server để dễ debug
        return res.status(500).json({ message: 'Error creating album: ' + error.message });
    }
}

const DeleteAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await deleteAlbum(albumId);
        if (album == null) {
            return res.status(404).json({ message: "Không tồn tại album" });
        }
        return res.status(200).json({
            message: `Da xoa album ${album.title}`
        })
    } catch (error) {
        res.status(500).json({ message: "Error: " + error });
    }
}
export { GetAlbumForSelect, GetAllAlbum, DeleteAlbum, AddNewAlbum }