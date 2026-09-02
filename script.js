"use strict";

/* ================================================================
   THÔNG TIN CẦN CHỈNH SỬA
   Thay nội dung trong PROFILE để dùng danh thiếp cho người khác.
   Nếu có ảnh đại diện, đặt file vào cùng thư mục và nhập avatar: "avatar.jpg".
   ================================================================ */
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
  avatar: "",
  cardUrl: "http://vcar.letrongngan/",
};

const TEXT = {
  vi: {
    role: PROFILE.roleVi,
    call: "Gọi",
    email: "Email",
    share: "Chia sẻ",
    phoneLabel: "Số điện thoại",
    emailLabel: "Địa chỉ email",
    websiteLabel: "Website",
    updating: "Đang cập nhật",
    addContact: "Thêm vào danh bạ",
    connect: "Kết nối với tôi",
    qrTitle: "MÃ QR VCARD",
    qrDescription: "Đưa camera điện thoại lên để quét trực tiếp danh thiếp này.",
    downloadQr: "Tải ảnh QR có logo",
    copied: "Đã sao chép",
    copyFailed: "Không thể sao chép. Vui lòng thử lại.",
    contactSaved: "Đã tải danh thiếp liên hệ.",
    qrSaved: "Đã tải ảnh QR.",
    shareText: "Danh thiếp điện tử của Lê Trọng Ngân",
    shareCopied: "Đã sao chép đường dẫn danh thiếp.",
    unavailable: "Liên kết đang được cập nhật.",
    qrError: "Không thể tạo mã QR.",
    switchLanguage: "Chuyển sang tiếng Anh",
    openQr: "Mở mã QR vCard",
    close: "Đóng",
    copyPhone: "Sao chép số điện thoại",
    copyEmail: "Sao chép địa chỉ email"
  },
  en: {
    role: PROFILE.roleEn,
    call: "Call",
    email: "Email",
    share: "Share",
    phoneLabel: "Phone number",
    emailLabel: "Email address",
    websiteLabel: "Website",
    updating: "Coming soon",
    addContact: "Save to contacts",
    connect: "Connect with me",
    qrTitle: "VCARD QR CODE",
    qrDescription: "Point your phone camera at the code to save this digital card.",
    downloadQr: "Download QR with logo",
    copied: "Copied",
    copyFailed: "Unable to copy. Please try again.",
    contactSaved: "Contact card downloaded.",
    qrSaved: "QR image downloaded.",
    shareText: "Lê Trọng Ngân's digital business card",
    shareCopied: "Digital card link copied.",
    unavailable: "This link is being updated.",
    qrError: "Unable to generate the QR code.",
    switchLanguage: "Chuyển sang tiếng Việt",
    openQr: "Open vCard QR code",
    close: "Close",
    copyPhone: "Copy phone number",
    copyEmail: "Copy email address"
  }
};

let currentLanguage = "vi";
let previousFocus = null;
let toastTimer = null;

const elements = {
  languageButton: document.getElementById("languageButton"),
  langVi: document.getElementById("langVi"),
  langEn: document.getElementById("langEn"),
  openQrButton: document.getElementById("openQrButton"),
  closeQrButton: document.getElementById("closeQrButton"),
  qrModal: document.getElementById("qrModal"),
  qrCode: document.getElementById("qrCode"),
  downloadQrButton: document.getElementById("downloadQrButton"),
  shareButton: document.getElementById("shareButton"),
  saveContactButton: document.getElementById("saveContactButton"),
  websiteButton: document.getElementById("websiteButton"),
  facebookButton: document.getElementById("facebookButton"),
  avatarImage: document.getElementById("avatarImage"),
  avatarInitials: document.getElementById("avatarInitials"),
  toast: document.getElementById("toast")
};

function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Ngân;Lê Trọng;;;",
    `FN:${PROFILE.name}`,
    `TITLE:${PROFILE.roleVi}`,
    `TEL;TYPE=CELL:${PROFILE.phone}`,
    `EMAIL;TYPE=INTERNET:${PROFILE.email}`
  ];

  if (PROFILE.website) lines.push(`URL:${PROFILE.website}`);
  lines.push("END:VCARD");

  return lines.join("\r\n");
}

function updateProfile() {
  document.title = `${PROFILE.name} | Danh thiếp điện tử`;
  document.querySelector(".identity-section h1").textContent = PROFILE.name.toUpperCase();
  document.querySelector(".profile-card").setAttribute("aria-label", `Danh thiếp điện tử ${PROFILE.name}`);

  elements.avatarInitials.textContent = PROFILE.initials;
  if (PROFILE.avatar) {
    elements.avatarImage.src = PROFILE.avatar;
    elements.avatarImage.hidden = false;
    elements.avatarInitials.hidden = true;
  }

  document.getElementById("callAction").href = `tel:${PROFILE.phone}`;
  document.getElementById("phoneLink").href = `tel:${PROFILE.phone}`;
  document.getElementById("phoneText").textContent = PROFILE.phoneDisplay || PROFILE.phone;

  document.getElementById("emailAction").href = `mailto:${PROFILE.email}`;
  document.getElementById("emailLink").href = `mailto:${PROFILE.email}`;
  document.getElementById("emailText").textContent = PROFILE.email;

  document.getElementById("zaloAction").href = PROFILE.zalo;
  document.getElementById("zaloSocial").href = PROFILE.zalo;

  if (PROFILE.website) {
    document.getElementById("websiteText").removeAttribute("data-i18n");
    document.getElementById("websiteText").textContent = PROFILE.website.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

function updateLanguage() {
  const t = TEXT[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (t[key]) element.textContent = t[key];
  });

  elements.langVi.classList.toggle("active", currentLanguage === "vi");
  elements.langEn.classList.toggle("active", currentLanguage === "en");
  elements.languageButton.setAttribute("aria-label", t.switchLanguage);
  elements.openQrButton.setAttribute("aria-label", t.openQr);
  elements.closeQrButton.setAttribute("aria-label", t.close);

  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons[0].setAttribute("aria-label", t.copyPhone);
  copyButtons[1].setAttribute("aria-label", t.copyEmail);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  toastTimer = window.setTimeout(() => {
    elements.toast.hidden = true;
  }, 2400);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
}

async function copyText(value, notify = true) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      if (!copied) throw new Error("Copy failed");
    }

    if (notify) showToast(TEXT[currentLanguage].copied);
    return true;
  } catch {
    showToast(TEXT[currentLanguage].copyFailed);
    return false;
  }
}

