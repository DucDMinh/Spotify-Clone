import Song from "../models/Song.js";

const addNewSong = async (songData) => {
    try {
        const newSong = await Song.create(songData);
        return newSong;
    }
    catch (error) {
        throw new Error('Error adding new song: ' + error.message);
    }
}

const getAllSong = async () => {
    try {
        const songs = await Song.find({}); //chưa có artist, khi nào có thì thêm .populate('artist') để lấy ra tên ca sĩ
        return songs;
    } catch (error) {
        throw new Error('Error fetching songs: ' + error.message);
    }
}

const updateSong = async (songId, songData) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(songId, songData, { new: true });
        return updatedSong;
    } catch (error) {
        throw new Error('Error updating song: ' + error.message);
    }
}

const deleteSong = async (songId) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(songId);
        return deletedSong;
    } catch (error) {
        throw new Error('Error deleting song: ' + error.message);
    }
}

export { addNewSong, getAllSong, deleteSong, updateSong };