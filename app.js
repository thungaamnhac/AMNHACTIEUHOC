/* ==========================================================================
   Classroom App - Hệ Thống Học Tập Âm Nhạc Khối 1-5 (Application Logic)
   Author: thungamnhac
   ========================================================================== */

// --- Global Audio Synthesizer Engine (Web Audio API) ---
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

const noteFrequencies = {
    'C4': 261.63, 'C#4': 277.18,
    'D4': 293.66, 'D#4': 311.13,
    'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99,
    'G4': 392.00, 'G#4': 415.30,
    'A4': 440.00, 'A#4': 466.16,
    'B4': 493.88,
    'C5': 523.25
};

function playTone(freq, type = 'sine', duration = 0.6) {
    try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const vol = parseFloat(document.getElementById('piano-volume')?.value || 0.7);

        osc.type = type;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        console.warn('Audio Context Error:', e);
    }
}

// --- Data: Question Bank Khối 1 - 5 ---
const musicQuestionBank = [
    // Khối 1
    {
        id: 101, grade: 1, type: 'audio', note: 'C4',
        text: 'Nghe âm thanh và cho biết đây là nốt nhạc gì?',
        options: ['Nốt Đồ (C4)', 'Nốt Rê (D4)', 'Nốt Mi (E4)', 'Nốt Sol (G4)'],
        answerIndex: 0,
        skill: 'Thính giác'
    },
    {
        id: 102, grade: 1, type: 'text',
        text: 'Âm thanh của tiếng trống trường kêu "Tùng tùng tùng" có tính chất gì?',
        options: ['Dài và mượt mà', 'Rõ ràng, vang và có nhịp điệu', 'Rất cao và nhọn', 'Im lặng'],
        answerIndex: 1,
        skill: 'Kiến thức chung'
    },
    // Khối 2
    {
        id: 201, grade: 2, type: 'text',
        text: 'Hình nốt Trắng (White note) có độ dài ngân bằng mấy phách?',
        options: ['1 Phách', '2 Phách', '3 Phách', '4 Phách'],
        answerIndex: 1,
        skill: 'Nhịp điệu'
    },
    {
        id: 202, grade: 2, type: 'audio', note: 'E4',
        text: 'Lắng nghe âm thanh sau đây và xác định tên nốt nhạc:',
        options: ['Nốt Đồ', 'Nốt Rê', 'Nốt Mi (E4)', 'Nốt La'],
        answerIndex: 2,
        skill: 'Thính giác'
    },
    // Khối 3
    {
        id: 301, grade: 3, type: 'audio', note: 'G4',
        text: 'Nghe âm thanh tần số chuẩn và chọn nốt đúng:',
        options: ['Nốt Sol (G4)', 'Nốt La (A4)', 'Nốt Si (B4)', 'Nốt Đồ (C4)'],
        answerIndex: 0,
        skill: 'Đọc nhạc'
    },
    {
        id: 302, grade: 3, type: 'text',
        text: 'Nhạc cụ dân tộc nào sau đây chỉ có duy nhất 1 dây?',
        options: ['Đàn Tranh', 'Đàn Bầu', 'Đàn Nhị', 'Sáo Trúc'],
        answerIndex: 1,
        skill: 'Nhạc cụ'
    },
    {
        id: 303, grade: 3, type: 'text',
        text: 'Nhịp 2/4 bao gồm mấy phách trong một ô nhịp?',
        options: ['2 phách (Phách 1 mạnh, phách 2 nhẹ)', '3 phách', '4 phách', '1 phách'],
        answerIndex: 0,
        skill: 'Nhịp điệu'
    },
    // Khối 4
    {
        id: 401, grade: 4, type: 'audio', note: 'A4',
        text: 'Nghe nốt thanh âm chuẩn A4 (440Hz) và chọn đáp án:',
        options: ['Nốt Fa (F4)', 'Nốt La (A4)', 'Nốt Si (B4)', 'Nốt Rê (D4)'],
        answerIndex: 1,
        skill: 'Thính giác'
    },
    {
        id: 402, grade: 4, type: 'text',
        text: 'Ký hiệu "Dấu Lặng Đen" yêu cầu người biểu diễn làm gì?',
        options: ['Hát thật to', 'Nghỉ đúng bằng giá trị 1 phách nốt đen', 'Hát thật nhanh', 'Đổi sang nốt khác'],
        answerIndex: 1,
        skill: 'Đọc nhạc'
    },
    // Khối 5
    {
        id: 501, grade: 5, type: 'text',
        text: 'Thang âm tự nhiên (Major Scale) cơ bản gồm bao nhiêu nốt nhạc?',
        options: ['5 Nốt', '6 Nốt', '7 Nốt (Đồ Rê Mi Fa Sol La Si)', '12 Nốt'],
        answerIndex: 2,
        skill: 'Kiến thức chung'
    }
];

