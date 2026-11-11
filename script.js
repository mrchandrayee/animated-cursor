const jet = document.getElementById("jet");

let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;

let jetX = mouseX;
let jetY = mouseY;

let prevX = mouseX;
let prevY = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createSmoke(x, y, angle) {
    const smoke = document.createElement("div");
    smoke.className = "smoke";

    const offset = 28;
    const rad = (angle - 90) * Math.PI / 180;

    // little random spread for natural look
    const spread = Math.random() * 10 - 5;

    smoke.style.left =
        x - Math.cos(rad) * offset + spread + "px";
    smoke.style.top =
        y - Math.sin(rad) * offset + spread + "px";

    document.body.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1600);
}

function animate() {
    // smooth jet follow
    jetX += (mouseX - jetX) * 0.12;
    jetY += (mouseY - jetY) * 0.12;

    // angle fix
    const angle =
        Math.atan2(mouseY - jetY, mouseX - jetX) * 180 / Math.PI + 90;

    jet.style.left = jetX + "px";
    jet.style.top = jetY + "px";
    jet.style.transform =
        `translate(-50%, -50%) rotate(${angle}deg)`;

    // speed calculation
    const dx = jetX - prevX;
    const dy = jetY - prevY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // more speed = more smoke
    const smokeCount = Math.min(Math.floor(speed / 2), 8);

    for (let i = 0; i < smokeCount; i++) {
        createSmoke(jetX, jetY, angle);
    }

    prevX = jetX;
    prevY = jetY;

    requestAnimationFrame(animate);
}

animate();