function createQrCode() {
  if (typeof window.qrcode !== "function") {
    showToast(TEXT[currentLanguage].qrError);
    return;
  }

  try {
    const qr = window.qrcode(0, "H");
    qr.addData(PROFILE.cardUrl, "Byte");
    qr.make();

    elements.qrCode.innerHTML = qr.createSvgTag({
      cellSize: 8,
      margin: 32,
      scalable: true,
      title: `${PROFILE.name} vCard QR`,
      alt: `QR vCard ${PROFILE.name}`
    });
  } catch {
    showToast(TEXT[currentLanguage].qrError);
  }
}

function openQrModal() {
  previousFocus = document.activeElement;
  elements.qrModal.hidden = false;
  document.body.classList.add("modal-open");
  elements.closeQrButton.focus();
}

function closeQrModal() {
  elements.qrModal.hidden = true;
  document.body.classList.remove("modal-open");
  if (previousFocus) previousFocus.focus();
}

function saveContact(event) {
  event.preventDefault();
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  downloadBlob(blob, "Le-Trong-Ngan.vcf");
  showToast(TEXT[currentLanguage].contactSaved);
}

async function shareCard() {
  const data = {
    title: PROFILE.name,
    text: TEXT[currentLanguage].shareText,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(data);
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }

  const copied = await copyText(window.location.href, false);
  if (copied) showToast(TEXT[currentLanguage].shareCopied);
}

function downloadQrCode() {
  const sourceSvg = elements.qrCode.querySelector("svg");
  if (!sourceSvg) {
    showToast(TEXT[currentLanguage].qrError);
    return;
  }

  const svg = sourceSvg.cloneNode(true);
  svg.setAttribute("width", "1024");
  svg.setAttribute("height", "1024");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const markup = new XMLSerializer().serializeToString(svg);
  const sourceUrl = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml;charset=utf-8" }));
  const image = new Image();

  image.onload = () => {
    const canvas = document.createElement("canvas");
    const size = 1200;
    const inset = 72;
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (!context) {
      URL.revokeObjectURL(sourceUrl);
      return;
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);
    context.drawImage(image, inset, inset, size - inset * 2, size - inset * 2);

    const center = size / 2;
    context.beginPath();
    context.arc(center, center, 86, 0, Math.PI * 2);
    context.fillStyle = "#ffffff";
    context.fill();

    context.beginPath();
    context.arc(center, center, 72, 0, Math.PI * 2);
    context.strokeStyle = "#e23449";
    context.lineWidth = 10;
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#e23449";
    context.font = "700 36px Arial, sans-serif";
    context.fillText(PROFILE.initials, center, center - 14);
    context.font = "700 17px Arial, sans-serif";
    context.fillText("VCARD", center, center + 29);

    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, "QR-Le-Trong-Ngan.png");
        showToast(TEXT[currentLanguage].qrSaved);
      }
      URL.revokeObjectURL(sourceUrl);
    }, "image/png");
  };

  image.onerror = () => {
    URL.revokeObjectURL(sourceUrl);
    showToast(TEXT[currentLanguage].qrError);
  };

  image.src = sourceUrl;
}

elements.languageButton.addEventListener("click", () => {
  currentLanguage = currentLanguage === "vi" ? "en" : "vi";
  updateLanguage();
});

elements.openQrButton.addEventListener("click", openQrModal);
elements.closeQrButton.addEventListener("click", closeQrModal);
document.querySelector("[data-close-modal]").addEventListener("click", closeQrModal);
elements.downloadQrButton.addEventListener("click", downloadQrCode);
elements.shareButton.addEventListener("click", shareCard);
elements.saveContactButton.addEventListener("click", saveContact);

elements.websiteButton.addEventListener("click", () => {
  PROFILE.website
    ? window.open(PROFILE.website, "_blank", "noopener,noreferrer")
    : showToast(TEXT[currentLanguage].unavailable);
});

elements.facebookButton.addEventListener("click", () => {
  PROFILE.facebook
    ? window.open(PROFILE.facebook, "_blank", "noopener,noreferrer")
    : showToast(TEXT[currentLanguage].unavailable);
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy === "phone" ? PROFILE.phone : PROFILE.email;
    const copied = await copyText(value);

    if (copied) {
      const use = button.querySelector("use");
      button.classList.add("copied");
      use.setAttribute("href", "#icon-check");
      window.setTimeout(() => {
        button.classList.remove("copied");
        use.setAttribute("href", "#icon-copy");
      }, 1600);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.qrModal.hidden) closeQrModal();
});

updateProfile();
updateLanguage();
createQrCode();
