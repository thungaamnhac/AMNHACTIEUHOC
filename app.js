/**
 * APP CONTROLLER & INTERACTIVE UX LOGIC
 * Quản lý toàn bộ trải nghiệm người dùng, render dữ liệu & tương tác Web Audio API
 */

class AppController {
    constructor() {
        this.currentHeroIndex = 0;
        this.heroImages = [
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80"
        ];
        this.targetGameNote = 'C4';
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderGradeCards();
            this.renderSongs();
            this.renderVideos();
            this.renderGames();
            this.renderNews();
            this.renderAnnouncements();
            this.renderCalendar();
            this.renderNewLessons();
            this.renderStats();
            this.setupEventListeners();
            this.startHeroAutoSlide();
        });
    }

    // 1. RENDER BÀI HỌC THEO LỚP (5 CARDS ROW)
    renderGradeCards() {
        const container = document.getElementById('gradesContainer');
        if (!container) return;
        const grades = db.getGradeLessons();

        container.innerHTML = grades.map(g => `
            <div class="grade-card" style="background: ${g.bgGradient};">
                <div class="grade-header-banner" style="background-color: ${g.themeColor};">
                    <h3>${g.title}</h3>
                </div>
                <div class="grade-body">
                    <ul class="grade-highlights">
                        ${g.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                    <button class="btn-grade-view" style="background-color: ${g.badgeBg};" onclick="app.openGradeDetail(${g.grade})">
                        Xem ngay
                    </button>
                </div>
            </div>
        `).join('');
    }

    // 2. RENDER BÀI HẤT NỔI BẬT (4 CARDS)
    renderSongs() {
        const container = document.getElementById('songsContainer');
        if (!container) return;
        const songs = db.getSongs();

        container.innerHTML = songs.map(s => `
            <div class="song-card" onclick="app.openSongPlayer('${s.id}')">
                <div class="media-thumb">
                    <img src="${s.image}" alt="${s.title}">
                    <span class="duration-tag">${s.duration}</span>
                    <div class="play-overlay"><i class="fas fa-play-circle"></i></div>
                </div>
                <div class="media-info">
                    <div class="media-title">${s.title}</div>
                    <span class="badge-tag" style="background-color: ${s.badgeColor};">${s.badge}</span>
                </div>
            </div>
        `).join('');
    }

    // 3. RENDER VIDEO BÀI GIẢNG (4 CARDS)
    renderVideos() {
        const container = document.getElementById('videosContainer');
        if (!container) return;
        const videos = db.getVideos();

        container.innerHTML = videos.map(v => `
            <div class="video-card" onclick="app.openVideoModal('${v.id}')">
                <div class="media-thumb">
                    <img src="${v.image}" alt="${v.title}">
                    <span class="duration-tag">${v.duration}</span>
                    <div class="play-overlay"><i class="fas fa-play"></i></div>
                </div>
                <div class="media-info">
                    <div class="media-title">${v.title}</div>
                </div>
            </div>
        `).join('');
    }

    // 4. RENDER TRÒ CHƠI ÂM NHẠC (4 CARDS)
    renderGames() {
        const container = document.getElementById('gamesContainer');
        if (!container) return;
        const games = db.getGames();

        container.innerHTML = games.map(g => `
            <div class="game-item-card" onclick="app.launchGame('${g.type}')">
                <div class="game-icon-box" style="background: ${g.bg};">
                    <i class="${g.icon}"></i>
                </div>
                <div class="game-title">${g.title}</div>
            </div>
        `).join('');
    }

    // 5. RENDER TIN TỨC - HOẠT ĐỘNG (4 CARDS)
    renderNews() {
        const container = document.getElementById('newsContainer');
        if (!container) return;
        const news = db.getNews();

        container.innerHTML = news.map(n => `
            <div class="news-card-item" onclick="app.openNewsDetail('${n.id}')">
                <img src="${n.image}" alt="${n.title}" class="news-thumb">
                <div class="news-content">
                    <div class="news-title">${n.title}</div>
                    <div class="news-date">${n.date}</div>
                </div>
            </div>
        `).join('');
    }

    // 6. RENDER THÔNG BÁO (RIGHT SIDEBAR)
    renderAnnouncements() {
        const container = document.getElementById('announcementsContainer');
        if (!container) return;
        const announcements = db.getAnnouncements();

        container.innerHTML = announcements.map(a => `
            <li onclick="app.openAnnouncementDetail('${a.id}')" style="cursor:pointer;">
                <span class="anc-title"><i class="${a.icon}"></i> ${a.title}</span>
                <span class="anc-date">${a.date}</span>
            </li>
        `).join('');
    }

    // 7. RENDER LỊCH HỌC (RIGHT SIDEBAR)
    renderCalendar() {
        const grid = document.getElementById('calendarDaysGrid');
        if (!grid) return;
        const schedules = db.getSchedules();

        const headers = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        let html = headers.map(h => `<div class="cal-day-header">${h}</div>`).join('');

        // Calendar May 2024 starts on Wednesday (offset 2 empty slots)
        html += `<div></div><div></div>`;

        for (let d = 1; d <= 31; d++) {
            const isHighlight = d === schedules.highlightDay;
            html += `
                <div class="cal-day ${isHighlight ? 'highlight' : ''}" onclick="app.checkCalendarDay(${d})">
                    ${d}
                </div>
            `;
        }

        grid.innerHTML = html;
    }

    // 8. RENDER BÀI HỌC MỚI (RIGHT SIDEBAR)
    renderNewLessons() {
        const container = document.getElementById('newLessonsContainer');
        if (!container) return;
        const newLessons = db.getNewLessons();

        container.innerHTML = newLessons.map(nl => `
            <li>
                <span class="lesson-title-text"><i class="fas fa-notes-medical"></i> ${nl.title}</span>
                <span class="grade-badge-sm" style="background-color: ${nl.badgeBg};">${nl.grade}</span>
            </li>
        `).join('');
    }

    // 9. RENDER THỐNG KÊ TRUY CẬP
    renderStats() {
        const stats = db.getStats();
        if (document.getElementById('statToday')) document.getElementById('statToday').innerText = stats.today.toLocaleString('vi-VN');
        if (document.getElementById('statThisWeek')) document.getElementById('statThisWeek').innerText = stats.thisWeek.toLocaleString('vi-VN');
        if (document.getElementById('statTotal')) document.getElementById('statTotal').innerText = stats.total.toLocaleString('vi-VN');
    }

    // EVENT LISTENERS & CAROUSEL
    setupEventListeners() {
        // Hero Next/Prev
        const btnNext = document.getElementById('btnNextHero');
        const btnPrev = document.getElementById('btnPrevHero');
        if (btnNext) btnNext.addEventListener('click', () => this.nextHeroSlide());
        if (btnPrev) btnPrev.addEventListener('click', () => this.prevHeroSlide());

        // Login Modal Trigger
        const btnLogin = document.getElementById('btnLogin');
        if (btnLogin) btnLogin.addEventListener('click', () => this.openModal('loginModal'));

        // Start Learning CTA
        const btnStart = document.getElementById('btnStartLearning');
        if (btnStart) btnStart.addEventListener('click', () => this.openGradeDetail(1));
    }

    startHeroAutoSlide() {
        setInterval(() => {
            this.nextHeroSlide();
        }, 5000);
    }

    nextHeroSlide() {
        this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroImages.length;
        this.updateHeroDisplay();
    }

    prevHeroSlide() {
        this.currentHeroIndex = (this.currentHeroIndex - 1 + this.heroImages.length) % this.heroImages.length;
        this.updateHeroDisplay();
    }

    updateHeroDisplay() {
        const img = document.getElementById('heroImg');
        if (img) img.src = this.heroImages[this.currentHeroIndex];

        const dots = document.querySelectorAll('.carousel-indicators .dot');
        dots.forEach((dot, idx) => {
            if (idx === this.currentHeroIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    // INTERACTIVE MODAL MANAGERS
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    // SONG PLAYER & SOUND SYNTH
    openSongPlayer(songId) {
        const songs = db.getSongs();
        const song = songs.find(s => s.id === songId);
        if (!song) return;

        document.getElementById('songModalName').innerText = song.title;
        document.getElementById('songModalAuthor').innerText = `Tác giả: ${song.author} • Thẻ: ${song.badge}`;
        document.getElementById('songModalImg').src = song.image;
        document.getElementById('songModalLyrics').innerHTML = song.lyrics.map(l => `<p style="margin-bottom:6px;">🎵 ${l}</p>`).join('');

        const playBtn = document.getElementById('btnPlayAudioSynth');
        playBtn.onclick = () => {
            audioSynth.playMelody(song.audioNotes, 500);
            
            // Progress Bar Animation
            const progressBar = document.getElementById('audioProgressBar');
            progressBar.style.width = '0%';
            let width = 0;
            const interval = setInterval(() => {
                width += 5;
                progressBar.style.width = width + '%';
                if (width >= 100) clearInterval(interval);
            }, 180);
        };

        this.openModal('songModal');
    }

    // INTERACTIVE GAMES HANDLER
    launchGame(gameType) {
        if (gameType === 'pitch_ear') {
            this.openPitchGame();
        } else if (gameType === 'doors') {
            this.openSecretDoorsGame();
        } else if (gameType === 'wheel') {
            this.openWheelGame();
        } else {
            this.openQuizizzGame();
        }
    }

    openPitchGame() {
        const notes = ['C4', 'D4', 'E4', 'G4', 'A4'];
        this.targetGameNote = notes[Math.floor(Math.random() * notes.length)];
        document.getElementById('pitchGameResult').innerText = '';
        this.openModal('pitchGameModal');
        audioSynth.playNote(this.targetGameNote, 1.0);
    }

    playTargetGameNote() {
        audioSynth.playNote(this.targetGameNote, 1.0);
    }

    checkGameNoteAnswer(chosenNote) {
        audioSynth.playNote(chosenNote, 0.6);
        const resultDiv = document.getElementById('pitchGameResult');
        if (chosenNote === this.targetGameNote) {
            resultDiv.innerHTML = `<span style="color:#16a34a;"><i class="fas fa-check-circle"></i> CHÍNH XÁC! Bạn đoán rất giỏi! 🎉</span>`;
            setTimeout(() => {
                const notes = ['C4', 'D4', 'E4', 'G4', 'A4'];
                this.targetGameNote = notes[Math.floor(Math.random() * notes.length)];
                audioSynth.playNote(this.targetGameNote, 1.0);
            }, 1200);
        } else {
            resultDiv.innerHTML = `<span style="color:#ef4444;"><i class="fas fa-times-circle"></i> Chưa đúng rồi, hãy thử nghe lại nhé!</span>`;
        }
    }

    openSecretDoorsGame() {
        document.getElementById('detailModalTitle').innerText = 'Trò chơi: Ô cửa bí mật';
        document.getElementById('detailModalBody').innerHTML = `
            <p style="font-weight:700; color:#475569; margin-bottom:12px;">Nhấn vào từng ô cửa để trả lời câu hỏi nhạc lý:</p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <button onclick="alert('Câu hỏi 1: Nốt Đô nằm ở dòng kẻ phụ thứ mấy?\\n-> Dòng kẻ phụ thứ 1 dưới khuông!'); audioSynth.playNote('C4');" style="padding:20px; background:#a855f7; color:white; font-weight:800; border-radius:10px;">Ô CỬA 1 🚪</button>
                <button onclick="alert('Câu hỏi 2: Hình nốt Đen có độ dài bằng mấy phách?\\n-> 1 Phách!'); audioSynth.playNote('E4');" style="padding:20px; background:#6366f1; color:white; font-weight:800; border-radius:10px;">Ô CỬA 2 🚪</button>
                <button onclick="alert('Câu hỏi 3: Nhịp 2/4 có mấy phách trong 1 ô nhịp?\\n-> 2 Phách!'); audioSynth.playNote('G4');" style="padding:20px; background:#ec4899; color:white; font-weight:800; border-radius:10px;">Ô CỬA 3 🚪</button>
                <button onclick="alert('Câu hỏi 4: Đàn Piano thuộc dòng nhạc cụ gì?\\n-> Nhạc cụ phím gõ!'); audioSynth.playNote('C5');" style="padding:20px; background:#06b6d4; color:white; font-weight:800; border-radius:10px;">Ô CỬA 4 🚪</button>
            </div>
        `;
        this.openModal('detailModal');
    }

    openWheelGame() {
        document.getElementById('detailModalTitle').innerText = 'Trò chơi: Chiếc nón kỳ diệu';
        document.getElementById('detailModalBody').innerHTML = `
            <div style="text-align:center; padding:10px;">
                <div id="wheelBox" style="width:160px; height:160px; border-radius:50%; border:8px solid #f59e0b; background:conic-gradient(#ef4444 0deg 90deg, #3b82f6 90deg 180deg, #10b981 180deg 270deg, #ec4899 270deg 360deg); margin:0 auto 16px; transition:transform 3s cubic-bezier(0.15, 0.9, 0.15, 1);"></div>
                <button onclick="
                    const deg = Math.floor(Math.random() * 1440) + 720;
                    document.getElementById('wheelBox').style.transform = 'rotate(' + deg + 'deg)';
                    audioSynth.playMelody(['C4','E4','G4','C5']);
                    setTimeout(() => alert('Chúc mừng bạn nhận được 100 Điểm Thưởng Âm Nhạc! 🎉'), 3100);
                " style="padding:10px 24px; background:#f59e0b; color:white; font-weight:800; border-radius:20px;">
                    <i class="fas fa-sync-alt"></i> QUAY VÒNG QUAY
                </button>
            </div>
        `;
        this.openModal('detailModal');
    }

    openQuizizzGame() {
        document.getElementById('detailModalTitle').innerText = 'Trò chơi: Quizizz Âm Nhạc';
        document.getElementById('detailModalBody').innerHTML = `
            <div style="padding:10px;">
                <h4 style="font-weight:800; color:var(--primary-blue); margin-bottom:12px;">Câu 1: Nhạc sĩ Phạm Tuyên là tác giả của bài hát nào dưới đây?</h4>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    <button onclick="alert('Đúng rồi! Bài hát Cả tuần đều ngoan!'); audioSynth.playNote('C5');" style="padding:10px; background:#f1f5f9; text-align:left; font-weight:700; border-radius:8px; border:1px solid #cbd5e1;">A. Cả tuần đều ngoan</button>
                    <button onclick="alert('Chưa chính xác!');" style="padding:10px; background:#f1f5f9; text-align:left; font-weight:700; border-radius:8px; border:1px solid #cbd5e1;">B. Em yêu mái trường</button>
                    <button onclick="alert('Chưa chính xác!');" style="padding:10px; background:#f1f5f9; text-align:left; font-weight:700; border-radius:8px; border:1px solid #cbd5e1;">C. Đếm sao</button>
                </div>
            </div>
        `;
        this.openModal('detailModal');
    }

    // OTHER DETAIL MODALS
    openGradeDetail(gradeNum) {
        const grades = db.getGradeLessons();
        const grade = grades.find(g => g.grade === gradeNum);
        if (!grade) return;

        document.getElementById('detailModalTitle').innerText = `Bài học chương trình - ${grade.title}`;
        document.getElementById('detailModalBody').innerHTML = `
            <div style="background:${grade.bgGradient}; padding:16px; border-radius:12px; margin-bottom:16px;">
                <h4 style="color:${grade.themeColor}; font-weight:800; font-size:1.1rem; margin-bottom:8px;">Nội dung chính:</h4>
                <ul style="list-style:disc; margin-left:20px; font-weight:700; color:#334155;">
                    ${grade.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
            <h5 style="font-weight:800; color:var(--primary-blue); margin-bottom:8px;">Danh sách tiết học:</h5>
            <div style="display:flex; flex-direction:column; gap:8px;">
                ${grade.lessons.map(l => `
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:10px; border-radius:8px;">
                        <strong style="color:#1e293b;">${l.title}</strong>
                        <p style="font-size:0.82rem; color:#64748b;">${l.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;
        this.openModal('detailModal');
    }

    openVideoModal(vidId) {
        const videos = db.getVideos();
        const video = videos.find(v => v.id === vidId);
        if (!video) return;

        document.getElementById('detailModalTitle').innerText = video.title;
        document.getElementById('detailModalBody').innerHTML = `
            <div style="text-align:center;">
                <img src="${video.image}" alt="${video.title}" style="width:100%; height:200px; object-fit:cover; border-radius:10px; margin-bottom:12px;">
                <h4 style="font-weight:800; color:var(--primary-blue);">${video.subtitle}</h4>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">Thời lượng: ${video.duration}</p>
                <button onclick="alert('Đang kết nối luồng phát Video bài giảng...'); audioSynth.playNote('E4');" style="padding:10px 24px; background:var(--accent-red); color:white; font-weight:800; border-radius:20px;">
                    <i class="fas fa-play-circle"></i> BẮT ĐẦU XEM VIDEO
                </button>
            </div>
        `;
        this.openModal('detailModal');
    }

    openNewsDetail(newsId) {
        const news = db.getNews();
        const item = news.find(n => n.id === newsId);
        if (!item) return;

        document.getElementById('detailModalTitle').innerText = item.title;
        document.getElementById('detailModalBody').innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="width:100%; height:180px; object-fit:cover; border-radius:10px; margin-bottom:12px;">
            <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:8px;"><i class="far fa-calendar-alt"></i> Ngày đăng: ${item.date}</p>
            <p style="font-size:0.92rem; line-height:1.6; color:#334155;">${item.summary}</p>
        `;
        this.openModal('detailModal');
    }

    openAnnouncementDetail(ancId) {
        const ancList = db.getAnnouncements();
        const anc = ancList.find(a => a.id === ancId);
        if (!anc) return;

        document.getElementById('detailModalTitle').innerText = 'Chi tiết thông báo';
        document.getElementById('detailModalBody').innerHTML = `
            <h4 style="color:var(--primary-blue); font-weight:800; margin-bottom:8px;">${anc.title}</h4>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;"><i class="far fa-calendar-alt"></i> Ngày thông báo: ${anc.date}</p>
            <p style="font-size:0.9rem; color:#475569;">Thông báo tới toàn thể giáo viên và học sinh các khối lớp chuẩn bị tham gia theo đúng kế hoạch ban giám hiệu.</p>
        `;
        this.openModal('detailModal');
    }

    checkCalendarDay(dayNum) {
        const schedules = db.getSchedules();
        const eventText = schedules.events[dayNum.toString()];

        document.getElementById('detailModalTitle').innerText = `Lịch học & Sự kiện - Ngày ${dayNum}/05/2024`;
        document.getElementById('detailModalBody').innerHTML = eventText ? `
            <div style="background:#fef2f2; border:1px solid #fecaca; padding:14px; border-radius:10px; color:#b91c1c;">
                <h4 style="font-weight:800;"><i class="fas fa-star"></i> Sự kiện nổi bật:</h4>
                <p style="font-size:0.92rem; font-weight:700; margin-top:4px;">${eventText}</p>
            </div>
        ` : `
            <p style="color:#64748b;">Không có sự kiện đặc biệt trong ngày ${dayNum}/05/2024. Tiết học diễn ra theo thời khóa biểu bình thường.</p>
        `;
        this.openModal('detailModal');
    }

    openQuickLink(type) {
        const links = {
            sgk: "Bộ Sách Giáo Khoa Âm Nhạc Cánh Diều / Kết Nối Tri Thức Khối 1-5",
            youtube: "Kênh Video Hướng Dẫn Hát & Thổi Sáo Recorder Tiểu Học",
            instruments: "Danh Mục Nhạc Cụ: Thanh Phách, Song Loan, Tri-ăng, Ukulele",
            software: "Phần Mềm Luyện Nốt Nhạc & Bàn Phím Piano Ảo",
            photos: "Thư Viện Ảnh Hoạt Động Văn Nghệ Trường Học",
            faq: "Giải Đáp Thắc Mắc Về Môn Học & Thi Học Kỳ Âm Nhạc"
        };
        document.getElementById('detailModalTitle').innerText = 'Liên kết nhanh';
        document.getElementById('detailModalBody').innerHTML = `
            <h4 style="color:#c2410c; font-weight:800; margin-bottom:8px;">${links[type]}</h4>
            <p style="font-size:0.9rem; color:#475569;">Hệ thống đang mở tài nguyên học tập chuẩn Bộ Giáo Dục cho học sinh & giáo viên...</p>
        `;
        this.openModal('detailModal');
    }

    handleLogin(e) {
        e.preventDefault();
        const user = document.getElementById('loginUser').value;
        alert(`Đăng nhập thành công! Chào mừng ${user} đến với Portal Âm Nhạc Tiểu Học.`);
        this.closeModal('loginModal');
    }

    showAllGradeLessons() { this.openGradeDetail(1); }
    showAllSongs() { this.openSongPlayer('song-1'); }
    showAllVideos() { this.openVideoModal('vid-1'); }
    showAllGames() { this.launchGame('pitch_ear'); }
    showAllNews() { this.openNewsDetail('news-1'); }
}

const app = new AppController();
