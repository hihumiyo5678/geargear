const app = document.getElementById("app");
const addGearButton = document.getElementById("addGear");

function createGear() {
  const size = Math.random() * 50 + 50;
  const teeth = Math.floor(Math.random() * 10) + 10;
  const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", `-1 -1 2 2`);

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", 0);
  circle.setAttribute("cy", 0);
  circle.setAttribute("r", 0.1);
  circle.setAttribute("fill", color);

  const gear = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const angle = (2 * Math.PI) / teeth;

  let d = "";
  for (let i = 0; i < teeth * 2; i++) {
    const r = i % 2 === 0 ? 0.9 : 1;
    const x = r * Math.cos(i * angle / 2);
    const y = r * Math.sin(i * angle / 2);
    d += (i === 0 ? "M" : "L") + `${x},${y}`;
  }
  d += "Z";

  gear.setAttribute("d", d);
  gear.setAttribute("fill", color);

  svg.appendChild(circle);
  svg.appendChild(gear);
  app.appendChild(svg);

  return { element: svg, size: size };
}

function animateGear(gear) {
  const rotationSpeed = Math.random() * 0.1 + 0.1;
  const direction = Math.random() > 0.5 ? 1 : -1;

  function rotate() {
    const currentRotation = parseFloat(gear.element.style.transform.replace(/[^\d.-]/g, "")) || 0;
    const newRotation = currentRotation + rotationSpeed * direction;
    gear.element.style.transform = `rotate(${newRotation}deg)`;
    requestAnimationFrame(rotate);
  }

  requestAnimationFrame(rotate);
}

addGearButton.addEventListener("click", function () {
  const gear = createGear();
  animateGear(gear);
});
