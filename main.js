document.addEventListener("DOMContentLoaded", () => {
  const next1 = document.getElementById("next1");
  const next2 = document.getElementById("next2");
  const next4 = document.getElementById("next4");
  const restart = document.getElementById("restart");

  const section1 = document.getElementById("section1");
  const section2 = document.getElementById("section2");
  const section3 = document.getElementById("section3");
  const section4 = document.getElementById("section4");
  const section5 = document.getElementById("section5");
  const section6 = document.getElementById("section6");

  const usernameInput = document.getElementById("username");
  const usernameTitle = document.getElementById("usernameTitle");
  const receiverId = document.getElementById("receiverId");
  const searchUsername = document.getElementById("searchUsername");
  const finalUsername = document.getElementById("finalUsername");
  const finalAmount = document.getElementById("finalAmount");
  const finalImage = document.getElementById("finalImage");
  const loadingFill = document.getElementById("loadingFill");

  const spinner = document.getElementById("spinner");
  const checkmark = document.getElementById("checkmark");

  let selectedAmount = null;

  // Paso 1
  next1.addEventListener("click", () => {
    const adminName = usernameInput.value.trim();
    if (!adminName) return alert("Ingresa el nombre del administrador.");
    usernameTitle.textContent = adminName;
    section1.style.display = "none";
    section2.style.display = "block";
  });

  // Paso 2
  next2.addEventListener("click", () => {
    const id = receiverId.value.trim();
    const platform = document.querySelector("input[name='platform']:checked");

    if (!id || !platform) return alert("Debes ingresar el ID y seleccionar una plataforma.");

    searchUsername.textContent = `Jugador: ${id}`;
    section2.style.display = "none";
    section3.style.display = "block";

    spinner.style.display = "block";
    checkmark.style.display = "none";

    setTimeout(() => {
      spinner.style.display = "none";
      checkmark.style.display = "block";

      setTimeout(() => {
        section3.style.display = "none";
        section4.style.display = "block";
      }, 1000);
    }, 2000);
  });

  // Selección de plataforma
  document.querySelectorAll(".platforms label").forEach(label => {
    label.addEventListener("click", () => {
      document.querySelectorAll(".platforms label").forEach(l => l.classList.remove("selected"));
      label.classList.add("selected");
      label.querySelector("input").checked = true;
    });
  });

  // Selección de cantidad
  document.querySelectorAll(".options label").forEach(label => {
    label.addEventListener("click", () => {
      document.querySelectorAll(".options label").forEach(l => l.classList.remove("selected"));
      label.classList.add("selected");
      selectedAmount = label.getAttribute("data-amount");
      label.querySelector("input").checked = true;
    });
  });

  // Paso 4 -> Enviar
  next4.addEventListener("click", () => {
    if (!selectedAmount) return alert("Debes seleccionar una cantidad de Coins.");
    section4.style.display = "none";
    section5.style.display = "block";
    let progress = 0;
    loadingFill.style.width = "0%";

    const interval = setInterval(() => {
      progress += 10;
      loadingFill.style.width = progress + "%";
      if (progress >= 100) {
        clearInterval(interval);
        section5.style.display = "none";
        section6.style.display = "block";

        finalUsername.textContent = receiverId.value.trim();
        finalAmount.textContent = selectedAmount;

        // Mostrar imagen especial si es admin
        if (selectedAmount === "100000") {
          finalImage.src = "admin.png";
        } else {
          finalImage.src = "https://hilecifare.com/efootball-para-hilesi/images/coins.webp";
        }
      }
    }, 300);
  });

  // Reiniciar
  restart.addEventListener("click", () => {
    window.location.reload();
  });
});
