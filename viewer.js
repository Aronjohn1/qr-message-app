const params = new URLSearchParams(location.search);
const id = params.get("id");
const data = JSON.parse(localStorage.getItem(id));
if (!data) {
  document.body.innerHTML = "<h2 style='color: red;'>❌ Message not found.</h2>";
  throw new Error("Message not found");
}




document.getElementById("theTitle").textContent = data.title || "🎁 A Special Message";
document.getElementById("theMessage").textContent = data.message;


let index = 0;
const mediaDiv = document.getElementById("mediaContainer");

function showNext() {
if (index >= data.files.length) return;
mediaDiv.innerHTML = "";

const file = data.files[index];
const isImg = file.startsWith("data:image");

const el = document.createElement(isImg ? "img" : "video");
el.src = file;
el.className = "media";
if (!isImg) el.controls = true;

mediaDiv.appendChild(el);
index++;
setTimeout(showNext, 4000);
}

showNext();

