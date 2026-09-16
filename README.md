# Làng Sinh Thái Ngọc Đồng

Website Next.js (App Router), React, TypeScript, Tailwind CSS v4 và Framer Motion. Xuất tĩnh để triển khai trên bất kỳ dịch vụ lưu trữ static nào.

## Chạy

Yêu cầu Node.js 22.13+ và pnpm 11.19.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

Bản production nằm trong `out/`. Có thể kiểm tra bằng `python3 -m http.server 3000 --directory out`.

## Nội dung và media

- `app/page.tsx`: các section và tương tác.
- `app/globals.css`: hệ màu, typography, responsive, reduced motion.
- `lib/content.ts`: cấu hình media, phòng mẫu, câu chuyện theo cuộn.
- `public/media/`: ảnh/video cục bộ. Thay đường dẫn trong `lib/content.ts`.
- `ASSETS.md`: nguồn ảnh và hướng dẫn thay media AI.

Địa chỉ do chủ sở hữu cung cấp: Ngọc Đồng – Thục Luyện – Thanh Sơn – Phú Thọ. Điện thoại: 0965163291.

## Trước khi mở bán

Phòng nghỉ trong bản thiết kế là mẫu, không phải danh mục đã xác nhận. Điền tên phòng, sức chứa, giá và ảnh thật trong dữ liệu. Không có đánh giá khách hoặc số sao được bịa đặt. Dịch vụ/trải nghiệm cần được chủ sở hữu xác nhận. Bản đồ tìm theo địa chỉ, chưa xác minh ghim chính xác. Booking dẫn tới cuộc gọi/Zalo để xác nhận, không tạo reservation hay thu tiền. Không có backend lưu dữ liệu khách.

Sau khi có tên miền chính thức, khai báo NEXT_PUBLIC_SITE_URL khi build để tạo canonical, sitemap và robots chính xác.
