export type Scene = { id: string; time: string; title: string; text: string; image: string; video?: string; position?: string; tone?: string; illustrative: boolean };
export const media = {
 hero: { image: '/media/long-coc.jpg', video: '', webm: '' },
 tea: '/media/tea-reference.jpg', room: '/media/wooden-room-reference.jpg', pool: '/media/pool-reference.jpg',
};
export const scenes: Scene[] = [
 { id:'dawn', time:'05:30 · BÌNH MINH', title:'Khi sương còn chưa thức.', text:'Những đồi chè hiện dần trong ánh sáng đầu ngày. Chậm một chút, để nhìn rõ hơn.', image:media.hero.image, illustrative:false },
 { id:'tea', time:'07:00 · ĐỒI CHÈ', title:'Đi giữa một màu xanh.', text:'Theo lối nhỏ giữa những luống chè Long Cốc. Buổi sáng, chỉ cần thế thôi.', image:media.hero.image, position:'center bottom', illustrative:false },
 { id:'arrival', time:'10:00 · VỀ LÀNG', title:'Đặt xuống những vội vàng.', text:'Một chỗ ngồi, một tách trà. Bắt đầu ngày nghỉ bằng những điều giản dị.', image:media.tea, illustrative:true },
 { id:'pool', time:'15:00 · THẢNH THƠI', title:'Một buổi chiều thật nhẹ.', text:'Dành một khoảng thời gian bên mặt nước. Không cần một lịch trình quá đầy.', image:media.pool, illustrative:true },
 { id:'sunset', time:'17:30 · HOÀNG HÔN', title:'Giữ lại một chút nắng.', text:'Ngồi thêm một lát, kể thêm một câu chuyện. Để ngày trôi qua thật chậm.', image:media.hero.image, tone:'sunset', illustrative:true },
 { id:'night', time:'20:00 · ĐÊM XUỐNG', title:'Ngày khép lại. Mình gần hơn.', text:'Khép lại một ngày bằng ánh đèn ấm và một giấc ngủ không hẹn giờ.', image:media.room, tone:'night', illustrative:true },
];
export const rooms = [
 {name:'Một căn phòng cho hai',tag:'CHO NHỮNG NGÀY BÊN NHAU',text:'Gợi ý không gian riêng tư, chất liệu gỗ và ánh sáng dịu.',image:media.room,capacity:'Đang cập nhật sức chứa',price:'Liên hệ báo giá',illustrative:true},
 {name:'Một khoảng riêng cho gia đình',tag:'CÙNG NHAU VỀ LÀNG',text:'Gợi ý nơi nghỉ cho chuyến đi có thêm những người thân yêu.',image:media.room,capacity:'Đang cập nhật sức chứa',price:'Liên hệ báo giá',illustrative:true},
];
export const gallery = [
 {src:media.hero.image,alt:'Sương sớm trên đồi chè Long Cốc',caption:'Long Cốc · Sương trên đồi chè',illustrative:false},
 {src:media.tea,alt:'Ấm trà xanh bằng gốm trên bàn gỗ',caption:'Một buổi sáng bên tách trà',illustrative:true},
 {src:media.pool,alt:'Hồ bơi giữa cây xanh, ảnh tham khảo tại Ubud',caption:'Một khoảng xanh bên mặt nước',illustrative:true},
 {src:media.room,alt:'Phòng ngủ chất liệu gỗ, ảnh minh họa',caption:'Sắc gỗ, ánh sáng và sự bình yên',illustrative:true},
];
export const address='Ngọc Đồng – Thục Luyện – Thanh Sơn – Phú Thọ';
export const mapQuery=encodeURIComponent('Ngọc Đồng, Thục Luyện, Thanh Sơn, Phú Thọ, Việt Nam');
