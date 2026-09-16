# Quản trị nội dung Ngọc Đồng

## Sử dụng

Mở `/admin/`. Chọn phần cần sửa ở cột bên trái. Các trường chữ, mô tả, nhãn nút bấm và ảnh đều chỉnh được. Phòng nghỉ có tên, mô tả, sức chứa và giá. Trải nghiệm có tên và mô tả. Thư viện có ảnh, chú thích và mô tả hỗ trợ tiếp cận. Liên hệ đặt phòng có số điện thoại và Zalo. Dùng nút lên/xuống để đổi thứ tự section; ảnh bìa giữ ở đầu để bảo toàn điều hướng.

1. Sửa và bấm **Lưu nháp**. Trang chính chưa thay đổi.
2. Bấm **Xem trước & xuất bản**. Bản nháp được lưu trước khi mở preview. Chọn chế độ máy tính hoặc điện thoại.
3. Bấm **Xuất bản** trong preview. Trang chính trong cùng trình duyệt được cập nhật, kể cả tab đang mở.

Đây là bản mock theo yêu cầu: dữ liệu thuộc cùng trình duyệt và cùng origin, không đồng bộ tới khách truy cập hay máy khác. Xóa dữ liệu trình duyệt sẽ mất chỉnh sửa. Đường dẫn local và đường dẫn Sites có bộ dữ liệu riêng. Bản quản trị local không có đăng nhập hay bảo mật nhiều người dùng; quyền truy cập Sites vẫn được giữ riêng tư ở cấp nền tảng.

Ảnh JPEG/PNG/WebP tối đa 10 MB được giải mã, thu nhỏ cạnh dài xuống tối đa 1400px và chuyển JPEG để lưu. Ảnh lỗi hoặc loại file khác bị từ chối. Bộ nhớ localStorage có giới hạn; khi đầy, UI báo lỗi và giữ nội dung đang sửa, bản đã xuất bản không bị ghi đè. Bản nháp và bản công bố được lưu trong một giao dịch localStorage. Nút xuất bản không có nghĩa triển khai lại mã nguồn hay chia sẻ nội dung cho tất cả khách truy cập.

## Cấu trúc

- `app/page.tsx`: route công khai, không tải trình chỉnh sửa.
- `app/public-site.tsx`: giữ giao diện và tương tác của website trước; dùng dữ liệu đã công bố.
- `app/admin/`: bộ biên tập và preview trong dialog.
- `app/preview/`: dùng cùng renderer public với dữ liệu nháp. Được đặt noindex.
- `lib/cms.ts`: schema, defaults, validation và các hợp đồng ContentRepository, AssetStorage, AdminAuth.
- `lib/cms-fields.json`: văn bản mẫu được trích từ website gốc.
- `lib/cms-repository.ts`: adapter local, nơi duy nhất thao tác localStorage và xử lý file.
- `lib/cms-client.tsx`: đọc dữ liệu, đồng bộ tab, sắp xếp section theo dữ liệu.

## Nối Supabase hoặc CMS

Các biến trong `.env.example` là placeholder, chưa bật kết nối. Không có secret thật trong source.

1. Triển khai `AdminAuth.getSession()` với Supabase Auth hoặc nhà cung cấp tương đương. Bảo vệ cả API lẫn trang quản trị; không chỉ ẩn nút trên giao diện. Preview nháp phải yêu cầu phiên editor.
2. Thay `ContentRepository` bằng API bất đồng bộ. Lưu một document JSON có schemaVersion với draft và published riêng. Public chỉ được đọc published. Editor có quyền lưu nháp / xuất bản. Dùng RLS và kiểm tra role phía server. Sử dụng revision/optimistic locking nếu có nhiều người sửa.
3. Thay `AssetStorage.upload()` bằng upload bucket có giới hạn MIME/kích thước, kiểm tra quyền và trả URL ảnh. Không lưu base64 vào database production. Dọn asset mồ côi sau khi đã đảm bảo không có bản nháp hoặc published tham chiếu.
4. Publish nên là một giao dịch, ghi published từ draft và publishedAt. Invalidate public cache sau thành công. Cần tách reader public khỏi editor API và xác thực preview.
5. Dùng biến URL và publishable key ở frontend; service role chỉ ở server. Với Next static export hiện tại, đặt API ở backend/CMS độc lập; nếu cần server Next, đổi deployment runtime phù hợp.
6. Dữ liệu JSON-LD / metadata hiện vẫn là thông tin nền của site; khi dùng backend, sinh metadata phía server/build từ bản published. Bản local chỉ thay nội dung trong trình duyệt, không cập nhật SEO phía server.

Ảnh và danh mục phòng mẫu vẫn cần chủ sở hữu xác nhận trước khi mở bán.

## Bổ sung chỉnh sửa từng phần

Ảnh Câu chuyện Làng (2 ảnh), Long Cốc và Kỳ nghỉ cho hai được thay riêng ngay trong từng mục, không còn phụ thuộc ảnh bìa. Đầu trang có tên và đích đến từng mục menu. Mỗi phòng có nhãn/liên kết nút riêng và tùy chọn nhãn ảnh minh họa. Mỗi khoảnh khắc có tên thanh chọn, chú thích nguồn và mô tả ảnh riêng. Thư viện bật/tắt nhãn ảnh minh họa theo ảnh. Dùng ô tìm kiếm bằng chữ đang xuất hiện trên website để tìm mục cần sửa.

Schema v2 tự nâng cấp dữ liệu v1 trong bộ nhớ: giữ riêng bản nháp/bản công bố, ảnh đã upload, chữ và CTA cũ; không ghi thay dữ liệu lưu trên trình duyệt cho tới khi người dùng bấm lưu hoặc xuất bản.
