# Kiểm tra CMS trực tuyến — 16/09/2026

Bản production build Next.js + Cloudflare Worker thành công; TypeScript đạt. Kiểm thử trình duyệt Chrome với môi trường local dùng SQLite thật và kho ảnh filesystem mô phỏng hợp đồng D1/R2.

Đã kiểm tra:
- Lưu nháp không thay đổi nội dung công bố; preview đọc đúng nháp.
- Publish lưu chung, trình duyệt khách riêng nhận nội dung mới và tải lại vẫn đúng.
- Khách không đọc được API admin, preview yêu cầu đăng nhập; yêu cầu ghi từ origin khác bị từ chối.
- Upload JPEG, trả URL kho ảnh, ảnh tải thành công từ trình duyệt khách.
- Thêm/sửa/xóa blog, preview riêng, SEO title trên HTML máy chủ, sitemap bài đã đăng; bài chưa đăng hoặc đã xóa trả 404.
- Thêm phòng và tiện nghi; ảnh bìa giữ nguyên sau toàn bộ luồng chỉnh sửa.
- Ghi với revision cũ trả 409; slug trùng bị từ chối.
- Không tràn ngang ở 1440, 768, 390, 320 px. Xem ảnh chụp desktop/mobile; mobile có menu chọn mục gọn.
- Các ảnh cục bộ trả 200; không ghi nhận lỗi JavaScript trong kiểm thử cuối.

Website giữ audience riêng tư hiện có. Dữ liệu kiểm thử chỉ ở local, không đưa lên production. Kiểm tra hệ thống hosted phải thực hiện sau triển khai; không suy diễn kết quả local là bằng chứng D1/R2 production.

Hiệu năng: trang admin khoảng 119 KB JavaScript tải đầu, trang chủ khoảng 164 KB (báo cáo Next). Ảnh dưới nếp gấp lazy-load; ảnh mới giảm kích thước tối đa 1400px. Không đo điểm Lighthouse hoặc Core Web Vitals ngoài thực tế.
