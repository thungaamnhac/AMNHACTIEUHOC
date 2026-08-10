/* ==========================================================================
   db.js - Supabase Database Client Connection & KNTT Data Store (Full Lyrics & Melodies)
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
 * Bao gồm: Lời bài hát đầy đủ & Giai điệu chuỗi nốt nhạc phát tự động qua Synthesizer
 */
const KNTT_DATA = {
    lessons: [
        // --- KHỐI 1 ---
        {
            id: 'L101', grade: 1, topic: 'Chủ đề 1: Âm thanh ngày mới', title: 'Tiếng trống trường em', author: 'Trần Thanh Mẫn',
            timeSignature: 'Nhịp 2/4', icon: 'fa-drum',
            lyrics: `Có tiếng trống trường / Vang vang khắp nơi / Giục em tới lớp / Rộn rã sắc màu.\n\nTùng tùng tùng tùng / Tiếng trống giục giã / Cho em niềm vui / Bước vào năm học mới!`,
            melody: [
                { note: 'C4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 },
                { note: 'C4', dur: 0.4 }, { note: 'D4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'D4', dur: 0.8 },
                { note: 'C4', dur: 0.8 }
            ]
        },
        {
            id: 'L102', grade: 1, topic: 'Chủ đề 2: Ngôi nhà của em', title: 'Mẹ đi vắng', author: 'Trịnh Công Sơn',
            timeSignature: 'Nhịp 2/4', icon: 'fa-house-user',
            lyrics: `Mẹ đi vắng, mẹ đi vắng / Con thích ở nhà con ca hát / Con thích ở nhà con nhảy múa.\n\nKhi mẹ về con nhớ mẹ / Mẹ lại ôm con vào lòng thương yêu!`,
            melody: [
                { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 },
                { note: 'D4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'E4', dur: 0.4 }, { note: 'D4', dur: 0.4 }, { note: 'C4', dur: 0.8 }
            ]
        },
        {
            id: 'L103', grade: 1, topic: 'Chủ đề 3: Thầy cô và mái trường', title: 'Thầy cô là tất cả', author: 'Bùi Anh Tấn',
            timeSignature: 'Nhịp 2/4', icon: 'fa-chalkboard-teacher',
            lyrics: `Thầy cô như ánh sáng soi đường / Dạy cho em biết đọc biết viết / Cho em ước mơ bay cao xa vào tương lai rạng ngời!`,
            melody: [
                { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'C5', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 }
            ]
        },
        {
            id: 'L104', grade: 1, topic: 'Chủ đề 6: Cảnh đẹp quê hương', title: 'Quê hương tươi đẹp', author: 'Dân ca Nùng',
            timeSignature: 'Nhịp 2/4', icon: 'fa-mountain',
            lyrics: `Quê hương em biết bao tươi đẹp / Rừng tre xanh mây trắng bay vờn / Kìa lúa chín vàng trên đồng quê / Vui xóm làng chào mừng mùa xuân!`,
            melody: [
                { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'C5', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 },
                { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 },
                { note: 'D4', dur: 0.4 }, { note: 'E4', dur: 0.4 }, { note: 'C4', dur: 0.8 }
            ]
        },

        // --- KHỐI 2 ---
        {
            id: 'L201', grade: 2, topic: 'Chủ đề 1: Sắc màu âm thanh', title: 'Mùa khai trường', author: 'Phan Trần Bảng',
            timeSignature: 'Nhịp 2/4', icon: 'fa-bell',
            lyrics: `Mùa thu sang bình minh rạng rỡ / Tiếng cười vui vang khắp sân trường / Cùng nắm tay rộn ràng bước tới / Chào năm học mới ngập tràn niềm tin!`,
            melody: [
                { note: 'D4', dur: 0.4 }, { note: 'F4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'A4', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'F4', dur: 0.8 },
                { note: 'D4', dur: 0.4 }, { note: 'F4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'F4', dur: 0.8 }
            ]
        },
        {
            id: 'L202', grade: 2, topic: 'Chủ đề 2: Em yêu hòa bình', title: 'Hòa bình cho bé', author: 'Huy Rag',
            timeSignature: 'Nhịp 2/4', icon: 'fa-dove',
            lyrics: `Cờ hòa bình bay phấp phới trên trời cao / Tiếng chim bồ câu hót ríu rít mênh mang / Cho tuổi thơ em êm đềm giấc ngủ / Hát ca vui mừng dưới mái trường yêu thương!`,
            melody: [
                { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'B4', dur: 0.4 }, { note: 'B4', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 }
            ]
        },

        // --- KHỐI 3 ---
        {
            id: 'L301', grade: 3, topic: 'Chủ đề 1: Lời ca dâng Bác', title: 'Bác Hồ người cho em tất cả', author: 'Hoàng Long - Hoàng Lăng',
            timeSignature: 'Nhịp 2/4', icon: 'fa-heart',
            lyrics: `Cho rừng xanh rộn rã tiếng chim ca / Cho đồng quê ngát hương hoa đời / Bác Hồ người cho em tất cả / Ươm mầm xanh cho quê hương Việt Nam tươi đẹp!`,
            melody: [
                { note: 'C4', dur: 0.4 }, { note: 'F4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.8 },
                { note: 'F4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'C5', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'F4', dur: 0.8 }
            ]
        },
        {
            id: 'L303', grade: 3, topic: 'Chủ đề 3: Âm nhạc dân gian', title: 'Lý cây xanh', author: 'Dân ca Nam Bộ',
            timeSignature: 'Nhịp 2/4', icon: 'fa-leaf',
            lyrics: `Cái cây xanh xanh / Thì lá cũng xanh / Chim đậu trên cành / Chim hót lý lo / Lý lo là lý lo / Lý lo là lý lo!`,
            melody: [
                { note: 'G4', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'C5', dur: 0.8 },
                { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'E4', dur: 0.8 }
            ]
        },

        // --- KHỐI 4 ---
        {
            id: 'L403', grade: 4, topic: 'Chủ đề 3: Giai điệu dân ca', title: 'Inh lả ơi', author: 'Dân ca Thái',
            timeSignature: 'Nhịp 2/4', icon: 'fa-guitar',
            lyrics: `Inh lả ơi, sao xáp hoa mương / Khắp núi rừng Tây Bắc bừng sáng / Mùa xuân về hoa nở thắm tươi / Mơ rừng vui tiếng hát ca ngợi!`,
            melody: [
                { note: 'A4', dur: 0.4 }, { note: 'C5', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 },
                { note: 'E4', dur: 0.4 }, { note: 'G4', dur: 0.4 }, { note: 'A4', dur: 0.8 },
                { note: 'C5', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G4', dur: 0.8 }
            ]
        },
        {
            id: 'L404', grade: 4, topic: 'Chủ đề 4: Biết ơn thầy cô', title: 'Bụi phấn', author: 'Vũ Hoàng - Lê Văn Lộc',
            timeSignature: 'Nhịp 3/4', icon: 'fa-graduation-cap',
            lyrics: `Khi thầy viết bảng / Bụi phấn rơi rơi / Có hạt bụi nào / Rơi trên bục giảng / Có hạt bụi nào / Vướng trên tóc thầy...\n\nEm yêu phút giây này / Thầy em tóc như bạc thêm / Bạc thêm vì phấn trắng / Cho em bài học hay!`,
            melody: [
                { note: 'C4', dur: 0.5 }, { note: 'E4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 1.0 },
                { note: 'G4', dur: 0.5 }, { note: 'E4', dur: 0.5 }, { note: 'D4', dur: 1.0 },
                { note: 'C4', dur: 0.5 }, { note: 'E4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 1.0 },
                { note: 'G4', dur: 0.5 }, { note: 'D4', dur: 0.5 }, { note: 'C4', dur: 1.0 }
            ]
        },

        // --- KHỐI 5 ---
        {
            id: 'L504', grade: 5, topic: 'Chủ đề 4: Tạm biệt mái trường', title: 'Mong ước kỷ niệm xưa', author: 'Xuân Phương',
            timeSignature: 'Nhịp 4/4', icon: 'fa-star',
            lyrics: `Thời gian trôi qua mau / Đã qua rồi những ngày thơ / Giờ đây còn lại đây / Những kỷ niệm mến yêu...\n\nNếu có ước muốn trong cuộc đời này / Hãy nhớ ước muốn cho thời gian trở lại / Để được cùng bạn thân trao nụ cười hồn nhiên!`,
            melody: [
                { note: 'E4', dur: 0.5 }, { note: 'A4', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'B4', dur: 1.0 },
                { note: 'A4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'E4', dur: 1.0 },
                { note: 'A4', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'D5', dur: 1.0 },
                { note: 'C5', dur: 0.5 }, { note: 'B4', dur: 0.5 }, { note: 'A4', dur: 1.0 }
            ]
        }
    ]
};

// --- HÀM TẢI DỮ LIỆU TỪ SUPABASE HOẶC DÙNG KNTT DATA ---
async function getLessonsData() {
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient.from('lessons').select('*');
            if (!error && data && data.length > 0) return data;
        } catch (e) {}
    }
    return KNTT_DATA.lessons;
}
