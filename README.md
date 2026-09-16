# Website Làng Sinh Thái Ngọc Đồng

Website giữ giao diện Next.js hiện có, có CMS tiếng Việt tại `/admin/` và bản xem trước tại `/preview/`.

## Dành cho chủ website

1. Mở `/admin/` và đăng nhập bằng tài khoản chủ website.
2. Chọn nhóm nội dung, sửa chữ, thêm/xóa mục hoặc tải ảnh thay thế.
3. **Lưu nháp** lưu riêng, chưa đổi nội dung khách đang xem.
4. **Xem trước & xuất bản** cho phép kiểm tra máy tính/điện thoại; bấm **Xuất bản** khi đã kiểm tra.
5. Trong **Hướng dẫn & sao lưu**, tải bản sao lưu trước khi nhập nội dung hoặc sửa nhiều mục.

Các nhóm: trang chủ; giới thiệu; phòng nghỉ (giá, tiện nghi, ảnh); dịch vụ; thư viện; blog; liên hệ; SEO; menu và footer. Ảnh bìa giữ nguyên trừ khi chủ website tự chọn thay. Facebook/Booking/WhatsApp để trống sẽ không hiển thị. Google Maps trống sẽ dùng tìm kiếm theo địa chỉ.

Phòng, giá và ảnh minh họa cần được chủ sở hữu xác nhận. Đặt phòng hiện là liên hệ trực tiếp, không thu tiền hoặc quản lý tồn phòng.

## Chạy và triển khai

Node.js 22.13+ (có node:sqlite), pnpm 11.19.

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

Bản xem trước tại `http://127.0.0.1:3026`. Chỉ chạy trên máy cục bộ; đăng nhập giả lập dùng cookie cục bộ. Dữ liệu thử nằm trong `.local-data/`, không đóng gói lên website. Chạy lại build và khởi động lại preview sau khi sửa mã nguồn.

`pnpm build` tạo Next export, sau đó đóng gói Cloudflare Worker tại `dist/server/index.js` và tài nguyên tại `dist/client/`. **Không deploy riêng thư mục out/** vì CMS cần API máy chủ. Dùng Sites với `.openai/hosting.json`, giữ nguyên project ID, DB và BUCKET. Sites cấp D1/R2 và áp dụng các migration Drizzle trong `drizzle/`.

Khai báo `ADMIN_EMAIL` trong biến môi trường Sites là email chủ quản trị. Chỉ header danh tính đã xác minh bởi Sites được dùng để kiểm tra quyền; không đặt Worker sau proxy cho phép khách tự truyền header danh tính. Khi chuyển nền tảng phải thay lớp xác thực tương ứng.

Để đổi schema: sửa `db/schema.ts`, chạy `pnpm db:generate`, kiểm tra migration mới rồi build/deploy. Không sửa migration đã áp dụng. Nội dung D1 và ảnh R2 tồn tại độc lập với mã nguồn, không bị ghi đè khi deploy lại.

Xem `CMS.md` cho lưu trữ, sao lưu, khôi phục và giới hạn.
