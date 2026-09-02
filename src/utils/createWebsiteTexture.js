import * as THREE from "three";

const WIDTH = 960;
const HEIGHT = 600;

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.closePath();
}

function drawHeader(context, website, index) {
  const { foreground, accent } = website.palette;
  context.fillStyle = foreground;
  context.font = "600 18px Arial, sans-serif";
  context.fillText(website.title.toUpperCase(), 62, 64);

  context.globalAlpha = 0.68;
  context.font = "500 15px Arial, sans-serif";
  context.fillText("INDEX", 748, 64);
  context.fillText(String(index + 1).padStart(2, "0"), 850, 64);
  context.globalAlpha = 1;

  context.fillStyle = accent;
  context.fillRect(62, 88, 836, 2);
}

function drawArchitecture(context, website) {
  const { foreground, accent, secondary } = website.palette;
  context.fillStyle = foreground;
  context.font = "600 69px Georgia, serif";
  context.fillText("Spaces for", 62, 188);
  context.font = "italic 68px Georgia, serif";
  context.fillText("quiet living.", 62, 258);

  context.fillStyle = secondary;
  context.fillRect(548, 130, 350, 376);
  context.fillStyle = accent;
  context.beginPath();
  context.moveTo(584, 470);
  context.lineTo(704, 190);
  context.lineTo(862, 470);
  context.closePath();
  context.fill();
  context.fillStyle = website.palette.background;
  context.fillRect(682, 330, 72, 140);

  context.fillStyle = foreground;
  context.font = "500 17px Arial, sans-serif";
  context.fillText("Residential · Cultural · Spatial", 62, 530);
}

function drawAI(context, website) {
  const { foreground, accent, secondary } = website.palette;
  const gradient = context.createRadialGradient(682, 310, 10, 682, 310, 245);
  gradient.addColorStop(0, accent);
  gradient.addColorStop(0.42, secondary);
  gradient.addColorStop(1, website.palette.background);
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(690, 316, 228, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = accent;
  context.globalAlpha = 0.6;
  for (let radius = 54; radius < 220; radius += 34) {
    context.beginPath();
    context.arc(690, 316, radius, 0, Math.PI * 2);
    context.stroke();
  }
  context.globalAlpha = 1;

  context.fillStyle = foreground;
  context.font = "600 76px Arial, sans-serif";
  context.fillText("Think", 62, 240);
  context.fillText("beyond.", 62, 316);
  context.font = "400 18px Arial, sans-serif";
  context.fillText("Adaptive intelligence for ambitious teams.", 66, 380);

  context.fillStyle = accent;
  roundedRect(context, 62, 448, 188, 48, 24);
  context.fill();
  context.fillStyle = website.palette.background;
  context.font = "600 15px Arial, sans-serif";
  context.fillText("EXPLORE PLATFORM", 84, 479);
}

function drawEstate(context, website) {
  const { foreground, accent, secondary } = website.palette;
  context.fillStyle = secondary;
  context.fillRect(62, 122, 836, 326);

  const sky = context.createLinearGradient(0, 122, 0, 448);
  sky.addColorStop(0, "#aaa99f");
  sky.addColorStop(1, "#e5ddcc");
  context.fillStyle = sky;
  context.fillRect(62, 122, 836, 326);

  context.fillStyle = "#4b4a42";
  context.fillRect(460, 238, 356, 178);
  context.fillStyle = "#77786e";
  context.fillRect(510, 190, 258, 84);
  context.fillStyle = "#ddd8cb";
  for (let x = 486; x < 790; x += 72) context.fillRect(x, 280, 44, 104);
  context.fillStyle = accent;
  context.fillRect(62, 410, 836, 38);

  context.fillStyle = foreground;
  context.font = "italic 48px Georgia, serif";
  context.fillText("A life less ordinary", 62, 518);
  context.font = "500 15px Arial, sans-serif";
  context.fillText("PRIVATE COLLECTION · WORLDWIDE", 648, 516);
}

function drawCreative(context, website) {
  const { foreground, accent, secondary } = website.palette;
  context.fillStyle = foreground;
  context.font = "900 106px Arial, sans-serif";
  context.fillText("MAKE", 54, 230);
  context.fillText("NOISE", 54, 334);

  context.save();
  context.translate(698, 302);
  context.rotate(-0.18);
  context.fillStyle = secondary;
  roundedRect(context, -142, -176, 284, 352, 8);
  context.fill();
  context.fillStyle = accent;
  context.beginPath();
  context.arc(0, -22, 91, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = foreground;
  context.lineWidth = 8;
  context.strokeRect(-94, 94, 188, 4);
  context.restore();

  context.fillStyle = foreground;
  context.font = "600 17px Arial, sans-serif";
  context.fillText("BRAND · DIGITAL · EXPERIENCE", 62, 526);
}

function drawTechnology(context, website) {
  const { foreground, accent, secondary } = website.palette;
  context.fillStyle = foreground;
  context.font = "600 72px Arial, sans-serif";
  context.fillText("Tomorrow,", 62, 208);
  context.fillText("delivered.", 62, 280);
  context.font = "400 18px Arial, sans-serif";
  context.fillText("A better operating layer for modern companies.", 66, 338);

  context.strokeStyle = secondary;
  context.lineWidth = 2;
  for (let x = 590; x <= 890; x += 50) {
    context.beginPath();
    context.moveTo(x, 130);
    context.lineTo(x, 480);
    context.stroke();
  }
  for (let y = 130; y <= 480; y += 50) {
    context.beginPath();
    context.moveTo(540, y);
    context.lineTo(890, y);
    context.stroke();
  }
  context.fillStyle = accent;
  context.beginPath();
  context.arc(716, 298, 116, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = website.palette.background;
  context.font = "700 54px Arial, sans-serif";
  context.textAlign = "center";
  context.fillText("S/01", 716, 316);
  context.textAlign = "left";

  context.fillStyle = accent;
  roundedRect(context, 62, 430, 170, 48, 24);
  context.fill();
  context.fillStyle = "#ffffff";
  context.font = "600 15px Arial, sans-serif";
  context.fillText("VIEW SYSTEM", 88, 461);
}

const layouts = {
  architecture: drawArchitecture,
  ai: drawAI,
  estate: drawEstate,
  creative: drawCreative,
  technology: drawTechnology,
};

export function createWebsiteTexture(website, index, anisotropy = 4) {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = website.palette.background;
  roundedRect(context, 4, 4, WIDTH - 8, HEIGHT - 8, 34);
  context.fill();

  drawHeader(context, website, index);
  layouts[website.layout](context, website);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
