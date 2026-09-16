# Hướng dẫn quản trị Ngọc Đồng

## Sửa nội dung

Menu bên trái chia theo từng khu vực. Có ô tìm kiếm theo chữ trên website. Các nút ↑ ↓ thay thứ tự khu vực, ảnh bìa luôn ở đầu. Các form sửa tiêu đề, mô tả, CTA và đường dẫn; tên menu và footer đều chỉnh được. Phòng có thêm/xóa, giá, sức chứa, tiện nghi nhiều dòng và ảnh. Dịch vụ và thư viện ảnh cũng thêm/xóa được.

Ảnh được chọn từ máy, giới hạn 10 MB, JPG/PNG/WebP; tự giảm cạnh dài tối đa 1400 px và chuyển JPEG. Ảnh upload lưu trong R2; dữ liệu nội dung lưu trong D1, dùng chung giữa thiết bị. Không xóa ảnh cũ tự động để các bản sao lưu và nội dung đã xuất bản vẫn mở được.

## Lưu nháp, xem trước, xuất bản

- **Lưu nháp** chỉ cập nhật bản nháp riêng.
- **Xem trước & xuất bản** lưu nháp, mở website với nội dung đó; chọn màn hình máy tính/điện thoại.
- **Xuất bản** lưu bản nháp và nội dung công bố trong cùng một câu lệnh có kiểm tra phiên bản. Trang khách mới mở nhận nội dung mới ngay, tab cũ đồng bộ khi lấy lại focus hoặc sau tối đa 60 giây.
- Nếu hai cửa sổ cùng chỉnh, bản đến sau bị từ chối thay vì ghi đè mất dữ liệu. Tải bản sao lưu nội dung đang sửa, tải lại rồi đối chiếu.
- Nếu lưu thất bại, nội dung đang sửa giữ nguyên trên form. Đừng đóng trang; thử lại hoặc tải bản sao lưu.

## Bài viết

Thêm bài → điền tên, slug, ngày đăng, tóm tắt, nội dung → chọn ảnh và mô tả ảnh. Slug dùng chữ thường không dấu, số và dấu gạch nối, không trùng. Có SEO title/meta description riêng; để trống dùng tên/tóm tắt bài.

Bật **Hiển thị bài viết khi xuất bản website** để đưa bài ra danh sách công bố. Bài chưa bật vẫn xem được trong bản nháp, không xuất hiện ở API khách, sitemap hoặc trang blog công khai. **Xem trước bài này** kiểm tra bài trước khi xuất bản. Xóa bài cần xác nhận và xuất bản mới có hiệu lực. Đổi slug làm đường dẫn cũ trả 404; nên giữ slug của bài đã chia sẻ.

Nội dung bài viết là văn bản có xuống dòng, không nhận HTML; tránh mã nhúng ngoài ý muốn. Danh sách blog: `/blog/`; bài chi tiết: `/blog/slug/`.

## SEO, liên hệ và quyền truy cập

SEO tiêu đề, mô tả, canonical, Open Graph và ảnh chia sẻ được tạo trên máy chủ từ bản công bố. Trang chủ có nội dung HTML hiện tại cho trình thu thập dữ liệu, không phải chỉ thay meta trên trình duyệt. Sitemap cập nhật theo các bài đã công bố. Admin, preview và blog preview đặt noindex; API và bản nháp yêu cầu tài khoản chủ website. Quyền sửa được kiểm tra phía máy chủ, kèm kiểm tra nguồn của yêu cầu ghi.

Website giữ nguyên audience hiện tại của Sites. Khi còn riêng tư, công cụ tìm kiếm/khách không được mời không thể truy cập; SEO chỉ phát huy sau khi chủ web mở quyền công khai. CMS không tự thay audience. Đổi tên miền trong SEO không tự kết nối tên miền.

## Sao lưu và dữ liệu cũ

**Tải bản sao lưu** tải JSON chứa nội dung đang ở form và các đường dẫn ảnh. File này không chứa bytes ảnh R2. Backup toàn bộ khi di chuyển nền tảng cần xuất D1 và R2 qua nơi lưu trữ; file JSON đơn lẻ chỉ phù hợp khôi phục trên cùng website.

**Nhập bản sao lưu** chỉ nạp form sau xác nhận, chưa ghi server hoặc xuất bản. Bản nháp và ảnh base64 từ CMS trình duyệt cũ có thể được nhập: ảnh được chuyển lên kho ảnh; nội dung cần kiểm tra rồi lưu/xuất bản. Dữ liệu cũ trong trình duyệt không bị xóa. Nếu cùng origin còn khóa `ngoc-dong-cms-v1`, mục hướng dẫn có nút khôi phục bản nháp cũ.

## Cấu trúc cho người bảo trì

- `lib/cms.ts`: schema v3, cấu hình ban đầu, validation, nâng cấp v1/v2.
- `lib/cms-repository.ts`: gọi API, kiểm tra revision, tải ảnh.
- `worker/index.ts`: API, xác thực, D1/R2, server-render trang chủ, blog, SEO, sitemap.
- `db/schema.ts` và `drizzle/`: định nghĩa dữ liệu và migration.
- `scripts/build-worker.mjs`: đóng gói Worker và tài nguyên.
- `scripts/preview.mjs`: mô phỏng local bằng SQLite và filesystem, không nằm trong Worker production.

Giới hạn: 50 phòng, 50 dịch vụ, 100 ảnh thư viện, 100 bài viết, 12 mục menu; nội dung JSON tối đa khoảng 850 KB. Không có quản lý nhiều vai trò biên tập, đặt phòng/thanh toán tự động hoặc chuyển hướng slug cũ.
