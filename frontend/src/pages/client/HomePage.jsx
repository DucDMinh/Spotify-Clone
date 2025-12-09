import { useState, useEffect } from 'react'
import axios from 'axios'
import useMusicStore from '../../stores/useMusicStore.js'
import '../../App.css'

const HomePage = () => {
    const [songs, setSongs] = useState([])
    const { playSong, currentSong } = useMusicStore()
    const [errorMsg, setErrorMsg] = useState(null) // Thêm state lỗi

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                // Thử gọi API
                const response = await axios.get('/api/songs')
                if (response.data.data && Array.isArray(response.data.data)) {
                    setSongs(response.data.data);
                }
                else if (Array.isArray(response.data)) {
                    setSongs(response.data);
                }
                else {
                    setSongs([]);
                }

            } catch (err) {
                console.error(err)
                // Hiển thị lỗi ra màn hình
                setErrorMsg(err.message + (err.response ? " - " + err.response.status : ""))
            }
        }
        fetchSongs()
    }, [])

    return (
        <div>
            <h2>🎵 Khám phá</h2>

            {/* Hiển thị lỗi nếu có */}
            {errorMsg && (
                <div style={{ color: 'red', border: '1px solid red', padding: '10px', margin: '10px 0' }}>
                    ⚠️ LỖI: {errorMsg} <br />
                    (Hãy kiểm tra xem Server Backend đã bật chưa?)
                </div>
            )}

            <div className="song-list">
                {songs.map((song) => (
                    <div
                        key={song._id}
                        className={`song-card ${currentSong?._id === song._id ? 'active-card' : ''}`}
                        onClick={() => playSong(song)}
                    >
                        <img src={song.coverImage} alt={song.title} className="cover-image" />
                        <div className="song-info">
                            <h3>{song.title}</h3>
                            <p>{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage