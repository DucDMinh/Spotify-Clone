import { create } from 'zustand'

const useMusicStore = create((set) => ({
    // Trạng thái ban đầu
    currentSong: null, // Bài hát đang chọn
    isPlaying: false,  // Đang phát hay tạm dừng

    // Hành động (Functions)
    playSong: (song) => set({ currentSong: song, isPlaying: true }),
    pauseSong: () => set({ isPlaying: false }),
    resumeSong: () => set({ isPlaying: true }),
}))

export default useMusicStore