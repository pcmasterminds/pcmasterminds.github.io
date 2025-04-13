let mode = "codificar";

function toggleAction() {
  const btn = document.getElementById("toggle-btn");
  const modeText = document.getElementById("mode-indicator");

  if (mode === "codificar") {
    mode = "decodificar";
    btn.innerText = "Cambiar a Codificar";
  } else {
    mode = "codificar";
    btn.innerText = "Cambiar a Decodificar";
  }

  modeText.innerText = `Modo: ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
}

function processText() {
  const input = document.getElementById("input-text").value;
  let output = "";

  try {
    if (mode === "codificar") {
      output = btoa(unescape(encodeURIComponent(input)));
    } else {
      output = decodeURIComponent(escape(atob(input)));
    }
  } catch (err) {
    output = "⚠️ Error al procesar el texto. Verifica el formato.";
  }

  animateText(output);
}

function animateText(text) {
  let t = document.getElementById("output-text");
  t.value = "";
  let n = 0;
  !(function o() {
    n < text.length && ((t.value += text.charAt(n)), n++, setTimeout(o, 50));
  })();
}

function copyToClipboard() {
  const outputText = document.getElementById("output-text").value;

  if (outputText.trim() === "") {
    alert("⚠️ No hay texto para copiar."); // Mensaje de alerta para el usuario
    return;
  }

  // Asegurarse de que el elemento esté visible y enfocado
  const outputElement = document.getElementById("output-text");
  outputElement.focus();
  outputElement.select();

  navigator.clipboard.writeText(outputText).then(() => {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000); // El mensaje desaparece después de 3 segundos
  }).catch(err => {
    console.error("Error al copiar el texto: ", err);
    alert("⚠️ No se pudo copiar el texto. Intenta nuevamente.");
  });
}

// Asegurarse de que el evento esté correctamente registrado
document.getElementById("copy-btn").addEventListener("click", copyToClipboard);
