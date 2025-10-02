// โหลด JSON แล้วสร้างการ์ดประกาศ
async function loadAnnouncements(file, targetId) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error("HTTP " + res.status);
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
  } catch (err) {
    document.getElementById(targetId).innerHTML =
      `<p style="color:red;">❌ โหลด ${file} ไม่ได้ (${err.message})</p>`;
  }
}

// โหลดข้อมูลจากไฟล์ (ชื่อใหม่)
loadAnnouncements("data/server.json", "serverAnnouncements");
loadAnnouncements("data/punishments.json", "punishmentAnnouncements");
