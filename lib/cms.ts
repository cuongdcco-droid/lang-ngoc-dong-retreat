import {imageSlots,linkFields,navigationDefaults} from './cms-options';
import { media, rooms, scenes, gallery, address } from './content';
import fields from './cms-fields.json';
import experiences from './cms-experiences.json';
export { fields };
export const sectionNames: Record<string,string> = {hero:'Ảnh bìa & lời chào',about:'Câu chuyện Làng',experiences:'Trải nghiệm',rooms:'Phòng nghỉ & giá',story:'Một ngày ở Làng','long-coc':'Đồi chè Long Cốc',couples:'Kỳ nghỉ cho hai',gallery:'Thư viện ảnh',reviews:'Cảm nhận',location:'Vị trí & chỉ đường',booking:'Liên hệ đặt phòng',header:'Đầu trang',footer:'Cuối trang',general:'Điều hướng'};
export const sectionOrder = ['hero','about','experiences','rooms','story','long-coc','couples','gallery','reviews','location','booking'];
export const defaultContent = {schemaVersion:2,heroAlt:'Sương sớm trên những đồi chè xanh Long Cốc',copy:Object.fromEntries(fields.map(f=>[f.key,f.value])) as Record<string,string>,media,
 images:Object.fromEntries(imageSlots.map(f=>[f.key,{image:f.image,alt:f.alt}])) as Record<string,{image:string;alt:string}>,
 links:Object.fromEntries(linkFields.map(f=>[f.key,f.href])) as Record<string,string>,
 navigation:navigationDefaults,
 rooms:rooms.map(r=>({...r,alt:r.name+', ảnh phòng minh họa',ctaLabel:'Hỏi phòng',ctaHref:'#booking'})),
 scenes:scenes.map(r=>({...r,alt:r.title,navLabel:r.time.split(' · ')[1]||r.time,credit:r.illustrative?'Khung cảnh minh họa cho hành trình':'Đồi chè Long Cốc · Ảnh Nguyen Trong Quyet'})),
 gallery,address,experiences,cta:{href:'#booking'},contact:{phone:'0965 163 291',zalo:'https://zalo.me/0965163291'},order:sectionOrder};
export type SiteContent = typeof defaultContent;
export type Snapshot = {draft:SiteContent;published:SiteContent;publishedAt:string|null};
export interface ContentRepository {load():Promise<Snapshot>;saveDraft(content:SiteContent):Promise<void>;publish(content:SiteContent):Promise<void>;}
export interface AssetStorage {upload(file:File):Promise<string>;}
export interface AdminAuth {getSession():Promise<{mode:'local';label:string}|null>;}
export const freshContent=():SiteContent=>JSON.parse(JSON.stringify(defaultContent));
export function safeLink(value:string){return /^(#[\w-]*|\/(?!\/)[^\\]*|https:\/\/[^\s]+|tel:\+?[\d\s-]+|mailto:[^\s]+)$/i.test(value);}
export function safeImage(value:string){return /^(\/media\/[^\\]*|https:\/\/[^\s]+|data:image\/(jpeg|png|webp);base64,[a-z0-9+/=]+)$/i.test(value);}
export function validateContent(c:SiteContent){
 if(c.schemaVersion!==2||!c.copy||!c.media||!Array.isArray(c.order)||c.order.length!==sectionOrder.length||new Set(c.order).size!==sectionOrder.length||sectionOrder.some(id=>!c.order.includes(id))||c.order[0]!=='hero')throw new Error('Bố cục không hợp lệ. Ảnh bìa cần ở đầu trang.');
 if(fields.some(f=>typeof c.copy[f.key]!=='string')||Object.values(c.copy).some(v=>v.length>5000))throw new Error('Nội dung không hợp lệ hoặc quá dài (tối đa 5.000 ký tự mỗi trường).');
 if(!/^[+\d ()-]{6,24}$/.test(c.contact.phone)||!/^https:\/\/[^\s]+$/.test(c.contact.zalo))throw new Error('Số điện thoại hoặc liên kết Zalo không hợp lệ.');
 if([...Object.values(c.links),...c.navigation.map(n=>n.href),...c.rooms.map(r=>r.ctaHref)].some(v=>!safeLink(v))||!safeLink(c.cta.href))throw new Error('Liên kết CTA cần dùng #section, đường dẫn nội bộ, https, tel hoặc mailto.');
 if(c.rooms.length!==rooms.length||c.scenes.length!==scenes.length||c.gallery.length!==gallery.length||c.experiences.length!==experiences.length)throw new Error('Danh sách nội dung không đúng cấu trúc.');
 const images=[...Object.values(c.images).map(r=>r.image),c.media.hero.image,c.media.tea,c.media.room,c.media.pool,...c.rooms.map(r=>r.image),...c.scenes.map(s=>s.image),...c.gallery.map(g=>g.src)];
 if(images.some(v=>!safeImage(v)))throw new Error('Ảnh cần là file đã tải lên, ảnh có sẵn hoặc liên kết HTTPS.');
}

// Upgrade v1 in memory, keeping the original browser entry untouched until an explicit save.
export function migrateContent(input:unknown):SiteContent {
 if(!input||typeof input!=='object')throw new Error('Thiếu dữ liệu nội dung.');
 const old=input as SiteContent;
 if(old.schemaVersion===2){validateContent(old);return old;}
 if(old.schemaVersion!==1)throw new Error('Phiên bản nội dung chưa được hỗ trợ.');
 const next=freshContent();
 Object.assign(next,old,{schemaVersion:2});
 next.copy={...defaultContent.copy,...old.copy};
 next.images={
 aboutLandscape:{image:old.media.hero.image,alt:defaultContent.images.aboutLandscape.alt},
 aboutTea:{image:old.media.tea,alt:defaultContent.images.aboutTea.alt},
 longCoc:{image:old.media.hero.image,alt:defaultContent.images.longCoc.alt},
 couples:{image:old.media.room,alt:defaultContent.images.couples.alt}};
 next.links={...defaultContent.links};
 for(const key of ['headerBooking','heroBooking','roomsEnquiry','couplesBooking'])next.links[key]=old.cta.href;
 next.navigation=JSON.parse(JSON.stringify(navigationDefaults));
 next.rooms=old.rooms.map(r=>({...r,alt:r.name+(r.illustrative?', ảnh phòng minh họa':''),ctaLabel:old.copy.rooms_7||'Hỏi phòng',ctaHref:old.cta.href}));
 next.scenes=old.scenes.map(r=>({...r,alt:r.title,navLabel:r.time.split(' · ')[1]||r.time,credit:r.illustrative?'Khung cảnh minh họa cho hành trình':'Đồi chè Long Cốc · Ảnh Nguyen Trong Quyet'}));
 validateContent(next);return next;
}