// --- State Management ---
let state = {
    activeTab: 'overview',
    currentRoomCode: 'AMNHAC-K3-9821',
    gradeFilter: 3,
    timerSeconds: 20,
    antiCheatEnabled: true,

    // Student Quiz State
    studentName: 'Nguyễn Văn An',
    currentQuizQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    totalScore: 0,
    correctCount: 0,
    warningCount: 0,
    timerInterval: null,
    timeRemaining: 20,
    quizActive: false,

    // Leaderboard
    leaderboardData: [
        { name: 'Nguyễn Văn An', grade: 'Khối 3', correct: '5/5', avgTime: '3.2s', warnings: 0, score: 450 },
        { name: 'Lê Minh Khoa', grade: 'Khối 3', correct: '4/5', avgTime: '4.1s', warnings: 0, score: 420 },
        { name: 'Trần Bảo Ngọc', grade: 'Khối 3', correct: '4/5', avgTime: '4.8s', warnings: 0, score: 390 },
        { name: 'Phạm Đức Anh', grade: 'Khối 2', correct: '3/5', avgTime: '5.5s', warnings: 1, score: 310 },
        { name: 'Hoàng Thùy Linh', grade: 'Khối 4', correct: '3/5', avgTime: '6.0s', warnings: 0, score: 290 }
    ]
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    initNavigation();
    initPiano();
    renderQuestionBank();
    renderLeaderboard();
    initCharts();
    initAntiCheatListener();
    await renderKNTTLessons();
});

// --- KNTT Lessons Renderer ---
async function renderKNTTLessons(filterGrade = 'all') {
    const container = document.getElementById('kntt-lessons-container');
    if (!container) return;

    let lessons = typeof getLessonsData === 'function' ? await getLessonsData() : [];
    if (filterGrade !== 'all') {
        lessons = lessons.filter(l => l.grade === parseInt(filterGrade));
    }

    container.innerHTML = lessons.map(l => `
        <div class="kntt-card grade-border-${l.grade}">
            <div class="kntt-card-header">
                <span class="badge badge-grade">Khối ${l.grade}</span>
                <span class="kntt-topic">${l.topic}</span>
            </div>
            <div class="kntt-card-body">
                <div class="kntt-icon"><i class="fa-solid ${l.icon || 'fa-music'}"></i></div>
                <h4>${l.title}</h4>
                <p class="kntt-author"><i class="fa-solid fa-user-pen"></i> Tác giả: <strong>${l.author}</strong></p>
                <div class="kntt-note"><i class="fa-solid fa-music text-accent"></i> Ghi chú: ${l.note}</div>
            </div>
            <div class="kntt-card-footer">
                <button class="btn btn-sm btn-primary" onclick="playLessonDemoNote('${l.note}')"><i class="fa-solid fa-play"></i> Nghe Thử Âm Thanh</button>
            </div>
        </div>
    `).join('');
}

function filterKNTTGrade(grade) {
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderKNTTLessons(grade);
}

function playLessonDemoNote(noteStr) {
    if (noteStr.includes('C4') || noteStr.includes('Đồ')) playTone(261.63, 'triangle', 0.8);
    else if (noteStr.includes('D4') || noteStr.includes('Rê')) playTone(293.66, 'triangle', 0.8);
    else if (noteStr.includes('E4') || noteStr.includes('Mi')) playTone(329.63, 'triangle', 0.8);
    else if (noteStr.includes('G4') || noteStr.includes('Sol')) playTone(392.00, 'triangle', 0.8);
    else if (noteStr.includes('A4') || noteStr.includes('La')) playTone(440.00, 'triangle', 0.8);
    else playTone(523.25, 'sine', 0.8);
}

