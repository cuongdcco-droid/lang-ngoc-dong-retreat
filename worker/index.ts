import {freshContent,migrateContent,validateContent,type SiteContent} from '../lib/cms';
import {renderToString} from 'react-dom/server';
import {createElement} from 'react';
import Home from '../app/public-site';
type Env={DB:any;BUCKET:any;ASSETS:{fetch:(r:Request)=>Promise<Response>};ADMIN_EMAIL:string;ADMIN_EMAILS?:string};
const json=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
async function load(env:Env){const row=await env.DB.prepare('SELECT draft,published,revision,published_at FROM site_content WHERE id=1').first();return row?{draft:migrateContent(JSON.parse(row.draft)),published:migrateContent(JSON.parse(row.published)),revision:row.revision,publishedAt:row.published_at}:{draft:freshContent(),published:freshContent(),revision:0,publishedAt:null};}
function editor(req:Request,env:Env){const email=req.headers.get('oai-authenticated-user-email')?.trim().toLowerCase();const allowed=[env.ADMIN_EMAIL||'',...(env.ADMIN_EMAILS||'').split(',')].map(value=>value.trim().toLowerCase()).filter(Boolean);return !!req.headers.get('oai-authenticated-user-id')&&!!email&&allowed.includes(email);}
async function limited(req:Request,max:number){const reader=req.body?.getReader();if(!reader)throw new Error('Thiếu dữ liệu.');const parts:Uint8Array[]=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>max){await reader.cancel();throw new Error('Dữ liệu vượt quá giới hạn.');}parts.push(value);}const out=new Uint8Array(size);let offset=0;for(const part of parts){out.set(part,offset);offset+=part.length;}return out;}
const security={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"frame-ancestors 'self' https://*.chatgpt.com https://chatgpt.com; object-src 'none'; base-uri 'self'"};
function html(body:string,status=200){return new Response(body,{status,headers:{...security,'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});}
function head(c:SiteContent,title:string,description:string,path:string,image:string,noindex=false){const base=c.seo.siteUrl.replace(/\/$/,'');const url=base+path;const img=new URL(image||c.seo.shareImage,base).href;return `<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${noindex?'noindex,nofollow':'index,follow'}"><link rel="canonical" href="${esc(url)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(img)}"><meta property="og:type" content="${path==='/blog/'?'website':path.startsWith('/blog/')?'article':'website'}"><meta property="og:locale" content="vi_VN"><meta name="twitter:card" content="summary_large_image">`;}
const blogCss=`*{box-sizing:border-box}body{margin:0;color:#234435;background:#fbfcf8;font:18px/1.75 system-ui,sans-serif}a{color:inherit}header,main,footer{max-width:1120px;margin:auto;padding:28px}header{display:flex;justify-content:space-between;border-bottom:1px solid #d8e0d5}h1,h2{font-family:Georgia,serif;line-height:1.2}h1{font-size:clamp(34px,6vw,64px)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:28px}.card{background:white;border:1px solid #d8e0d5;border-radius:12px;overflow:hidden;text-decoration:none}.card>div{padding:24px}.card img{width:100%;height:220px;object-fit:cover}.cover{width:100%;max-height:560px;object-fit:cover;border-radius:12px}.body{max-width:780px;margin:32px auto;white-space:pre-wrap;overflow-wrap:anywhere}time{font-size:14px;color:#627562}.preview{background:#f1deb2;padding:12px;text-align:center}footer{border-top:1px solid #d8e0d5;font-size:15px}h2{font-size:28px}`;
export default {async fetch(req:Request,env:Env){const url=new URL(req.url);const path=url.pathname;try{
 const protectedPath=path.startsWith('/api/admin/')||/^\/(admin|preview)(\/|$)/.test(path)||(path.startsWith('/blog')&&url.searchParams.get('preview')==='1');
 if(protectedPath&&!editor(req,env)){if(path.startsWith('/api/'))return json({error:'Vui lòng đăng nhập bằng tài khoản của chủ website.'},403);if(!req.headers.get('oai-authenticated-user-id'))return Response.redirect(new URL('/signin-with-chatgpt?return_to='+encodeURIComponent(path+url.search),url).href,302);return html('<h1>Không có quyền quản trị</h1><p>Vui lòng dùng tài khoản của chủ website.</p><a href="/">Về trang chủ</a>',403);}
 if(!['GET','HEAD'].includes(req.method)){
 if(!path.startsWith('/api/admin/'))return json({error:'Thao tác không được hỗ trợ.'},405);
 if(req.headers.get('origin')!==url.origin)return json({error:'Yêu cầu không hợp lệ. Hãy mở lại trang quản trị.'},403);
 }
 if(path==='/api/admin/session')return json({authenticated:true});
 if(path==='/api/content'){const s=await load(env);return json({content:{...s.published,posts:s.published.posts.filter(p=>p.published)}});}
 if(path==='/api/admin/content'){
 if(req.method==='GET')return json(await load(env));
 if(req.method!=='PUT')return json({error:'Thao tác không được hỗ trợ.'},405);
 let data;try{data=JSON.parse(new TextDecoder().decode(await limited(req,900000)));validateContent(data.content);if(!Number.isInteger(data.revision)||!['draft','publish'].includes(data.action))throw Error('Yêu cầu không hợp lệ.');}catch(e){return json({error:(e as Error).message},400);}
 const content=JSON.stringify(data.content);const defaults=JSON.stringify(freshContent());const publish=data.action==='publish';
 // Seed only when absent; never overwrite an existing draft or publication.
 await env.DB.prepare('INSERT OR IGNORE INTO site_content (id,draft,published,revision) VALUES (1,?,?,0)').bind(defaults,defaults).run();
 const sql=publish?'UPDATE site_content SET draft=?,published=?,published_at=?,revision=revision+1 WHERE id=1 AND revision=?':'UPDATE site_content SET draft=?,revision=revision+1 WHERE id=1 AND revision=?';
 const values=publish?[content,content,new Date().toISOString(),data.revision]:[content,data.revision];
 const result=await env.DB.prepare(sql).bind(...values).run();if(!result.meta.changes)return json({error:'Có chỉnh sửa mới từ cửa sổ khác. Tải bản sao lưu nội dung đang sửa, sau đó tải lại trang để tránh ghi đè.'},409);
 return json({revision:data.revision+1});
 }
 if(path==='/api/admin/upload'){
 if(req.method!=='POST'||req.headers.get('content-type')!=='image/jpeg')return json({error:'Vui lòng tải ảnh JPG qua nút thay ảnh.'},400);
 let bytes;try{bytes=await limited(req,3*1024*1024);}catch(e){return json({error:(e as Error).message},413);}
 if(bytes[0]!==255||bytes[1]!==216||bytes[2]!==255)return json({error:'File ảnh không hợp lệ.'},400);
 const key=crypto.randomUUID()+'.jpg';await env.BUCKET.put(key,bytes,{httpMetadata:{contentType:'image/jpeg'}});return json({url:'/uploads/'+key});
 }
 if(path.startsWith('/uploads/')){if(!/^\/uploads\/[a-f0-9-]{36}\.jpg$/.test(path))return new Response('Not found',{status:404});const obj=await env.BUCKET.get(path.slice(9));if(!obj)return new Response('Not found',{status:404});return new Response(req.method==='HEAD'?null:obj.body,{headers:{...security,'Content-Type':'image/jpeg','Cache-Control':'public,max-age=31536000,immutable'}});}
 if(path==='/sitemap.xml'){const {published:c}=await load(env);const base=c.seo.siteUrl.replace(/\/$/,'');const paths=['/','/blog/',...c.posts.filter(p=>p.published).map(p=>'/blog/'+p.slug+'/')];return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+esc(base+p)+'</loc></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml','Cache-Control':'no-store'}});}
 if(path==='/robots.txt'){const {published:c}=await load(env);return new Response('User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /preview\nDisallow: /api/\nDisallow: /*?preview=1\nSitemap: '+c.seo.siteUrl.replace(/\/$/,'')+'/sitemap.xml',{headers:{'Content-Type':'text/plain'}});}
 if(/^\/blog(?:\/|$)/.test(path)){
 const state=await load(env);const preview=url.searchParams.get('preview')==='1';const c=preview?state.draft:state.published;const suffix=preview?'?preview=1':'';const slug=path.split('/')[2];const post=slug?c.posts.find(p=>p.slug===slug&&(preview||p.published)):null;if(slug&&!post)return html('<h1>Không tìm thấy bài viết</h1><a href="/blog/">Về danh sách bài viết</a>',404);
 const list=c.posts.filter(p=>preview||p.published);const title=post?.seoTitle||post?.title||'Bài viết | Làng Sinh Thái Ngọc Đồng';const description=post?.metaDescription||post?.excerpt||c.seo.description;
 const markup=post?`<article><time>${esc(post.date)}</time><h1>${esc(post.title)}</h1><p>${esc(post.excerpt)}</p>${post.image?`<img class="cover" src="${esc(post.image)}" alt="${esc(post.alt)}">`:''}<div class="body">${esc(post.body)}</div></article>`:`<h1>Chuyện ở Làng</h1><div class="grid">${list.length?list.map(p=>`<a class="card" href="/blog/${p.slug}/${suffix}">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy">`:''}<div><time>${esc(p.date)}${preview&&!p.published?' · Bản nháp':''}</time><h2>${esc(p.title)}</h2><p>${esc(p.excerpt)}</p></div></a>`).join(''):'<p>Bài viết đang được cập nhật. Hẹn anh chị ghé lại.</p>'}</div>`;
 const schema=post?`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,datePublished:post.date,description,image:post.image?new URL(post.image,c.seo.siteUrl).href:undefined}).replace(/</g,'\\u003c')}</script>`:'';
 return html(`<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${head(c,title,description,post?'/blog/'+post.slug+'/':'/blog/',post?.image||c.seo.shareImage,preview)}${schema}<link rel="icon" href="/favicon.svg"><style>${blogCss}</style></head><body>${preview?'<div class="preview">Xem trước bản nháp · chưa hiển thị cho khách</div>':''}<header><a href="${preview?'/preview/':'/'}">Ngọc Đồng</a><a href="/blog/${suffix}">Bài viết</a></header><main>${markup}</main><footer>${esc(c.address)} · <a href="tel:${esc(c.contact.phone.replace(/[^+\d]/g,''))}">${esc(c.contact.phone)}</a></footer></body></html>`);
 }
 if(path==='/'){
 const {published:c}=await load(env);c.posts=c.posts.filter(p=>p.published);
 const asset=await env.ASSETS.fetch(new Request(new URL('/index.html',url),req));let page=await asset.text();
 page=page.replace(/<title>[\s\S]*?<\/title>|<meta (?:name="(?:description|robots|twitter:[^"]*)"|property="og:[^"]*")[^>]*>|<link rel="canonical"[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'');
 const markup=renderToString(createElement(Home,{initialContent:c}));page=page.replace(/<main>[\s\S]*?<\/main>/,()=>markup);
 const schema={'@context':'https://schema.org','@type':'LodgingBusiness',name:c.copy.header_2,telephone:c.contact.phone,address:c.address,url:c.seo.siteUrl};
 const bootstrap=JSON.stringify(c).replace(/</g,'\\u003c');page=page.replace('</head>',()=>head(c,c.seo.title,c.seo.description,'/',c.seo.shareImage)+`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script><script>window.__NGOC_CONTENT__=${bootstrap}</script></head>`);return html(page);
 }
 if(path.startsWith('/api/'))return json({error:'Không tìm thấy.'},404);
 // Static app shells contain no saved content. Protected APIs enforce every read/write.
 const target=new URL(url);if(/^\/(admin|preview)\/$/.test(path))target.pathname=path.slice(0,-1)+'.html';else if(['/admin','/preview'].includes(path))target.pathname=path+'.html';
 const response=await env.ASSETS.fetch(new Request(target,req));const headers=new Headers(response.headers);Object.entries(security).forEach(([k,v])=>headers.set(k,v));if(protectedPath)headers.set('Cache-Control','private,no-store');return new Response(response.body,{status:response.status,headers});
 }catch(e){console.error('CMS request failed',path,(e as Error).message);return path.startsWith('/api/')?json({error:'Chưa kết nối được nơi lưu nội dung. Nội dung đang sửa vẫn được giữ; vui lòng thử lại.'},503):html('<h1>Website tạm thời chưa tải được</h1><p>Vui lòng thử lại sau ít phút.</p>',503);}}};
