import {media} from './content';
export const imageSlots = [
 {key:'aboutLandscape',group:'about',label:'Ảnh lớn — Câu chuyện Làng',image:media.hero.image,alt:'Những đồi chè nối nhau trong sương tại Long Cốc'},
 {key:'aboutTea',group:'about',label:'Ảnh nhỏ — Câu chuyện Làng',image:media.tea,alt:'Ấm trà gốm xanh, ảnh minh họa'},
 {key:'longCoc',group:'long-coc',label:'Ảnh riêng — Đồi chè Long Cốc',image:media.hero.image,alt:'Đồi chè Long Cốc, Phú Thọ trong ánh nắng sớm'},
 {key:'couples',group:'couples',label:'Ảnh nền — Kỳ nghỉ cho hai',image:media.room,alt:'Không gian gỗ ấm áp, ảnh minh họa cho kỳ nghỉ hai người'},
] as const;
export const linkFields = [
 {key:'headerBooking',group:'header',label:'Đích đến nút đặt phòng trên menu',href:'#booking'},
 {key:'heroBooking',group:'hero',label:'Đích đến nút đặt phòng trên ảnh bìa',href:'#booking'},
 {key:'heroExplore',group:'hero',label:'Đích đến nút khám phá',href:'#about'},
 {key:'heroScroll',group:'hero',label:'Đích đến hướng dẫn cuộn',href:'#about'},
 {key:'roomsEnquiry',group:'rooms',label:'Đích đến nút hỏi phòng trống',href:'#booking'},
 {key:'couplesBooking',group:'couples',label:'Đích đến nút kỳ nghỉ cho hai',href:'#booking'},
 {key:'longCocMap',group:'long-coc',label:'Liên kết bản đồ Long Cốc',href:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Đồi chè Long Cốc Phú Thọ')},
 {key:'footerRooms',group:'footer',label:'Liên kết phòng nghỉ cuối trang',href:'#rooms'},
 {key:'footerExperiences',group:'footer',label:'Liên kết trải nghiệm cuối trang',href:'#experiences'},
 {key:'footerLongCoc',group:'footer',label:'Liên kết Long Cốc cuối trang',href:'#long-coc'},
] as const;
export const navigationDefaults=[{label:'Câu chuyện Làng',href:'#about'},{label:'Trải nghiệm',href:'#experiences'},{label:'Ở tại Làng',href:'#rooms'},{label:'Tìm đường',href:'#location'}];