// --- Tab Navigation ---
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabId) {
    state.activeTab = tabId;

    // Update Nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    // Update Tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabId}`);
    });

    // Refresh tab specific views
    if (tabId === 'leaderboard') renderLeaderboard();
}

// --- Virtual Piano Component ---
function initPiano() {
    const container = document.getElementById('piano-keyboard');
    if (!container) return;

    const keysConfig = [
        { note: 'C4', label: 'Đồ (C4)', type: 'white' },
        { note: 'C#4', label: 'C#', type: 'black' },
        { note: 'D4', label: 'Rê (D4)', type: 'white' },
        { note: 'D#4', label: 'D#', type: 'black' },
        { note: 'E4', label: 'Mi (E4)', type: 'white' },
        { note: 'F4', label: 'Fa (F4)', type: 'white' },
        { note: 'F#4', label: 'F#', type: 'black' },
        { note: 'G4', label: 'Sol (G4)', type: 'white' },
        { note: 'G#4', label: 'G#', type: 'black' },
        { note: 'A4', label: 'La (A4)', type: 'white' },
        { note: 'A#4', label: 'A#', type: 'black' },
        { note: 'B4', label: 'Si (B4)', type: 'white' },
        { note: 'C5', label: 'Đồ (C5)', type: 'white' }
    ];

    container.innerHTML = '';
    keysConfig.forEach(k => {
        const keyDiv = document.createElement('div');
        keyDiv.className = `piano-key ${k.type}`;
        keyDiv.textContent = k.label;
        keyDiv.addEventListener('mousedown', () => {
            playPianoKey(k.note, keyDiv);
        });
        container.appendChild(keyDiv);
    });
}

function playPianoKey(note, keyElement) {
    if (noteFrequencies[note]) {
        playTone(noteFrequencies[note], 'triangle', 0.8);
        if (keyElement) {
            keyElement.classList.add('active');
            setTimeout(() => keyElement.classList.remove('active'), 250);
        }
    }
}

function playDemoMelody() {
    const melody = [
        { note: 'C4', duration: 400 },
        { note: 'D4', duration: 400 },
        { note: 'E4', duration: 400 },
        { note: 'C4', duration: 400 },
        { note: 'E4', duration: 400 },
        { note: 'G4', duration: 800 }
    ];

    melody.forEach((item, index) => {
        setTimeout(() => {
            playTone(noteFrequencies[item.note], 'triangle', 0.5);
        }, index * 450);
    });
    logActivity('Hệ thống', 'Phát giai điệu mẫu Piano Ảo cho lớp học.');
}

// --- Teacher Portal & Question Bank ---
function generateNewRoom() {
    const grade = document.getElementById('teacher-grade-select').value;
    const timer = parseInt(document.getElementById('teacher-timer-input').value) || 20;
    const anticheat = document.getElementById('teacher-anticheat-toggle').checked;

    state.gradeFilter = parseInt(grade);
    state.timerSeconds = timer;
    state.antiCheatEnabled = anticheat;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    state.currentRoomCode = `AMNHAC-K${grade}-${randomNum}`;

    document.getElementById('global-room-code').textContent = state.currentRoomCode;
    document.getElementById('teacher-room-code').textContent = state.currentRoomCode;
    document.getElementById('share-link-input').value = `https://classroom.app/join?code=${state.currentRoomCode}`;
    document.getElementById('student-room-input').value = state.currentRoomCode;

    logActivity('Giáo viên', `Sinh mã phòng mới: ${state.currentRoomCode} (Khối ${grade}, Thời gian: ${timer}s)`);
    alert(`Đã tạo phòng học mới thành công!\nMã phòng: ${state.currentRoomCode}`);
}

function filterQBank(grade) {
    const buttons = document.querySelectorAll('.qbank-actions button');
    buttons.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    renderQuestionBank(grade);
}

