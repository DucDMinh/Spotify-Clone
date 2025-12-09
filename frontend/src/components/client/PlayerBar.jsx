import { useEffect, useRef } from 'react'
import useMusicStore from '../../stores/useMusicStore'
import "../../App.css"; // CSS chung

const PlayerBar = () => {
    // 1. Lấy dữ liệu từ Store
    const { currentSong, isPlaying, pauseSong, resumeSong } = useMusicStore()

    // 2. Tạo ref để điều khiển thẻ audio ẩn
    const audioRef = useRef(null)

    // 3. Xử lý khi bài hát thay đổi hoặc trạng thái play/pause thay đổi
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => console.log("Chặn autoplay:", error))
            } else {
                audioRef.current.pause()
            }
        }
    }, [isPlaying, currentSong]) // Chạy lại khi isPlaying hoặc currentSong đổi

    // Nếu chưa chọn bài nào thì không hiện thanh player
    if (!currentSong) return null;

    return (
        <div className="player-bar">
            {/* Thông tin bài hát bên trái */}
            <div className="player-left">
                <img src={currentSong.coverImage} alt="cover" className="player-cover" />
                <div className="player-info">
                    <h4>{currentSong.title}</h4>
                    <p>{currentSong.artist}</p>
                </div>
            </div>

            {/* Các nút điều khiển ở giữa */}
            <div className="player-center">
                <button
                    className="btn-control"
                    onClick={isPlaying ? pauseSong : resumeSong}
                >
                    {isPlaying ? '⏸️ Tạm dừng' : '▶️ Phát'}
                </button>
            </div>

            {/* Thẻ audio ẩn - Trái tim của player */}
            <audio
                ref={audioRef}
                src={currentSong.audioFile}
                onEnded={() => pauseSong()} // Hết bài thì tự chuyển nút về pause
            />
        </div>
    )
}

export default PlayerBar