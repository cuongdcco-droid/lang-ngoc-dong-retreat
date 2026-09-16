import { freshContent, migrateContent, validateContent, type ContentRepository, type Snapshot, type SiteContent, type AssetStorage, type AdminAuth } from './cms';
const KEY='ngoc-dong-cms-v1';
function read():Snapshot{const raw=localStorage.getItem(KEY);if(!raw)return {draft:freshContent(),published:freshContent(),publishedAt:null};try{const state=JSON.parse(raw);return {...state,draft:migrateContent(state.draft),published:migrateContent(state.published)};}catch{throw new Error('Không đọc được nội dung đã lưu. Dữ liệu cũ vẫn được giữ; hãy kiểm tra bản sao lưu hoặc thử lại trên trình duyệt này.');}}
function write(state:Snapshot){try{localStorage.setItem(KEY,JSON.stringify(state));window.dispatchEvent(new Event('cms-change'));}catch{throw new Error('Chưa lưu được: bộ nhớ trình duyệt đã đầy hoặc bị chặn. Hãy dùng ảnh nhỏ hơn. Nội dung đang sửa vẫn được giữ.');}}
// Replace this adapter with an authenticated API / Supabase repository later.
// Publishing writes draft + published in one operation; failed writes keep the last publication intact.
export const contentRepository:ContentRepository={async load(){return read();},async saveDraft(content:SiteContent){validateContent(content);write({...read(),draft:content});},async publish(content:SiteContent){validateContent(content);write({draft:content,published:content,publishedAt:new Date().toISOString()});}};
export const adminAuth:AdminAuth={async getSession(){return {mode:'local',label:'Bản thử trên thiết bị này'};}};
export const assetStorage:AssetStorage={async upload(file){
 if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Vui lòng chọn ảnh JPG, PNG hoặc WebP.');
 if(file.size>10*1024*1024)throw new Error('Ảnh quá lớn. Vui lòng chọn ảnh dưới 10 MB.');
 const bitmap=await createImageBitmap(file).catch(()=>{throw new Error('Không đọc được ảnh. Hãy chọn file ảnh khác.');});
 try{const scale=Math.min(1,1400/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Trình duyệt chưa hỗ trợ xử lý ảnh.');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',.82);}finally{bitmap.close();}
}};
