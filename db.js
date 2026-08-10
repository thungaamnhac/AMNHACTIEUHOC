/* ==========================================================================
   db.js - Supabase Database Client Connection & KNTT Data Store
   Dự án: Hệ Thống Học Tập Âm Nhạc Khối 1-5 (Bộ sách Kết Nối Tri Thức Với Cuộc Sống)
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
 * DỮ LIỆU CHUẨN ÂM NHẠC KHỐI 1 - 5 (BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
 */
const KNTT_DATA = {
    // --- DÂN DANH SÁCH BÀI HỌC THEO KHỐI (KNTT) ---
    lessons: [
        // KHỐI 1
        { id: 'L101', grade: 1, topic: 'Chủ đề 1: Âm thanh ngày mới', title: 'Hát: Tiếng trống trường em', author: 'Trần Thanh Mẫn', note: 'Đồ - Rê - Mi', icon: 'fa-drum' },
        { id: 'L102', grade: 1, topic: 'Chủ đề 2: Ngôi nhà của em', title: 'Hát: Mẹ đi vắng', author: 'Trịnh Công Sơn', note: 'Sol - La', icon: 'fa-house-user' },
        { id: 'L103', grade: 1, topic: 'Chủ đề 3: Thầy cô và mái trường', title: 'Hát: Thầy cô là tất cả', author: 'Bùi Anh Tấn', note: 'Mi - Sol - La', icon: 'fa-chalkboard-teacher' },
        { id: 'L104', grade: 1, topic: 'Chủ đề 4: Chú chim nhỏ', title: 'Hát: Chú nốt nhạc vui', author: 'Hoàng Long', note: 'Đồ - Rê - Mi - Sol', icon: 'fa-crow' },
        { id: 'L105', grade: 1, topic: 'Chủ đề 5: Mùa xuân quê hương', title: 'Hát: Sắp đến Tết rồi', author: 'Hoàng Vân', note: 'Gõ đệm Thanh phách', icon: 'fa-sun' },
        { id: 'L106', grade: 1, topic: 'Chủ đề 6: Cảnh đẹp quê hương', title: 'Hát: Quê hương tươi đẹp', author: 'Dân ca Nùng', note: 'Tập đọc nốt Sol-Mi', icon: 'fa-mountain' },

        // KHỐI 2
        { id: 'L201', grade: 2, topic: 'Chủ đề 1: Sắc màu âm thanh', title: 'Hát: Mùa khai trường', author: 'Phan Trần Bảng', note: 'Đồ - Rê - Mi - Sol - La', icon: 'fa-bell' },
        { id: 'L202', grade: 2, topic: 'Chủ đề 2: Em yêu hòa bình', title: 'Hát: Hòa bình cho bé', author: 'Huy Rag', note: 'Nhịp 2/4 - Phách mạnh nhẹ', icon: 'fa-dove' },
        { id: 'L203', grade: 2, topic: 'Chủ đề 3: Mái trường thân yêu', title: 'Hát: Khi tóc thầy bạc trắng', author: 'Trần Đức', note: 'Tập đọc nốt Mi - Sol - La', icon: 'fa-school' },
        { id: 'L204', grade: 2, topic: 'Chủ đề 4: Tuổi thơ khám phá', title: 'Hát: Món quà tặng cô', author: 'Nguyễn Văn Hiên', note: 'Gõ Song loan', icon: 'fa-gift' },
        { id: 'L205', grade: 2, topic: 'Chủ đề 5: Âm nhạc nước ngoài', title: 'Hát: Chú cuội chơi trăng', author: 'Dân ca', note: 'Nốt Trắng & Nốt Đen', icon: 'fa-moon' },

        // KHỐI 3
        { id: 'L301', grade: 3, topic: 'Chủ đề 1: Lời ca dâng Bác', title: 'Hát: Bác Hồ người cho em tất cả', author: 'Hoàng Long - Hoàng Lăng', note: 'Tập đọc nốt C4-D4-E4-G4-A4', icon: 'fa-heart' },
        { id: 'L302', grade: 3, topic: 'Chủ đề 2: Vui bước đến trường', title: 'Hát: Bài học đầu tiên', author: 'Trương Xuân Mẫn', note: 'Hình nốt Đen, Trắng, Lặng đen', icon: 'fa-book-open' },
        { id: 'L303', grade: 3, topic: 'Chủ đề 3: Âm nhạc dân gian', title: 'Hát: Lý cây xanh', author: 'Dân ca Nam Bộ', note: 'Nhạc cụ: Đàn Tranh, Trống cơm', icon: 'fa-leaf' },
        { id: 'L304', grade: 3, topic: 'Chủ đề 4: Giai điệu quê hương', title: 'Hát: Cò hại', author: 'Dân ca Bắc Bộ', note: 'Tập đọc nhạc số 1 - Khóa Sol', icon: 'fa-feather' },

        // KHỐI 4
        { id: 'L401', grade: 4, topic: 'Chủ đề 1: Rộn ràng ngày mới', title: 'Hát: Tiếng hát mùa hoa', author: 'Nhiều tác giả', note: 'Thực hành Đàn Recorder / Melodica', icon: 'fa-music' },
        { id: 'L402', grade: 4, topic: 'Chủ đề 2: Tình bạn bốn phương', title: 'Hát: Thiếu nhi thế giới liên hoan', author: 'Lưu Hữu Phước', note: 'Nhịp 2/4 - Nốt Móc đơn', icon: 'fa-users' },
        { id: 'L403', grade: 4, topic: 'Chủ đề 3: Giai điệu dân ca', title: 'Hát: Inh lả ơi', author: 'Dân ca Thái', note: 'Tập đọc nhạc số 3 - Nốt Si (B4)', icon: 'fa-guitar' },
        { id: 'L404', grade: 4, topic: 'Chủ đề 4: Biết ơn thầy cô', title: 'Hát: Bụi phấn', author: 'Vũ Hoàng - Lê Văn Lộc', note: 'Nhịp 3/4 - Phách M-N-N', icon: 'fa-graduation-cap' },

        // KHỐI 5
        { id: 'L501', grade: 5, topic: 'Chủ đề 1: Nhớ ơn thầy cô', title: 'Hát: Bài ca người giáo viên nhân dân', author: 'Hoàng Vân', note: 'Khóa Sol - Nhịp 4/4 - Bè đơn giản', icon: 'fa-award' },
        { id: 'L502', grade: 5, topic: 'Chủ đề 2: Quê hương đất nước', title: 'Hát: Hát mừng', author: 'Dân ca Hrê', note: 'Thực hànhRecorder hợp xướng', icon: 'fa-flag' },
        { id: 'L503', grade: 5, topic: 'Chủ đề 3: Âm nhạc thế giới', title: 'Thường thức: Nhà soạn nhạc Mozart & Beethoven', author: 'Âm nhạc cổ điển', note: 'Cảm thụ âm nhạc & Thính giác', icon: 'fa-compact-disc' },
        { id: 'L504', grade: 5, topic: 'Chủ đề 4: Tạm biệt mái trường', title: 'Hát: Mong ước kỷ niệm xưa', author: 'Xuân Phương', note: 'Ôn tập tổng hợp Khối 1-5', icon: 'fa-star' }
    ],

    // --- BÀI HẤT NỔI BẬT ---
    songs: [
        { title: 'Tiếng trống trường em', author: 'Trần Thanh Mẫn', grade: 'Khối 1', keyNote: 'C4 - E4 - G4', audioNote: 'C4' },
        { title: 'Quê hương tươi đẹp', author: 'Dân ca Nùng', grade: 'Khối 1', keyNote: 'G4 - A4 - C5', audioNote: 'G4' },
        { title: 'Mùa khai trường', author: 'Phan Trần Bảng', grade: 'Khối 2', keyNote: 'D4 - F4 - A4', audioNote: 'D4' },
        { title: 'Hòa bình cho bé', author: 'Huy Rag', grade: 'Khối 2', keyNote: 'E4 - G4 - B4', audioNote: 'E4' },
        { title: 'Bác Hồ người cho em tất cả', author: 'Hoàng Long - Hoàng Lăng', grade: 'Khối 3', keyNote: 'C4 - F4 - G4', audioNote: 'C4' },
        { title: 'Lý cây xanh', author: 'Dân ca Nam Bộ', grade: 'Khối 3', keyNote: 'G4 - C5', audioNote: 'G4' },
        { title: 'Inh lả ơi', author: 'Dân ca Thái', grade: 'Khối 4', keyNote: 'A4 - C5', audioNote: 'A4' },
        { title: 'Bụi phấn', author: 'Vũ Hoàng', grade: 'Khối 4', keyNote: 'C4 - E4 - A4', audioNote: 'C4' },
        { title: 'Hát mừng', author: 'Dân ca Hrê', grade: 'Khối 5', keyNote: 'D4 - G4 - A4', audioNote: 'D4' },
        { title: 'Mong ước kỷ niệm xưa', author: 'Xuân Phương', grade: 'Khối 5', keyNote: 'E4 - A4 - C5', audioNote: 'E4' }
    ],

    // --- VIDEO BÀI GIẢNG ---
    videos: [
        { title: 'Hướng dẫn luyện đọc nốt nhạc Khối 1 (Đồ - Rê - Mi)', duration: '08:45', grade: 'Khối 1', views: '1,240' },
        { title: 'Thực hành gõ đệm Song Loan & Thanh Phách Khối 2', duration: '12:10', grade: 'Khối 2', views: '2,150' },
        { title: 'Phương pháp nhận biết giai điệu Dân ca Nam Bộ Khối 3', duration: '15:30', grade: 'Khối 3', views: '1,890' },
        { title: 'Thực hành bấm ngón Đàn Recorder / Melodica Khối 4', duration: '18:20', grade: 'Khối 4', views: '3,410' },
        { title: 'Khám phá thế giới Âm nhạc cổ điển Mozart & Beethoven Khối 5', duration: '22:00', grade: 'Khối 5', views: '4,120' }
    ]
};

// --- HÀM TẢI DỮ LIỆU TỪ SUPABASE HOẶC DÙNG KNTT DATA ---
async function getLessonsData() {
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('lessons').select('*');
            if (!error && data && data.length > 0) return data;
        } catch (e) {
            console.log('Lấy dữ liệu từ Supabase chưa có, dùng dữ liệu KNTT chuẩn.');
        }
    }
    return KNTT_DATA.lessons;
}

async function getSongsData() {
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('songs').select('*');
            if (!error && data && data.length > 0) return data;
        } catch (e) {}
    }
    return KNTT_DATA.songs;
}

async function getVideosData() {
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('videos').select('*');
            if (!error && data && data.length > 0) return data;
        } catch (e) {}
    }
    return KNTT_DATA.videos;
}
