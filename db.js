/**
 * CƠ SỞ DỮ LIỆU PORTAL ÂM NHẠC TIỂU HỌC
 * Lưu trữ & Quản lý: Bài học, Bài hát, Video, Mini Game, Tin tức, Thông báo, Lịch học, Thống kê
 */

const STORAGE_KEYS = {
    SONGS: 'amnhac_songs',
    VIDEOS: 'amnhac_videos',
    GAMES: 'amnhac_games',
    LESSONS: 'amnhac_lessons',
    NEWS: 'amnhac_news',
    ANNOUNCEMENTS: 'amnhac_announcements',
    SCHEDULES: 'amnhac_schedules',
    STATS: 'amnhac_stats',
    USER: 'amnhac_user_session'
};

// Dữ liệu khởi tạo chuẩn
const INITIAL_DATA = {
    // 1. Bài học theo từng khối lớp (1-5)
    gradeLessons: [
        {
            grade: 1,
            title: "LỚP 1",
            themeColor: "#f59e0b", // Yellow/Amber
            bgGradient: "linear-gradient(135deg, #fffbeb, #fef3c7)",
            badgeBg: "#f59e0b",
            highlights: ["Học hát", "Nghe nhạc", "Gõ đệm"],
            lessons: [
                { id: "g1-1", title: "Tiết 1: Quê hương tươi đẹp - Học hát", desc: "Học bài hát Quê hương tươi đẹp dân ca Nùng." },
                { id: "g1-2", title: "Tiết 2: Tập gõ thanh phách theo nhịp 2/4", desc: "Luyện tập gõ phách đơn giản." },
                { id: "g1-3", title: "Tiết 3: Khám phá âm thanh cao - thấp", desc: "Lắng nghe và phân biệt tiếng trầm tiếng bổng." }
            ]
        },
        {
            grade: 2,
            title: "LỚP 2",
            themeColor: "#16a34a", // Green
            bgGradient: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
            badgeBg: "#16a34a",
            highlights: ["Học hát", "Nhạc cụ", "Tiết tấu"],
            lessons: [
                { id: "g2-1", title: "Tiết 1: Mùa xuân ơi - Học hát", desc: "Bài hát vui tươi chào đón mùa xuân." },
                { id: "g2-2", title: "Tiết 2: Nhạc cụ gõ Song loan & Tri-ăng", desc: "Luyện gõ nhạc cụ gõ dân tộc." },
                { id: "g2-3", title: "Tiết 3: Đọc nhạc nốt Sol - Mi", desc: "Nhận biết 2 nốt nhạc cơ bản trên bàn tay." }
            ]
        },
        {
            grade: 3,
            title: "LỚP 3",
            themeColor: "#0284c7", // Blue
            bgGradient: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
            badgeBg: "#0284c7",
            highlights: ["Tập đọc nhạc", "Nhạc cụ", "Thường thức âm nhạc"],
            lessons: [
                { id: "g3-1", title: "Tiết 1: Bài tập đọc nhạc số 1 (Đô - Rê - Mi - Sol)", desc: "Đọc đúng cao độ và độ dài nốt nhạc." },
                { id: "g3-2", title: "Tiết 2: Tìm hiểu về đàn Kèn Phím (Melodica)", desc: "Hướng dẫn bấm phím và thổi đúng hơi." },
                { id: "g3-3", title: "Tiết 3: Thường thức: Âm nhạc dân gian Việt Nam", desc: "Nghe các điệu hò, câu lý ba miền." }
            ]
        },
        {
            grade: 4,
            title: "LỚP 4",
            themeColor: "#9333ea", // Purple
            bgGradient: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
            badgeBg: "#9333ea",
            highlights: ["Ôn tập", "Đọc nhạc", "Cảm thụ âm nhạc"],
            lessons: [
                { id: "g4-1", title: "Tiết 1: Tập đọc nhạc số 3 - Nhịp 2/4", desc: "Luyện đọc nhạc kết hợp gõ tiết tấu phách mạnh phách nhẹ." },
                { id: "g4-2", title: "Tiết 2: Thổi sáo Recorder nốt B - A - G", desc: "Luyện ngón và hơi sáo recorder." },
                { id: "g4-3", title: "Tiết 3: Ôn tập bài hát Khèn vang mừng hội", desc: "Múa minh họa và biểu diễn nhóm." }
            ]
        },
        {
            grade: 5,
            title: "LỚP 5",
            themeColor: "#db2777", // Pink
            bgGradient: "linear-gradient(135deg, #fdf2f8, #fce7f3)",
            badgeBg: "#db2777",
            highlights: ["Biểu diễn", "Sáng tạo âm nhạc", "Nhạc cụ"],
            lessons: [
                { id: "g5-1", title: "Tiết 1: Đàn Piano/Ukulele đệm bài hát", desc: "Luyện tập hợp âm C - G - Am - F." },
                { id: "g5-2", title: "Tiết 2: Sáng tạo giai điệu 4 ô nhịp", desc: "Tự viết nốt nhạc theo ý thích." },
                { id: "g5-3", title: "Tiết 3: Hợp xướng học sinh toàn trường", desc: "Hát bè đơn giản 2 giọng." }
            ]
        }
    ],

    // 2. Bài hát nổi bật
    songs: [
        {
            id: "song-1",
            title: "Cả tuần đều ngoan",
            badge: "Karaoke",
            badgeColor: "#ec4899",
            duration: "02:45",
            grade: 1,
            author: "Phạm Tuyên",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
            audioNotes: ["C4", "E4", "G4", "A4", "G4", "E4", "C4"],
            lyrics: [
                "Thứ hai là ngày đầu tuần, bé hứa cố gắng chăm ngoan",
                "Thứ ba, thứ tư, thứ năm, ngày nào cũng luôn cố gắng",
                "Thứ sáu rồi đến thứ bảy, cô đưa bé về nhà ngoan",
                "Chủ nhật cả nhà đều vui, vì bé ngoan suốt tuần!"
            ]
        },
        {
            id: "song-2",
            title: "Em yêu mái trường",
            badge: "Beat",
            badgeColor: "#3b82f6",
            duration: "03:12",
            grade: 2,
            author: "Hoàng Vân",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
            audioNotes: ["G4", "A4", "C5", "C5", "A4", "G4", "E4"],
            lyrics: [
                "Em yêu mái trường mến yêu, có hàng cây mát xanh",
                "Có lời cô giảng hăng say, rộn ràng tiếng hát hay",
                "Trường em tươi đẹp biết bao, tuổi thơ ngập tràn ước mơ!",
                "Mai sau dù đi xa đâu, lòng em ghi nhớ công ơn."
            ]
        },
        {
            id: "song-3",
            title: "Đếm sao",
            badge: "Karaoke",
            badgeColor: "#ec4899",
            duration: "03:08",
            grade: 3,
            author: "Văn Chung",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80",
            audioNotes: ["C4", "D4", "E4", "G4", "E4", "D4", "C4"],
            lyrics: [
                "Một ông sao sáng, hai ông sáng sao...",
                "Ba ông sao sáng, sáng chiếu muôn nhà!",
                "Bốn ông sao sáng, năm ông sáng sao...",
                "Kìa trăng lấp lánh soi dòng sông xanh."
            ]
        },
        {
            id: "song-4",
            title: "Mẹ đi xa",
            badge: "Beat",
            badgeColor: "#3b82f6",
            duration: "02:58",
            grade: 4,
            author: "Trần Tiến",
            image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=400&q=80",
            audioNotes: ["E4", "G4", "A4", "B4", "A4", "G4", "E4"],
            lyrics: [
                "Mẹ đi xa về mang bao quà thơm ngon...",
                "Bé ngoan đợi mẹ nơi thềm cửa nhỏ...",
                "Nụ cười rạng rỡ ấm áp sưởi lòng con!"
            ]
        }
    ],

    // 3. Video bài giảng
    videos: [
        {
            id: "vid-1",
            title: "Học hát",
            subtitle: "Kỹ thuật khởi động giọng & lấy hơi",
            duration: "10:15",
            image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            id: "vid-2",
            title: "Đọc nhạc",
            subtitle: "Nhận biết 7 nốt nhạc & tập đọc cao độ",
            duration: "12:30",
            image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=400&q=80",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            id: "vid-3",
            title: "Recorder",
            subtitle: "Hướng dẫn thổi Sáo Recorder cho học sinh",
            duration: "08:45",
            image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=400&q=80",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            id: "vid-4",
            title: "Gõ đệm",
            subtitle: "Gõ tiết tấu bằng Thanh phách & Song loan",
            duration: "09:20",
            image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80",
            embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
    ],

    // 4. Trò chơi âm nhạc
    games: [
        {
            id: "game-1",
            title: "Ô cửa bí mật",
            icon: "fas fa-door-closed",
            bg: "linear-gradient(135deg, #a855f7, #6366f1)",
            desc: "Lật từng ô cửa, trả lời câu hỏi nhạc lý để khám phá bức tranh bí mật!",
            type: "doors"
        },
        {
            id: "game-2",
            title: "Đoán nốt nhạc",
            icon: "fas fa-music",
            bg: "linear-gradient(135deg, #06b6d4, #3b82f6)",
            desc: "Lắng nghe âm thanh Web Audio phát ra và đoán đúng tên nốt nhạc (Đô, Rê, Mi, Sol, La)!",
            type: "pitch_ear"
        },
        {
            id: "game-3",
            title: "Chiếc nón kỳ diệu",
            icon: "fas fa-dharmachakra",
            bg: "linear-gradient(135deg, #ec4899, #f43f5e)",
            desc: "Quay vòng quay âm nhạc nhận điểm thưởng và thử thách hát nhanh!",
            type: "wheel"
        },
        {
            id: "game-4",
            title: "Quizizz Âm nhạc",
            icon: "fas fa-gamepad",
            bg: "linear-gradient(135deg, #f59e0b, #ef4444)",
            desc: "Trắc nghiệm âm nhạc vui nhộn nhiều người chơi chọn đáp án đúng!",
            type: "quiz"
        }
    ],

    // 5. Tin tức - Hoạt động
    news: [
        {
            id: "news-1",
            title: "Hội diễn văn nghệ Chào mừng 20/11",
            date: "02/05/2024",
            image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80",
            summary: "Sôi nổi các tiết mục hát múa hợp xướng của học sinh các khối lớp chào mừng ngày Nhà giáo Việt Nam."
        },
        {
            id: "news-2",
            title: "Cuộc thi Giai điệu tuổi hồng",
            date: "28/04/2024",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
            summary: "Tuyên dương và trao giải cho các tài năng âm nhạc nhí xuất sắc nhất cấp trường năm học 2023 - 2024."
        },
        {
            id: "news-3",
            title: "CLB Âm nhạc Sinh hoạt tháng 5",
            date: "25/04/2024",
            image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=400&q=80",
            summary: "Buổi sinh hoạt chuyên đề: Trải nghiệm hòa tấu dàn nhạc gõ dân tộc dành cho học sinh yêu âm nhạc."
        },
        {
            id: "news-4",
            title: "Hoạt động trải nghiệm Tham quan bảo tàng",
            date: "20/04/2024",
            image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=400&q=80",
            summary: "Học sinh tham quan Bảo tàng Nhạc cụ Dân tộc và giao lưu cùng các nghệ sĩ ưu tú."
        }
    ],

    // 6. Thông báo (Right Sidebar)
    announcements: [
        { id: "anc-1", title: "Hội thi Giai điệu tuổi hồng cấp trường", date: "08/05/2024", icon: "fas fa-bullhorn" },
        { id: "anc-2", title: "Cập nhật bài hát mới tháng 05", date: "07/05/2024", icon: "fas fa-music" },
        { id: "anc-3", title: "Lịch kiểm tra học kỳ II môn Âm nhạc", date: "06/05/2024", icon: "fas fa-calendar-alt" },
        { id: "anc-4", title: "Hướng dẫn học âm nhạc trực tuyến", date: "05/05/2024", icon: "fas fa-desktop" },
        { id: "anc-5", title: "Câu lạc bộ Âm nhạc hoạt động trở lại", date: "04/05/2024", icon: "fas fa-users" }
    ],

    // 7. Lịch học tháng 5/2024
    schedules: {
        month: "Tháng 5 / 2024",
        highlightDay: 8,
        events: {
            "8": "Hội thi Giai điệu tuổi hồng & Kiểm tra thực hành hát",
            "15": "Thi học kỳ II môn Âm nhạc Khối 4 & 5",
            "20": "Sinh hoạt CLB Âm nhạc nhí",
            "28": "Tổng kết phát thưởng năm học"
        }
    },

    // 8. Bài học mới (Right Sidebar)
    newLessons: [
        { title: "Tiết 27: Học hát - Cả tuần đều ngoan", grade: "Lớp 1", badgeBg: "#f59e0b" },
        { title: "Tiết 26: Nhạc cụ thể hiện tiết tấu", grade: "Lớp 2", badgeBg: "#16a34a" },
        { title: "Tiết 25: Tập đọc nhạc số 5", grade: "Lớp 3", badgeBg: "#0284c7" },
        { title: "Tiết 24: Ôn tập thuộc kỳ II", grade: "Lớp 4", badgeBg: "#9333ea" },
        { title: "Tiết 23: Múa hát tập thể", grade: "Lớp 5", badgeBg: "#db2777" }
    ],

    // 9. Thống kê truy cập
    stats: {
        today: 1245,
        thisWeek: 12458,
        total: 256789
    }
};

// Lớp Quản Lý Database (DB Service)
class DatabaseService {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(STORAGE_KEYS.SONGS)) {
            localStorage.setItem(STORAGE_KEYS.SONGS, JSON.stringify(INITIAL_DATA.songs));
        }
        if (!localStorage.getItem(STORAGE_KEYS.STATS)) {
            localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(INITIAL_DATA.stats));
        }
        this.incrementVisitCount();
    }

    incrementVisitCount() {
        let stats = this.getStats();
        stats.today += 1;
        stats.thisWeek += 1;
        stats.total += 1;
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    }

    getGradeLessons() {
        return INITIAL_DATA.gradeLessons;
    }

    getSongs() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SONGS)) || INITIAL_DATA.songs;
    }

    getVideos() {
        return INITIAL_DATA.videos;
    }

    getGames() {
        return INITIAL_DATA.games;
    }

    getNews() {
        return INITIAL_DATA.news;
    }

    getAnnouncements() {
        return INITIAL_DATA.announcements;
    }

    getSchedules() {
        return INITIAL_DATA.schedules;
    }

    getNewLessons() {
        return INITIAL_DATA.newLessons;
    }

    getStats() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.STATS)) || INITIAL_DATA.stats;
    }
}

// Khởi tạo instance CSDL toàn cục
const db = new DatabaseService();

/**
 * Web Audio API Audio Synthesizer Engine
 * Giúp tạo âm thanh phím Piano / Nốt nhạc mượt mà không bị phụ thuộc file ngoài
 */
class WebAudioSynth {
    constructor() {
        this.ctx = null;
        this.noteFreqs = {
            'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
            'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25
        };
    }

    initCtx() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playNote(noteName = 'C4', duration = 0.8) {
        try {
            this.initCtx();
            const freq = this.noteFreqs[noteName] || 440;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            // Envelope (Attack - Decay - Release)
            gain.gain.setValueAtTime(0, this.ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.error("Audio Synth error:", e);
        }
    }

    playMelody(notesArray = ['C4', 'E4', 'G4'], interval = 400) {
        notesArray.forEach((note, index) => {
            setTimeout(() => {
                this.playNote(note, 0.6);
            }, index * interval);
        });
    }
}

const audioSynth = new WebAudioSynth();
