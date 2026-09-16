# Kiểm tra bàn giao

- Next.js production build: thành công; tạo trang tĩnh, trang 404, robots.txt và sitemap.xml.
- TypeScript: thành công (kiểm tra độc lập và trong production build).
- Giao diện: kiểm tra trực quan desktop 1440×1000, điện thoại 390×844 và 320×800; kiểm tra tràn ngang ở tablet 768×1024. Không phát hiện tràn ngang tại các kích thước đã kiểm tra.
- Menu điện thoại: mở/đóng đúng.
- Gallery: mở ảnh, chuyển ảnh tiếp theo, đóng bằng Escape; focus trở về nút ảnh.
- Cinematic Story: nút cảnh 5 đưa đến hoàng hôn và cập nhật nội dung theo vị trí cuộn.
- Bản đồ: tải iframe theo yêu cầu, địa chỉ truy vấn đúng.
- Liên kết nội bộ: không có anchor hỏng; liên hệ dùng tel:0965163291 và Zalo số tương ứng.
- Console sau khi sửa lỗi: không có lỗi JavaScript trong lượt kiểm tra cuối.
- Hỗ trợ prefers-reduced-motion: tắt parallax/video tự phát, bỏ chuyển động và cho phép chọn cảnh bằng nút. Nhánh này được kiểm tra mã nguồn, chưa mô phỏng trực tiếp thiết lập hệ điều hành.

## Giới hạn nội dung

Chưa có video AI, ảnh thật của phòng, danh mục phòng, bảng giá hoặc đánh giá xác thực do chủ sở hữu cung cấp. Cấu trúc thay media và dữ liệu đã sẵn sàng. Booking là liên hệ trực tiếp, không có hệ thống quản lý tồn phòng/thanh toán. Ghim bản đồ cần chủ sở hữu xác nhận.

## Kiểm tra bổ sung CMS — 16/09/2026

- Production build sau bổ sung CMS: thành công, gồm `/`, `/admin`, `/preview`.
- Trình duyệt Chrome headless: sửa tiêu đề, upload ảnh JPEG, lưu nháp; trang public vẫn giữ bản công bố cũ.
- Preview nhận đúng chữ và ảnh mới. Chuyển khung xem trước sang điện thoại hoạt động.
- Publish cập nhật chữ/ảnh ngay trên tab public đang mở; tải lại giữ dữ liệu.
- Sửa giá phòng, đổi thứ tự section và tải lại: đúng dữ liệu và thứ tự.
- Kiểm tra public/admin tại chiều rộng 1440, 768, 390, 320 px: không tràn ngang.
- Kiểm tra trực quan desktop, mobile và dialog preview. Có fallback vh cho trình duyệt chưa hỗ trợ dvh.
- Không ghi nhận pageerror trong lượt kiểm tra cuối. Test dùng browser context riêng và xóa dữ liệu thử sau khi hoàn tất.
- Giới hạn: đây là local mock, không kiểm tra Supabase/Auth vì chưa cấu hình. Không đồng bộ nội dung giữa thiết bị/người dùng.

## Rà soát trường chỉnh sửa còn thiếu

- Đã kiểm tra chuyển dữ liệu v1 → v2 với nội dung, ảnh và CTA tùy chỉnh: giữ nguyên, không ghi vào storage khi chỉ mở trang.
- Thay độc lập 4 ảnh tại Câu chuyện Làng, Long Cốc, Kỳ nghỉ cho hai; upload ảnh mới không đổi ảnh bìa.
- Chỉnh chữ menu, liên kết menu, chú thích nguồn ảnh/khoảnh khắc, tên trên thanh chọn, CTA từng phòng và bật/tắt nhãn ảnh minh họa.
- Tìm nội dung theo chữ đang hiển thị, mở đúng mục, lưu nháp, preview, publish sang tab public, tải lại vẫn giữ chỉnh sửa.
- Không tràn ngang ở 1440, 768, 390, 320 px; kiểm tra trực quan admin desktop/mobile. Production build thành công.
