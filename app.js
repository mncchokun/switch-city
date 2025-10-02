// โหลด JSON แล้วสร้างการ์ดประกาศ
async function loadAnnouncements(file, targetId) {
  const res = await fetch(file);
  const data = await res.json();

  const container = document.getElementById(targetId);
  container.innerHTML = "";

  data.backups.forEach(backup => {
    backup.messages.forEach(msg => {
      const embed = msg.data.embeds[0];
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${embed.author?.name || backup.name}</h3>
        <p>${embed.description.replace(/\n/g, "<br>")}</p>
        ${embed.image ? `<img src="${embed.image.url}" alt="">` : ""}
      `;

      container.appendChild(card);
    });
  });
}

// โหลดข้อมูลจากไฟล์
loadAnnouncements("data/backups.json", "serverAnnouncements");
loadAnnouncements("data/ประกาศโทษ3แบบ.json", "punishmentAnnouncements");