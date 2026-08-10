/* ==========================================================================
   db.js - Supabase Database Client Connection & Full LMS Portal Data Engine
   Dự án: Nền Tảng Học Tập Âm Nhạc Tiểu Học Khối 1-5 (Bộ sách Kết Nối Tri Thức)
   Tác giả: thungamnhac
   ========================================================================== */

// 1. Cấu hình Thông tin Kết nối Supabase
const SUPABASE_URL = 'https://hzihapberumsnilxppcb.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_eLTag-nYqSp0DQUVz-PalA_J5vGm29x';

let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL && !SUPABASE_URL.includes('YOUR_SUPABASE')) {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
        console.log('✅ Supabase DB đã kết nối thành công!');
    } catch (e) {
        console.warn('⚠️ Không thể kết nối Supabase, chuyển sang chế độ Dữ liệu mẫu KNTT.', e);
    }
}

/*
 * DỮ LIỆU LMS TOÀN DIỆN: PHÂN QUYỀN (ADMIN - GIÁO VIÊN - HỌC SINH)
 * QUẢN LÝ LỚP HỌC - HỌC LIỆU KNTT - TRÒ CHƠI ÂM NHẠC
 */
const LMS_DATA = {
    // --- NGUỜI DÙNG & PHÂN QUYỀN ---
    users: [
        { id: 'U001', name: 'Nguyễn Thanh Nga (Admin)', email: 'admin@amnhac.edu.vn', role: 'admin', avatar: 'fa-user-gear' },
        { id: 'U002', name: 'Cô Hoàng Mai (Giáo viên)', email: 'hoangmai@amnhac.edu.vn', role: 'teacher', avatar: 'fa-chalkboard-user' },
        { id: 'U003', name: 'Học sinh Nguyễn Văn An', email: 'vanan@student.edu.vn', role: 'student', classId: 'C101', grade: 3, score: 450 }
    ],

    // --- DANH SÁCH LỚP HỌC (CLASSROOMS) ---
    classes: [
        { id: 'C101', className: 'Lớp 3A1', grade: 3, teacherName: 'Cô Hoàng Mai', roomCode: 'AMNHAC-K3-9821', studentCount: 35 },
        { id: 'C102', className: 'Lớp 1A2', grade: 1, teacherName: 'Thầy Trần Đức', roomCode: 'AMNHAC-K1-1204', studentCount: 32 },
        { id: 'C103', className: 'Lớp 4A5', grade: 4, teacherName: 'Cô Lê Hằng', roomCode: 'AMNHAC-K4-4412', studentCount: 38 },
        { id: 'C104', className: 'Lớp 5A3', grade: 5, teacherName: 'Cô Hoàng Mai', roomCode: 'AMNHAC-K5-5510', studentCount: 30 }
    ],

    // --- DANH SÁCH HỌC SINH THEO LỚP ---
    students: [
        { id: 'S101', name: 'Nguyễn Văn An', classId: 'C101', className: 'Lớp 3A1', grade: 3, correct: '5/5', avgTime: '3.2s', warnings: 0, score: 450 },
        { id: 'S102', name: 'Lê Minh Khoa', classId: 'C101', className: 'Lớp 3A1', grade: 3, correct: '4/5', avgTime: '4.1s', warnings: 0, score: 420 },
        { id: 'S103', name: 'Trần Bảo Ngọc', classId: 'C101', className: 'Lớp 3A1', grade: 3, correct: '4/5', avgTime: '4.8s', warnings: 0, score: 390 },
        { id: 'S104', name: 'Phạm Đức Anh', classId: 'C102', className: 'Lớp 1A2', grade: 1, correct: '3/5', avgTime: '5.5s', warnings: 1, score: 310 },
        { id: 'S105', name: 'Hoàng Thùy Linh', classId: 'C103', className: 'Lớp 4A5', grade: 4, correct: '3/5', avgTime: '6.0s', warnings: 0, score: 290 }
    ],

    // --- HỌC LIỆU ÂM NHẠC KNTT (LESSONS & MATERIALS) ---
    lessons: [
        {
            id: 'L101', grade: 1, topic: 'Chủ đề 1: Âm thanh ngày mới', title: 'Tiếng trống trường em', author: 'Trần Thanh Mẫn',
            timeSignature: 'Nhịp 2/4', icon: 'fa-drum', type: 'audio_lesson',
            lyrics: `Có tiếng trống trường / Vang vang khắp nơi / Giục em tới lớp / Rộn rã sắc màu.\n\nTùng tùng tùng tùng / Tiếng trống giục giã / Cho em niềm vui / Bước vào năm học mới!`,
            melody: [
                { note: 'C4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 },
                { note: 'C4', dur: 0.4 }, { note: 'D4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'E4', dur: 0.4 }, { note: 'D4', dur: 0.4 }, { note: 'C4', dur: 1.0 }
            ]
        },
        {
            id: 'L102', grade: 1, topic: 'Chủ đề 2: Ngôi nhà của em', title: 'Mẹ đi vắng', author: 'Trịnh Công Sơn',
            timeSignature: 'Nhịp 2/4', icon: 'fa-house-user', type: 'audio_lesson',
            lyrics: `Mẹ đi vắng, mẹ đi vắng / Con thích ở nhà con ca hát / Con thích ở nhà con nhảy múa.\n\nKhi mẹ về con nhớ mẹ / Mẹ lại ôm con vào lòng thương yêu!`,
            melody: [
                { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 },
                { note: 'D4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.4 },
                { note: 'D4', dur: 0.4 }, { note: 'C4', dur: 1.0 }
            ]
        },
        {
            id: 'L103', grade: 1, topic: 'Chủ đề 3: Thầy cô và mái trường', title: 'Thầy cô là tất cả', author: 'Bùi Anh Tấn',
            timeSignature: 'Nhịp 2/4', icon: 'fa-chalkboard-teacher', type: 'audio_lesson',
            lyrics: `Thầy cô như ánh sáng soi đường / Dạy cho em biết đọc biết viết / Cho em ước mơ bay cao xa vào tương lai rạng ngời!`,
            melody: [
                { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'C5', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'E4', dur: 0.4 }, { note: 'D4', dur: 0.4 }, { note: 'C4', dur: 1.0 }
            ]
        },
        {
            id: 'L104', grade: 1, topic: 'Chủ đề 6: Cảnh đẹp quê hương', title: 'Quê hương tươi đẹp', author: 'Dân ca Nùng',
            timeSignature: 'Nhịp 2/4', icon: 'fa-mountain', type: 'audio_lesson',
            lyrics: `Quê hương em biết bao tươi đẹp / Rừng tre xanh mây trắng bay vờn / Kìa lúa chín vàng trên đồng quê / Vui xóm làng chào mừng mùa xuân!`,
            melody: [
                { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'C5', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 },
                { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 },
                { note: 'D4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'C4', dur: 1.0 }
            ]
        },

        // KHỐI 2
        {
            id: 'L201', grade: 2, topic: 'Chủ đề 1: Sắc màu âm thanh', title: 'Mùa khai trường', author: 'Phan Trần Bảng',
            timeSignature: 'Nhịp 2/4', icon: 'fa-bell', type: 'audio_lesson',
            lyrics: `Mùa thu sang bình minh rạng rỡ / Tiếng cười vui vang khắp sân trường / Cùng nắm tay rộn ràng bước tới / Chào năm học mới ngập tràn niềm tin!`,
            melody: [
                { note: 'D4', dur: 0.4 }, { note: 'F4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'A4', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'F4', dur: 0.8 },
                { note: 'D4', dur: 0.4 }, { note: 'F4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'F4', dur: 0.8 },
                { note: 'D4', dur: 1.0 }
            ]
        },
        {
            id: 'L203', grade: 2, topic: 'Chủ đề 3: Mái trường thân yêu', title: 'Khi tóc thầy bạc trắng', author: 'Trần Đức',
            timeSignature: 'Nhịp 2/4', icon: 'fa-school', type: 'audio_lesson',
            lyrics: `Khi tóc thầy bạc trắng / Tóc thầy bạc như sương / Cho em bài học hay / Mái trường thân yêu...`,
            melody: [
                { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'C5', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 },
                { note: 'D4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.8 }, { note: 'C4', dur: 1.0 }
            ]
        },

        // KHỐI 3
        {
            id: 'L301', grade: 3, topic: 'Chủ đề 1: Lời ca dâng Bác', title: 'Bác Hồ người cho em tất cả', author: 'Hoàng Long - Hoàng Lăng',
            timeSignature: 'Nhịp 2/4', icon: 'fa-heart', type: 'audio_lesson',
            lyrics: `Cho rừng xanh rộn rã tiếng chim ca / Cho đồng quê ngát hương hoa đời / Bác Hồ người cho em tất cả / Ươm mầm xanh cho quê hương Việt Nam tươi đẹp!`,
            melody: [
                { note: 'C4', dur: 0.4 }, { note: 'F4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.8 },
                { note: 'F4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'C5', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'F4', dur: 0.4 }, { note: 'D4', dur: 0.4 }, { note: 'C4', dur: 1.0 }
            ]
        },
        {
            id: 'L303', grade: 3, topic: 'Chủ đề 3: Âm nhạc dân gian', title: 'Lý cây xanh', author: 'Dân ca Nam Bộ',
            timeSignature: 'Nhịp 2/4', icon: 'fa-leaf', type: 'audio_lesson',
            lyrics: `Cái cây xanh xanh / Thì lá cũng xanh / Chim đậu trên cành / Chim hót lý lo / Lý lo là lý lo / Lý lo là lý lo!`,
            melody: [
                { note: 'G4', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'C5', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 }, { note: 'C4', dur: 1.0 }
            ]
        },

        // KHỐI 4
        {
            id: 'L403', grade: 4, topic: 'Chủ đề 3: Giai điệu dân ca', title: 'Inh lả ơi', author: 'Dân ca Thái',
            timeSignature: 'Nhịp 2/4', icon: 'fa-guitar', type: 'audio_lesson',
            lyrics: `Inh lả ơi, sao xáp hoa mương / Khắp núi rừng Tây Bắc bừng sáng / Mùa xuân về hoa nở thắm tươi / Mơ rừng vui tiếng hát ca ngợi!`,
            melody: [
                { note: 'A4', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.8 },
                { note: 'C5', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'D4', dur: 1.0 }
            ]
        },
        {
            id: 'L404', grade: 4, topic: 'Chủ đề 4: Biết ơn thầy cô', title: 'Bụi phấn', author: 'Vũ Hoàng - Lê Văn Lộc',
            timeSignature: 'Nhịp 3/4', icon: 'fa-graduation-cap', type: 'audio_lesson',
            lyrics: `Khi thầy viết bảng / Bụi phấn rơi rơi / Có hạt bụi nào / Rơi trên bục giảng / Có hạt bụi nào / Vướng trên tóc thầy...\n\nEm yêu phút giây này / Thầy em tóc như bạc thêm / Bạc thêm vì phấn trắng / Cho em bài học hay!`,
            melody: [
                { note: 'C4', dur: 0.5 }, { note: 'E4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 1.0 },
                { note: 'G4', dur: 0.5 }, { note: 'E4', dur: 0.5 }, { note: 'D4', dur: 1.0 },
                { note: 'C4', dur: 0.5 }, { note: 'E4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 1.0 },
                { note: 'G4', dur: 0.5 }, { note: 'D4', dur: 0.5 }, { note: 'C4', dur: 1.2 }
            ]
        },

        // KHỐI 5
        {
            id: 'L504', grade: 5, topic: 'Chủ đề 4: Tạm biệt mái trường', title: 'Mong ước kỷ niệm xưa', author: 'Xuân Phương',
            timeSignature: 'Nhịp 4/4', icon: 'fa-star', type: 'audio_lesson',
            lyrics: `Thời gian trôi qua mau / Đã qua rồi những ngày thơ / Giờ đây còn lại đây / Những kỷ niệm mến yêu...\n\nNếu có ước muốn trong cuộc đời này / Hãy nhớ ước muốn cho thời gian trở lại / Để được cùng bạn thân trao nụ cười hồn nhiên!`,
            melody: [
                { note: 'E4', dur: 0.5 }, { note: 'A4', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'B4', dur: 1.0 },
                { note: 'A4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'E4', dur: 1.0 },
                { note: 'A4', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'D5', dur: 1.0 },
                { note: 'C5', dur: 0.5 }, { note: 'B4', dur: 0.5 }, { note: 'A4', dur: 1.2 }
            ]
        }
    ],

    // --- TRÒ CHƠI ÂM NHẠC & CÂU HỎI TRẮC NGHIỆM ---
    teacherQuestions: [
        {
            id: 101, grade: 1, category: 'Thính giác',
            question: 'Nghe âm thanh chuẩn 261.63Hz và xác định tên nốt nhạc:',
            audioSequence: [{ note: 'C4', dur: 0.8 }],
            options: ['Nốt Đồ (C4)', 'Nốt Rê (D4)', 'Nốt Mi (E4)', 'Nốt Sol (G4)'],
            correctIndex: 0
        },
        {
            id: 102, grade: 1, category: 'Tiết tấu',
            question: 'Lắng nghe chuỗi 2 nốt Đồ - Mi và chọn tiết tấu đúng:',
            audioSequence: [{ note: 'C4', dur: 0.5 }, { note: 'E4', dur: 0.5 }],
            options: ['Nhịp 2/4 (Nốt Đồ -> Mi)', 'Nhịp 3/4', 'Nhịp 4/4', 'Dấu lặng'],
            correctIndex: 0
        },
        {
            id: 201, grade: 2, category: 'Đọc nốt',
            question: 'Lắng nghe 3 nốt Đồ - Rê - Mi liên tiếp và xác định thứ tự:',
            audioSequence: [{ note: 'C4', dur: 0.4 }, { note: 'D4', dur: 0.4 }, { note: 'E4', dur: 0.8 }],
            options: ['Đồ -> Rê -> Mi', 'Mi -> Rê -> Đồ', 'Sol -> La -> Si', 'Đồ -> Sol -> Mi'],
            correctIndex: 0
        },
        {
            id: 301, grade: 3, category: 'Thẩm âm',
            question: 'Lắng nghe đoạn 4 nốt giai điệu bài "Lý cây xanh" và nhận biết:',
            audioSequence: [{ note: 'G4', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'A4', dur: 0.8 }],
            options: ['Sol -> Đồ -> Đồ -> La (Dân ca Nam Bộ)', 'Fa -> Sol -> La -> Si', 'Đồ -> Rê -> Mi -> Fa', 'Mi -> Sol -> La -> Si'],
            correctIndex: 0
        },
        {
            id: 401, grade: 4, category: 'Hợp âm / Tiết tấu',
            question: 'Lắng nghe hợp âm 3 nốt Đồ - Mi - Sol (C Major Triad) và chọn đáp án:',
            audioSequence: [{ note: 'C4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.8 }],
            options: ['Hợp âm Đồ Trưởng (C4 - E4 - G4)', 'Hợp âm Thứ', 'Nốt Đơn', 'Khóa Fa'],
            correctIndex: 0
        },
        {
            id: 501, grade: 5, category: 'Thẩm âm nâng cao',
            question: 'Lắng nghe đoạn giai điệu bài "Mong ước kỷ niệm xưa" (E4 - A4 - C5 - B4):',
            audioSequence: [{ note: 'E4', dur: 0.5 }, { note: 'A4', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'B4', dur: 1.0 }],
            options: ['Mi -> La -> Đồ -> Si (Nhịp 4/4)', 'Đồ -> Rê -> Mi -> Fa', 'Sol -> La -> Si -> Do', 'Fa -> Sol -> La -> Si'],
            correctIndex: 0
        }
    ]
};

// --- CÁC HÀM QUẢN LÝ DỮ LIỆU (GET / SAVE / SYNC) ---
function getLocalLMSData() {
    const saved = localStorage.getItem('LMS_PORTAL_DATA');
    if (saved) {
        try { return JSON.parse(saved); } catch(e) {}
    }
    localStorage.setItem('LMS_PORTAL_DATA', JSON.stringify(LMS_DATA));
    return LMS_DATA;
}

function saveLocalLMSData(data) {
    localStorage.setItem('LMS_PORTAL_DATA', JSON.stringify(data));
}

async function getLessonsData() {
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('lessons').select('*');
            if (!error && data && data.length > 0) return data;
        } catch (e) {}
    }
    return getLocalLMSData().lessons;
}

async function getTeacherQuestionsData() {
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('teacher_questions').select('*');
            if (!error && data && data.length > 0) return data;
        } catch (e) {}
    }
    return getLocalLMSData().teacherQuestions;
}

async function getClassesData() {
    return getLocalLMSData().classes;
}

async function getStudentsData() {
    return getLocalLMSData().students;
}

async function getUsersData() {
    return getLocalLMSData().users;
}