function renderQuestionBank(gradeFilter = 'all') {
    const container = document.getElementById('qbank-list-container');
    if (!container) return;

    const filtered = gradeFilter === 'all'
        ? musicQuestionBank
        : musicQuestionBank.filter(q => q.grade === parseInt(gradeFilter));

    container.innerHTML = filtered.map(q => `
        <div class="qbank-item">
            <div class="qbank-item-info">
                <h5>${q.text}</h5>
                <span><i class="fa-solid fa-layer-group"></i> Khối ${q.grade} • <i class="fa-solid fa-bullseye"></i> Kỹ năng: ${q.skill}</span>
            </div>
            <button class="btn btn-sm btn-outline" onclick="previewQuestionAudio('${q.note || 'C4'}')">
                <i class="fa-solid fa-volume-high"></i> Nghe
            </button>
        </div>
    `).join('');
}

function previewQuestionAudio(note) {
    playTone(noteFrequencies[note] || 261.63, 'sine', 0.7);
}

function copyRoomCode() {
    navigator.clipboard.writeText(state.currentRoomCode);
    alert('Đã sao chép Mã phòng học: ' + state.currentRoomCode);
}

function copyShareLink() {
    const link = document.getElementById('share-link-input').value;
    navigator.clipboard.writeText(link);
    alert('Đã sao chép Link tham gia!');
}

// --- Student View & Interactive Quiz Engine ---
function startStudentQuiz(e) {
    e.preventDefault();
    const nameInput = document.getElementById('student-name').value.trim();
    if (!nameInput) return;

    state.studentName = nameInput;
    state.currentQuizQuestions = musicQuestionBank.filter(q => q.grade === state.gradeFilter);
    if (state.currentQuizQuestions.length === 0) {
        state.currentQuizQuestions = musicQuestionBank.slice(0, 5);
    }
    state.currentQuestionIndex = 0;
    state.userAnswers = [];
    state.totalScore = 0;
    state.correctCount = 0;
    state.warningCount = 0;
    state.quizActive = true;

    document.getElementById('student-login-view').classList.add('hidden');
    document.getElementById('student-result-view').classList.add('hidden');
    document.getElementById('student-quiz-view').classList.remove('hidden');

    document.getElementById('quiz-student-name').textContent = state.studentName;

    logActivity('Học sinh', `Học sinh ${state.studentName} tham gia phòng ${state.currentRoomCode}`);

    loadQuestion();
}

function loadQuestion() {
    const q = state.currentQuizQuestions[state.currentQuestionIndex];
    if (!q) {
        finishStudentQuiz();
        return;
    }

    document.getElementById('question-number').textContent = `Câu ${state.currentQuestionIndex + 1} / ${state.currentQuizQuestions.length}`;
    document.getElementById('question-grade-tag').textContent = `Khối ${q.grade}`;
    document.getElementById('question-text').textContent = q.text;

    // Progress bar
    const progressPercent = ((state.currentQuestionIndex + 1) / state.currentQuizQuestions.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progressPercent}%`;

    // Audio box display
    const audioBox = document.getElementById('audio-play-container');
    if (q.type === 'audio') {
        audioBox.classList.remove('hidden');
    } else {
        audioBox.classList.add('hidden');
    }

    // Options grid
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <button class="option-btn" onclick="selectAnswer(${idx}, this)">
            <span class="opt-label">${String.fromCharCode(65 + idx)}.</span> ${opt}
        </button>
    `).join('');

    // Hide feedback bar
    document.getElementById('quiz-feedback-bar').classList.add('hidden');

    // Reset & Start Timer
    startQuestionTimer();
}

function playQuestionSound() {
    const q = state.currentQuizQuestions[state.currentQuestionIndex];
    if (q && q.note) {
        playTone(noteFrequencies[q.note], 'triangle', 1.0);
    } else {
        playTone(329.63, 'sine', 0.8);
    }
}

function startQuestionTimer() {
    clearInterval(state.timerInterval);
    state.timeRemaining = state.timerSeconds;
    document.getElementById('quiz-timer-countdown').textContent = state.timeRemaining;

    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        document.getElementById('quiz-timer-countdown').textContent = state.timeRemaining;

        if (state.timeRemaining <= 0) {
            clearInterval(state.timerInterval);
            timeOutAnswer();
        }
    }, 1000);
}

