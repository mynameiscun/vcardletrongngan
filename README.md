# Danh thiếp điện tử Lê Trọng Ngân

Bộ mã nguồn tĩnh gồm HTML, CSS và JavaScript. Không cần cài Node.js hoặc chạy lệnh build.

## Cấu trúc thư mục

- `index.html`: giao diện chính.
- `style.css`: toàn bộ định dạng và responsive.
- `script.js`: thông tin cá nhân, chuyển ngôn ngữ, QR, tải vCard, sao chép và chia sẻ.
- `contact.vcf`: file liên hệ dự phòng.
- `favicon.svg`: biểu tượng website.
- `vendor/`: thư viện tạo QR đã đặt sẵn, website không phụ thuộc CDN.

## Mở trong Visual Studio Code

1. Giải nén file ZIP.
2. Mở Visual Studio Code.
3. Chọn **File → Open Folder** và mở thư mục `le-trong-ngan-vcard`.
4. Cài tiện ích **Live Server** nếu máy chưa có.
5. Nhấp chuột phải vào `index.html` và chọn **Open with Live Server**.

Bạn cũng có thể mở trực tiếp `index.html`, nhưng Live Server giúp chức năng chia sẻ và sao chép hoạt động ổn định hơn.

## Thay đổi thông tin cá nhân

Mở `script.js`, chỉnh phần `PROFILE` ở đầu file:

```javascript
const PROFILE = {
  name: "Lê Trọng Ngân",
  initials: "LTN",
  roleVi: "GIÁM ĐỐC",
  roleEn: "DIRECTOR",
  phone: "0772771675",
  phoneDisplay: "0772 771 675",
  email: "trongngan@gmail.com",
  website: "",
  zalo: "https://zalo.me/0772771675",
  facebook: "",
  avatar: ""
};
```

- Nếu có website hoặc Facebook, dán đường dẫn đầy đủ bắt đầu bằng `https://`.
- Nếu có ảnh đại diện, chép ảnh vào thư mục dự án rồi nhập, ví dụ: `avatar: "avatar.jpg"`.
- Khi thay thông tin, QR và file vCard tải từ nút **Thêm vào danh bạ** sẽ tự động cập nhật.
- Nên cập nhật thêm file `contact.vcf` để liên kết dự phòng cũng dùng thông tin mới.

## Đưa lên GitHub Pages

1. Tạo một repository mới trên GitHub.
2. Đưa toàn bộ file và thư mục trong dự án lên repository, bảo đảm `index.html` nằm ở thư mục gốc.
3. Mở **Settings → Pages**.
4. Ở mục **Build and deployment**, chọn **Deploy from a branch**.
5. Chọn nhánh `main`, thư mục `/root`, sau đó bấm **Save**.
6. Chờ GitHub cung cấp đường dẫn website.

## Đưa lên Netlify

1. Đăng nhập Netlify và chọn **Add new site → Deploy manually**.
2. Kéo toàn bộ thư mục `le-trong-ngan-vcard` vào vùng tải lên.
3. Netlify sẽ tạo đường dẫn website ngay sau khi tải xong.

## Chức năng có sẵn

- Responsive trên điện thoại và máy tính.
- Chuyển tiếng Việt/Anh.
- Gọi điện, gửi email và mở Zalo.
- Chia sẻ danh thiếp bằng chức năng chia sẻ của điện thoại.
- Sao chép số điện thoại và email.
- Tạo và tải file liên hệ vCard.
- QR vCard có logo, quét để lưu danh bạ.
- Tải QR chất lượng cao dạng PNG.
