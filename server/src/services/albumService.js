import Albums from "../models/Album.js"

const getAllAlbum = async () => {
    try {
        const album = await Albums.find({}).populate('songs', 'title');
        const result = album.map(album => ({
            ...album.toObject(),
            songs: album.songs.map(song => song.title),
        }));
        return result;
    } catch (error) {
        throw new Error("Có lỗi xảy ra khi lấy album");
    }
}

const allNewAlbum = async (data) => {
    try {
        const album = await Albums.create(data);
        return album;
    } catch (error) {
        throw new Error("Co loi xay ra khi them album");
    }
}

const deleteAlbum = async (albumId) => {
    try {
        const album = await Albums.findByIdAndDelete(albumId);
        return album;
    } catch (error) {
        throw new Error("Có lỗi khi xóa album");
    }
}

export { getAllAlbum, deleteAlbum, allNewAlbum }