function selectAnswer(selectedIndex, btnElem) {
    if (!state.quizActive) return;
    clearInterval(state.timerInterval);

    const q = state.currentQuizQuestions[state.currentQuestionIndex];
    const isCorrect = selectedIndex === q.answerIndex;

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(b => b.disabled = true);

    if (isCorrect) {
        btnElem.classList.add('correct');
        const speedBonus = Math.round((state.timeRemaining / state.timerSeconds) * 50);
        const questionScore = 100 + speedBonus;
        state.totalScore += questionScore;
        state.correctCount++;
        showFeedback(true, `Chính xác! (+${questionScore} điểm)`);
    } else {
        btnElem.classList.add('wrong');
        allButtons[q.answerIndex].classList.add('correct');
        showFeedback(false, `Chưa đúng! Đáp án đúng là: ${q.options[q.answerIndex]}`);
    }
}

function timeOutAnswer() {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(b => b.disabled = true);
    const q = state.currentQuizQuestions[state.currentQuestionIndex];
    allButtons[q.answerIndex].classList.add('correct');
    showFeedback(false, 'Hết thời gian suy nghĩ!');
}

function showFeedback(isCorrect, message) {
    const feedbackBar = document.getElementById('quiz-feedback-bar');
    const iconDiv = document.getElementById('feedback-icon');
    const msgDiv = document.getElementById('feedback-message');

    feedbackBar.classList.remove('hidden');
    if (isCorrect) {
        iconDiv.innerHTML = '<i class="fa-solid fa-circle-check text-success" style="font-size: 1.5rem;"></i>';
    } else {
        iconDiv.innerHTML = '<i class="fa-solid fa-circle-xmark text-danger" style="font-size: 1.5rem;"></i>';
    }
    msgDiv.textContent = message;
}

function nextQuestion() {
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex < state.currentQuizQuestions.length) {
        loadQuestion();
    } else {
        finishStudentQuiz();
    }
}

function finishStudentQuiz() {
    state.quizActive = false;
    clearInterval(state.timerInterval);

    document.getElementById('student-quiz-view').classList.add('hidden');
    document.getElementById('student-result-view').classList.remove('hidden');

    document.getElementById('result-student-name').textContent = state.studentName;
    document.getElementById('result-total-score').textContent = state.totalScore;
    document.getElementById('result-correct-count').textContent = `${state.correctCount} / ${state.currentQuizQuestions.length}`;
    document.getElementById('result-warning-count').textContent = `${state.warningCount} Lần`;

    // Add result to Leaderboard
    const newEntry = {
        name: state.studentName,
        grade: `Khối ${state.gradeFilter}`,
        correct: `${state.correctCount}/${state.currentQuizQuestions.length}`,
        avgTime: '3.5s',
        warnings: state.warningCount,
        score: state.totalScore
    };
    state.leaderboardData.unshift(newEntry);
    state.leaderboardData.sort((a, b) => b.score - a.score);

    logActivity('Học sinh', `Hoàn thành bài làm với ${state.totalScore} điểm. Vi phạm: ${state.warningCount} lần.`);
}

function restartQuiz() {
    document.getElementById('student-result-view').classList.add('hidden');
    document.getElementById('student-login-view').classList.remove('hidden');
}

// --- Anti-Cheat Guard Middleware ---
function initAntiCheatListener() {
    document.addEventListener('visibilitychange', () => {
        if (state.quizActive && document.hidden && state.antiCheatEnabled) {
            triggerAntiCheatWarning();
        }
    });

    window.addEventListener('blur', () => {
        if (state.quizActive && state.antiCheatEnabled) {
            triggerAntiCheatWarning();
        }
    });
}

function triggerAntiCheatWarning() {
    state.warningCount++;
    // Deduct points
    state.totalScore = Math.max(0, state.totalScore - 30);

    // Update Security badge in quiz top bar
    const textElem = document.getElementById('security-status-text');
    if (textElem) {
        textElem.textContent = `CẢNH BÁO (${state.warningCount})`;
        textElem.className = 'text-danger';
    }

    document.getElementById('anticheat-modal').classList.remove('hidden');
    logActivity('Bảo mật', `CẢNH BÁO GIAN LẬN: Học sinh ${state.studentName} đã chuyển tab/ẩn trình duyệt!`);
}

function closeAntiCheatModal() {
    document.getElementById('anticheat-modal').classList.add('hidden');
}

