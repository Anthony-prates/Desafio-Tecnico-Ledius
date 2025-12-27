const botao = document.getElementById("btnCalcular");
const resultado = document.getElementById("resultado");
const inputValor = document.getElementById("valor");

// Validação do input para permitir apenas números, ponto e vírgula
inputValor.addEventListener("keypress", (e) => {
  const char = e.key;
  // Permite números (0-9), ponto (.), vírgula (,) e teclas de controle (backspace, delete, etc)
  const permitidos =
    /[0-9.,]/.test(char) ||
    e.key === "Backspace" ||
    e.key === "Delete" ||
    e.key === "Tab" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.ctrlKey ||
    e.metaKey;

  if (!permitidos) {
    e.preventDefault();
  }
});

// Previne colar caracteres inválidos
inputValor.addEventListener("paste", (e) => {
  e.preventDefault();
  const texto = (e.clipboardData || window.clipboardData).getData("text");
  // Remove tudo que não for número, ponto ou vírgula
  const textoLimpo = texto.replace(/[^0-9.,]/g, "");
  inputValor.value = textoLimpo;
});

// Valida para permitir apenas um separador decimal (ponto ou vírgula)
inputValor.addEventListener("input", (e) => {
  let valor = e.target.value;
  // Conta quantos separadores existem (ponto ou vírgula)
  const separadores = (valor.match(/[,.]/g) || []).length;
  // Se tiver mais de um separador, remove os extras
  if (separadores > 1) {
    // Mantém apenas o primeiro separador
    const primeiraVirgula = valor.indexOf(",");
    const primeiroPonto = valor.indexOf(".");
    let primeiroSeparador = -1;

    if (primeiraVirgula !== -1 && primeiroPonto !== -1) {
      primeiroSeparador = Math.min(primeiraVirgula, primeiroPonto);
    } else if (primeiraVirgula !== -1) {
      primeiroSeparador = primeiraVirgula;
    } else if (primeiroPonto !== -1) {
      primeiroSeparador = primeiroPonto;
    }

    if (primeiroSeparador !== -1) {
      const antes = valor.substring(0, primeiroSeparador + 1);
      const depois = valor
        .substring(primeiroSeparador + 1)
        .replace(/[,.]/g, "");
      valor = antes + depois;
      e.target.value = valor;
    }
  }
});

botao.addEventListener("click", async () => {
  let valor = inputValor.value.trim();
  const metodo = document.getElementById("metodo").value;

  // Normaliza o valor (substitui vírgula por ponto se ainda houver)
  valor = valor.replace(/,/g, ".");

  // Validação simples no frontend
  if (valor === "" || metodo === "") {
    resultado.innerText = "Preencha todos os campos.";
    resultado.style.color = "red";
    return;
  }

  // Converte valor para número para validação
  const valorNumerico = parseFloat(valor);

  // Validação específica para PIX: valor deve ser maior que R$ 0,40
  if (metodo === "pix" && (isNaN(valorNumerico) || valorNumerico <= 0.4)) {
    resultado.innerText =
      "Para pagamento via PIX, o valor deve ser maior que R$ 0,40";
    resultado.style.color = "red";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/calcular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: valor,
        metodo: metodo,
      }),
    });

    const data = await response.json();

    if (response.ok && data.valor_liquido !== undefined) {
      resultado.innerHTML = `
        <div style="margin-bottom: 12px;">
          <strong>Valor líquido:</strong> R$ ${data.valor_liquido.toFixed(2)}
        </div>
        <div style="font-size: 14px; color: rgba(255, 255, 255, 0.7);">
          <strong>Desconto aplicado:</strong> R$ ${data.desconto.toFixed(2)}
        </div>
      `;
      resultado.style.color = "#ffffff";
    } else {
      resultado.innerText = data.erro || "Erro inesperado";
      resultado.style.color = "red";
    }
  } catch (error) {
    resultado.innerText = "Erro ao conectar com o servidor.";
    resultado.style.color = "red";
  }
});
