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
