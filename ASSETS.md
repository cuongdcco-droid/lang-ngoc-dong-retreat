# Media và nguồn ảnh

Ảnh Long Cốc là ảnh thật của địa điểm. Những ảnh phòng, bể bơi và trà là ảnh minh họa, không xác nhận cơ sở vật chất của Làng.

| File | Nguồn | Tác giả / giấy phép |
|---|---|---|
| long-coc.jpg | https://unsplash.com/photos/a-lush-green-hillside-covered-in-fog-and-clouds-GLZeyN0HtjU | Nguyen Trong Quyet / Unsplash |
| wooden-room-reference.jpg | https://www.pexels.com/photo/interior-design-of-a-bedroom-14025904/ | Quang Nguyen Vinh / Pexels |
| tea-reference.jpg | https://www.pexels.com/photo/ceramic-teapot-and-cup-of-green-tea-on-a-table-17638814/ | esrannuur / Pexels |
| pool-reference.jpg | https://unsplash.com/photos/a-pool-surrounded-by-lush-vegetation-and-palm-trees-4GS8Jamdbe8 | Klaudia Odrzywolska / Unsplash, chụp tại Ubud |

Giấy phép: https://unsplash.com/license và https://www.pexels.com/license/ .

## Thay bằng ảnh thật hoặc Higgsfield / MCP

Giữ cấu trúc `public/media/` và cập nhật `lib/content.ts`. Không cần sửa layout.

- Hero: ảnh 2400×1500 WebP/JPEG, bố cục chừa khoảng bên trái cho chữ.
- Video hero: MP4 H.264, 1920×1080, 24fps, 8–15s, không âm thanh, mục tiêu <8 MB; tùy chọn WebM. Gán `media.hero.video` và `media.hero.webm`. Poster luôn là ảnh tĩnh.
- Story: 6 ảnh 1920×1080 hoặc video MP4 ngắn theo các key `dawn`, `tea`, `arrival`, `pool`, `sunset`, `night`; khai báo `video` ở mỗi cảnh. Video phát khi cảnh đang hiện; ảnh vẫn là fallback.
- Phòng/gallery: ảnh 1600px cạnh dài, dùng alt mô tả chính xác và đánh dấu `illustrative: false` sau khi thay bằng ảnh đã xác minh.
- Cập nhật caption minh họa của story/hero khi thay media. Media AI phải được ghi rõ nếu có thể bị hiểu là ảnh hiện trạng của Làng.

## Gợi ý prompt quay / tạo media

Dùng ảnh thật do chủ sở hữu cung cấp làm image-to-video reference. Không tự bịa kiến trúc của Làng.

1. Bình minh: slow aerial glide above rounded Long Coc tea hills, northern Vietnam, low morning mist, soft warm sunlight, natural documentary colors, no text.
2. Đồi chè: gentle eye-level tracking along tea rows, dew on leaves, human-scale natural movement.
3. Về Làng: slow approach to the actual entrance, preserve architecture from reference exactly, warm late-morning light.
4. Hồ bơi: quiet water ripples at the actual pool, static composition, preserve surroundings from reference.
5. Hoàng hôn: golden-hour light passing through real foliage, slow natural movement, subtle film grain.
6. Đêm: actual accommodation exterior with warm practical lights, still camera, no invented buildings.

Hỗ trợ media đã được chuẩn bị trong code; bản bàn giao không bao gồm video AI và chưa kết nối Higgsfield.