// --- Leaderboard View ---
function renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-table-body');
    if (!tbody) return;

    // Update Podium Top 1
    if (state.leaderboardData.length > 0) {
        document.getElementById('podium-top1-name').textContent = state.leaderboardData[0].name;
        document.getElementById('podium-top1-score').textContent = `${state.leaderboardData[0].score} điểm`;
    }

    tbody.innerHTML = state.leaderboardData.map((item, index) => `
        <tr>
            <td><strong>#${index + 1}</strong></td>
            <td><strong>${item.name}</strong></td>
            <td>${item.grade}</td>
            <td><span class="badge badge-success">${item.correct}</span></td>
            <td>${item.avgTime}</td>
            <td><span class="${item.warnings > 0 ? 'text-danger' : 'text-muted'}">${item.warnings} lần</span></td>
            <td><strong class="text-gold">${item.score} đ</strong></td>
        </tr>
    `).join('');
}

// --- Analytics Charts ---
function initCharts() {
    // Grade Performance Bar Chart
    const ctxBar = document.getElementById('gradePerformanceChart')?.getContext('2d');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Khối 1', 'Khối 2', 'Khối 3', 'Khối 4', 'Khối 5'],
                datasets: [{
                    label: 'Tỷ lệ trả lời đúng (%)',
                    data: [88, 92, 85, 78, 82],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.7)',
                        'rgba(168, 85, 247, 0.7)',
                        'rgba(6, 182, 212, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(245, 158, 11, 0.7)'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#94a3b8' } } },
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { color: '#94a3b8' } },
                    x: { ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    // Skill Radar Chart
    const ctxRadar = document.getElementById('skillRadarChart')?.getContext('2d');
    if (ctxRadar) {
        new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['Thính Giác', 'Nhịp Điệu', 'Đọc Nốt', 'Nhạc Cụ', 'Lý Thuyết'],
                datasets: [{
                    label: 'Năng lực trung bình lớp học',
                    data: [90, 85, 80, 95, 75],
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(6, 182, 212, 0.25)',
                    pointBackgroundColor: '#06b6d4'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#94a3b8' } } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#cbd5e1' },
                        ticks: { display: false }
                    }
                }
            }
        });
    }
}

// --- Activity Audit Log ---
function logActivity(tag, text) {
    const container = document.getElementById('activity-log-container');
    if (!container) return;

    const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let tagClass = 'tag-system';
    if (tag === 'Giáo viên') tagClass = 'tag-teacher';
    if (tag === 'Học sinh') tagClass = 'tag-student';

    const logDiv = document.createElement('div');
    logDiv.className = 'log-item';
    logDiv.innerHTML = `
        <span class="log-time">${timeStr}</span>
        <span class="log-tag ${tagClass}">[${tag}]</span>
        <span class="log-text">${text}</span>
    `;

    container.insertBefore(logDiv, container.firstChild);
}

// --- Export Report & Data ---
function exportReportPDF() {
    document.getElementById('print-date').textContent = new Date().toLocaleString('vi-VN');
    window.print();
}

function exportDataCSV() {
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "Hạng,Họ và Tên Học Sinh,Khối Lớp,Số Câu Đúng,Thời Gian TB,Vi Phạm Anti-Cheat,Tổng Điểm\n";

    state.leaderboardData.forEach((row, index) => {
        csvContent += `${index + 1},"${row.name}","${row.grade}","${row.correct}","${row.avgTime}",${row.warnings},${row.score}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Bang_Diem_Am_Nhac_${state.currentRoomCode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    logActivity('Hệ thống', 'Đã xuất dữ liệu Bảng điểm ra tệp CSV thành công.');
}

function exportDataJSON() {
    const exportObject = {
        projectName: "Classroom App - Âm Nhạc Khối 1-5",
        author: "thungamnhac",
        exportTime: new Date().toISOString(),
        activeRoom: state.currentRoomCode,
        gradeFilter: state.gradeFilter,
        antiCheatEnabled: state.antiCheatEnabled,
        leaderboard: state.leaderboardData,
        questionBank: musicQuestionBank
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `Data_System_AmNhac_${state.currentRoomCode}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    logActivity('Hệ thống', 'Đã xuất toàn bộ dữ liệu hệ thống ra tệp JSON thành công.');
}

