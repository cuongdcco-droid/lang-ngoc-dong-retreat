import {imageSlots,linkFields,navigationDefaults} from './cms-options';
import { media, rooms, scenes, gallery, address } from './content';
import fields from './cms-fields.json';
import experiences from './cms-experiences.json';
export { fields };
export const sectionNames: Record<string,string> = {hero:'Ảnh bìa & lời chào',about:'Câu chuyện Làng',experiences:'Trải nghiệm',rooms:'Phòng nghỉ & giá',story:'Một ngày ở Làng','long-coc':'Đồi chè Long Cốc',couples:'Kỳ nghỉ cho hai',gallery:'Thư viện ảnh',reviews:'Cảm nhận',location:'Vị trí & chỉ đường',booking:'Liên hệ đặt phòng',header:'Đầu trang',footer:'Cuối trang',general:'Hướng dẫn & sao lưu',blog:'Bài viết / Blog',seo:'SEO toàn website'};
export const sectionOrder = ['hero','about','experiences','rooms','story','long-coc','couples','gallery','reviews','location','booking'];
export const defaultContent = {schemaVersion:3,heroAlt:'Sương sớm trên những đồi chè xanh Long Cốc',copy:Object.fromEntries(fields.map(f=>[f.key,f.value])) as Record<string,string>,media,
 images:Object.fromEntries(imageSlots.map(f=>[f.key,{image:f.image,alt:f.alt}])) as Record<string,{image:string;alt:string}>,
 links:Object.fromEntries(linkFields.map(f=>[f.key,f.href])) as Record<string,string>,
 navigation:navigationDefaults,
 rooms:rooms.map(r=>({...r,amenities:'',alt:r.name+', ảnh phòng minh họa',ctaLabel:'Hỏi phòng',ctaHref:'#booking'})),
 scenes:scenes.map(r=>({...r,alt:r.title,navLabel:r.time.split(' · ')[1]||r.time,credit:r.illustrative?'Khung cảnh minh họa cho hành trình':'Đồi chè Long Cốc · Ảnh Nguyen Trong Quyet'})),
 gallery,address,experiences,cta:{href:'#booking'},contact:{phone:'0965 163 291',zalo:'https://zalo.me/0965163291',facebook:'',googleMaps:'',booking:'',whatsapp:''},order:sectionOrder,seo:{title:'Làng Sinh Thái Ngọc Đồng | Nghỉ dưỡng tại Thanh Sơn',description:'Làng Sinh Thái Ngọc Đồng tại Ngọc Đồng – Thục Luyện – Thanh Sơn – Phú Thọ. Liên hệ đặt phòng: 0965163291.',siteUrl:'https://lang-ngoc-dong-retreat.cuongdc21.chatgpt.site',shareImage:media.hero.image},posts:[] as BlogPost[]};
