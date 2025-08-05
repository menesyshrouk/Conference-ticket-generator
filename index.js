const form = document.getElementById("ticket-form");
const avatarInput = document.getElementById("avatar");

// إنشاء تذكرة فارغة ونخبيها مؤقتًا
const ticketPreview = document.createElement("div");
ticketPreview.id = "ticket-preview";
ticketPreview.className = "ticket";
ticketPreview.style.display = "none";
form.parentElement.appendChild(ticketPreview);

// عند الضغط على Submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const github = document.getElementById("github").value;
  const avatar = avatarInput.files[0];

  if (!avatar) {
    alert("Please upload an avatar image.");
    return;
  }

  if (avatar.size > 500 * 1024) {
    alert("Image size must be less than 500KB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const avatarUrl = reader.result;

    // إخفاء الفورم
    form.style.display = "none";

    // تغيير العنوان والوصف
  document.getElementById("main-heading").innerHTML = `
  <div>
    <h4 ">Congrats,<span style="color:#d05858;">  ${fullName}</span>! Your ticket is ready.</h4>
    <p style="font-size: 0.8rem;color: #767171ff; ">We've emailed your ticket to <span style="color:#d05858;">${email}</span>  and will send updates in the run up to the event.</p>
  </div>
`;

   
    document.querySelector(".subtitle").style.display = "none"; // ← التعديل هنا

    // عرض التذكرة
    ticketPreview.innerHTML = `
      <div class="ticket-left">
        <div class="mark">
          <img src="image/logo-mark.svg" />
          <h3>Coding Conf</h3>
        </div>
        <p>Jan 31, 2025 / Austin, TX</p>
        <div class="profile">
          <img src="${avatarUrl}" alt="${fullName}" />
          <div class="info">
            <h5>${fullName}</h5>
            <p>
              <i class="fa-brands fa-github"></i>
              ${github}
            </p>
          </div>
        </div>
      </div>
      <div class="ticket-right">
        <p>#010609</p>
      </div>
    `;

    ticketPreview.style.display = "flex";

    // عرض رسالة النجاح
    const message = document.getElementById("success-message");
    message.style.display = "block";
  };

  reader.readAsDataURL(avatar);
});