export type BlogPost={id:string;title:string;slug:string;excerpt:string;body:string;image:string;alt:string;seoTitle:string;metaDescription:string;published:boolean;date:string};
export type SiteContent = typeof defaultContent;
export type Snapshot = {draft:SiteContent;published:SiteContent;publishedAt:string|null;revision:number};
export interface ContentRepository {load():Promise<Snapshot>;saveDraft(content:SiteContent):Promise<void>;publish(content:SiteContent):Promise<void>;}
export interface AssetStorage {upload(file:File):Promise<string>;}
export interface AdminAuth {getSession():Promise<{mode:'server';label:string}|null>;}
export const freshContent=():SiteContent=>JSON.parse(JSON.stringify(defaultContent));
export function safeLink(value:string){return /^(#[\w-]*|\/(?!\/)[^\\]*|https:\/\/[^\s]+|tel:\+?[\d\s-]+|mailto:[^\s]+)$/i.test(value);}
export function safeImage(value:string){return /^(\/(?:media|uploads)\/[^\\]*|https:\/\/[^\s]+|data:image\/(jpeg|png|webp);base64,[a-z0-9+/=]+)$/i.test(value);}
export function validateContent(c:SiteContent){
 checkShape(c,defaultContent);
 if(c.schemaVersion!==3||!c.copy||!c.media||!Array.isArray(c.order)||c.order.length!==sectionOrder.length||new Set(c.order).size!==sectionOrder.length||sectionOrder.some(id=>!c.order.includes(id))||c.order[0]!=='hero')throw new Error('Bố cục không hợp lệ. Ảnh bìa cần ở đầu trang.');
 if(fields.some(f=>typeof c.copy[f.key]!=='string')||Object.values(c.copy).some(v=>v.length>5000))throw new Error('Nội dung không hợp lệ hoặc quá dài (tối đa 5.000 ký tự mỗi trường).');
 if(!/^[+\d ()-]{6,24}$/.test(c.contact.phone)||!/^https:\/\/[^\s]+$/.test(c.contact.zalo))throw new Error('Số điện thoại hoặc liên kết Zalo không hợp lệ.');
 if([...Object.values(c.links),...c.navigation.map(n=>n.href),...c.rooms.map(r=>r.ctaHref)].some(v=>!safeLink(v))||!safeLink(c.cta.href))throw new Error('Liên kết CTA cần dùng #section, đường dẫn nội bộ, https, tel hoặc mailto.');
 if(c.rooms.length>50||c.scenes.length!==scenes.length||c.gallery.length>100||c.experiences.length>50||c.posts.length>100||c.navigation.length>12)throw new Error('Danh sách nội dung không đúng cấu trúc.');
 const images=[...Object.values(c.images).map(r=>r.image),c.media.hero.image,c.media.tea,c.media.room,c.media.pool,...c.rooms.map(r=>r.image),...c.scenes.map(s=>s.image),...c.gallery.map(g=>g.src),c.seo.shareImage,...c.posts.filter(p=>p.image).map(p=>p.image)];
 if(images.some(v=>!safeImage(v)))throw new Error('Ảnh cần là file đã tải lên, ảnh có sẵn hoặc liên kết HTTPS.');
 if(Object.entries(c.contact).some(([k,v])=>!['phone','zalo'].includes(k)&&v&&!/^https:\/\/[^\s]+$/.test(v)))throw new Error('Liên kết liên hệ phải bắt đầu bằng https:// hoặc để trống.');
 if(!/^https:\/\/[^\s]+$/.test(c.seo.siteUrl)||new URL(c.seo.siteUrl).pathname!=='/'||new URL(c.seo.siteUrl).search||new URL(c.seo.siteUrl).hash)throw new Error('Tên miền SEO cần là https://ten-mien, không kèm đường dẫn.');
 if(!c.seo.title.trim()||!c.seo.description.trim())throw new Error('Vui lòng điền tiêu đề và mô tả SEO.');
 const slugs=new Set<string>();
 for(const post of c.posts){checkShape(post,{id:'',title:'',slug:'',excerpt:'',body:'',image:'',alt:'',seoTitle:'',metaDescription:'',published:false,date:''});if(!post.title.trim()||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)||slugs.has(post.slug))throw new Error('Bài viết cần tên và slug duy nhất, chỉ gồm chữ thường không dấu, số và dấu gạch nối.');slugs.add(post.slug);if(!/^\d{4}-\d{2}-\d{2}$/.test(post.date)||!Number.isFinite(Date.parse(post.date)))throw new Error('Ngày bài viết không hợp lệ.');if(post.published&&!post.body.trim())throw new Error('Bài viết hiển thị cần có nội dung.');}
 if(JSON.stringify(c).length>850000)throw new Error('Nội dung quá lớn. Hãy tải ảnh lên thay vì dán ảnh vào dữ liệu.');

}

// Add fields without overwriting existing edits or cover images.
export function migrateContent(input:unknown):SiteContent {
 if(!input||typeof input!=='object')throw new Error('Thiếu dữ liệu nội dung.');
 const old=input as SiteContent;if(![1,2,3].includes(old.schemaVersion))throw new Error('Phiên bản nội dung chưa hỗ trợ.');
 const base=freshContent();const next={...base,...old,schemaVersion:3,copy:{...base.copy,...old.copy},contact:{...base.contact,...old.contact},seo:{...base.seo,...old.seo},images:{...base.images,...old.images},links:{...base.links,...old.links}};
 if(old.schemaVersion===1){next.images={aboutLandscape:{image:old.media.hero.image,alt:base.images.aboutLandscape.alt},aboutTea:{image:old.media.tea,alt:base.images.aboutTea.alt},longCoc:{image:old.media.hero.image,alt:base.images.longCoc.alt},couples:{image:old.media.room,alt:base.images.couples.alt}};for(const key of ['headerBooking','heroBooking','roomsEnquiry','couplesBooking'])next.links[key]=old.cta.href;}
 next.rooms=old.rooms.map(r=>({...base.rooms[0],...(old.schemaVersion===1?{ctaLabel:old.copy.rooms_7||'Hỏi phòng',ctaHref:old.cta.href}:{}),...r}));next.scenes=old.scenes.map((r,i)=>({...base.scenes[i],...r}));
 validateContent(next);return next;
}
function checkShape(value:unknown,example:unknown,path='nội dung'):void{
 if(typeof example==='string'){if(typeof value!=='string'||value.length>100000)throw new Error('Trường '+path+' không hợp lệ.');return;}
 if(typeof example==='number'||typeof example==='boolean'){if(typeof value!==typeof example)throw new Error('Trường '+path+' không hợp lệ.');return;}
 if(Array.isArray(example)){if(!Array.isArray(value))throw new Error('Danh sách '+path+' không hợp lệ.');if(example.length)for(const item of value)checkShape(item,example[0],path);return;}
 if(example&&typeof example==='object'){if(!value||typeof value!=='object')throw new Error('Mục '+path+' không hợp lệ.');for(const [key,sample]of Object.entries(example))checkShape((value as Record<string,unknown>)[key],sample,path+'.'+key);}
}
