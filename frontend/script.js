const botao = document.getElementById("btnCalcular");
const resultado = document.getElementById("resultado");
const inputValor = document.getElementById("valor");

// URL do backend - pode ser alterada facilmente para diferentes ambientes
const API_URL = "http://127.0.0.1:5000";

// Inicializa o campo com "R$ 0,00" quando a página carrega
// Usa setTimeout para garantir que o DOM esteja pronto mesmo com defer
setTimeout(() => {
  if (
    inputValor &&
    (inputValor.value === "" || !inputValor.value.startsWith("R$ "))
  ) {
    inputValor.value = "R$ 0,00";
  }
}, 0);

// Função para formatar valor como moeda brasileira (R$ 1.000,00)
function formatarMoeda(valor) {
  // Remove tudo que não for número
  let apenasNumeros = valor.replace(/\D/g, "");

  // Se não houver números, retorna vazio
  if (apenasNumeros === "") {
    return "";
  }

  // Converte para número e divide por 100 para ter decimais
  const numero = parseFloat(apenasNumeros) / 100;

  // Formata como moeda brasileira
  return numero.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Função para remover formatação e retornar apenas números (com ponto decimal)
function removerFormatacao(valor) {
  // Remove tudo que não for número
  let apenasNumeros = valor.replace(/\D/g, "");

  if (apenasNumeros === "") {
    return "";
  }

  // Divide por 100 para ter decimais corretos
  const numero = parseFloat(apenasNumeros) / 100;
  return numero.toString();
}

// Formata o valor enquanto o usuário digita
inputValor.addEventListener("input", (e) => {
  const input = e.target;
  const valorAtual = input.value;

  // Salva posição do cursor antes da formatação
  const posicaoCursorAntes = input.selectionStart || 0;

  // Remove tudo exceto números
  const apenasNumeros = valorAtual.replace(/\D/g, "");

  // Se não houver números, define como "0,00"
  if (apenasNumeros === "" || apenasNumeros === "0") {
    input.value = "R$ 0,00";
    input.setSelectionRange(3, 3);
    return;
  }

  // Conta quantos dígitos existem antes da posição do cursor
  let digitosAntesCursor = 0;
  for (let i = 0; i < posicaoCursorAntes && i < valorAtual.length; i++) {
    if (/\d/.test(valorAtual[i])) {
      digitosAntesCursor++;
    }
  }

  // Formata o valor (divide por 100 para ter decimais)
  const numero = parseFloat(apenasNumeros) / 100;
  const valorFormatado = numero.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const valorCompleto = "R$ " + valorFormatado;

  // Atualiza o valor
  input.value = valorCompleto;

  // Calcula nova posição do cursor
  // Conta dígitos até encontrar o dígito correspondente à posição anterior
  let novaPosicao = 3; // Começa após "R$ "
  let digitosEncontrados = 0;

  for (let i = 3; i < valorCompleto.length; i++) {
    if (/\d/.test(valorCompleto[i])) {
      digitosEncontrados++;
      if (digitosEncontrados > digitosAntesCursor) {
        novaPosicao = i;
        break;
      }
      novaPosicao = i + 1;
    }
  }

  // Garante que o cursor não fique antes de "R$ "
  novaPosicao = Math.max(3, Math.min(novaPosicao, valorCompleto.length));

  // Atualiza a posição do cursor
  input.setSelectionRange(novaPosicao, novaPosicao);
});

// Validação do input para permitir apenas números e teclas de controle
inputValor.addEventListener("keypress", (e) => {
  const char = e.key;
  // Permite apenas números (0-9) e teclas de controle
  const permitidos =
    /[0-9]/.test(char) ||
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

// Previne colar caracteres inválidos e formata o valor colado
inputValor.addEventListener("paste", (e) => {
  e.preventDefault();
  const texto = (e.clipboardData || window.clipboardData).getData("text");
  // Remove tudo que não for número
  const textoLimpo = texto.replace(/\D/g, "");

  if (textoLimpo) {
    const valorFormatado = formatarMoeda(textoLimpo);
    inputValor.value = valorFormatado ? "R$ " + valorFormatado : "";
    // Coloca o cursor no final
    inputValor.setSelectionRange(
      inputValor.value.length,
      inputValor.value.length
    );
  }
});

// Garante que "R$ 0,00" esteja presente quando o campo recebe foco
inputValor.addEventListener("focus", (e) => {
  const valorAtual = e.target.value;
  // Se estiver vazio ou não começar com "R$ ", inicializa com "R$ 0,00"
  if (valorAtual === "" || !valorAtual.startsWith("R$ ")) {
    e.target.value = "R$ 0,00";
    e.target.setSelectionRange(3, 3);
  } else {
    // Se já tiver "R$ " mas não tiver valor, adiciona "0,00"
    const apenasNumeros = valorAtual.replace(/\D/g, "");
    if (apenasNumeros === "" || apenasNumeros === "0") {
      e.target.value = "R$ 0,00";
      e.target.setSelectionRange(3, 3);
    }
  }
});

// Previne seleção/digitação antes de "R$ "
inputValor.addEventListener("click", (e) => {
  if (e.target.selectionStart < 3) {
    e.target.setSelectionRange(3, 3);
  }
});

inputValor.addEventListener("keydown", (e) => {
  const input = e.target;
  const posicaoCursor = input.selectionStart || 0;

  // Move cursor para depois de "R$ " se tentar digitar antes
  if (posicaoCursor < 3 && e.key.length === 1) {
    e.preventDefault();
    input.setSelectionRange(3, 3);
  }

  // Previne Backspace antes de "R$ "
  if (e.key === "Backspace" && posicaoCursor <= 3) {
    e.preventDefault();
    // Se tentar apagar tudo, volta para "R$ 0,00"
    if (
      input.value.replace(/\D/g, "") === "" ||
      input.value.replace(/\D/g, "") === "0"
    ) {
      input.value = "R$ 0,00";
      input.setSelectionRange(3, 3);
    }
  }
});

botao.addEventListener("click", async () => {
  let valor = inputValor.value.trim();
  const metodo = document.getElementById("metodo").value;

  // Remove a formatação e converte para número (string com ponto decimal)
  valor = removerFormatacao(valor);

  // Validação simples no frontend
  if (valor === "" || metodo === "") {
    resultado.innerText = "Preencha todos os campos.";
    resultado.style.color = "red";
    return;
  }

  // Converte valor para número para validação
  const valorNumerico = parseFloat(valor);

  // Valida se o valor é um número válido
  if (isNaN(valorNumerico) || valorNumerico <= 0) {
    resultado.innerText = "Digite um valor válido maior que zero.";
    resultado.style.color = "red";
    return;
  }

  // Validação específica para PIX: valor deve ser maior que R$ 0,40
  if (metodo === "pix" && valorNumerico <= 0.4) {
    resultado.innerText =
      "Para pagamento via PIX, o valor deve ser maior que R$ 0,40";
    resultado.style.color = "red";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/calcular`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: valor,
        metodo: metodo,
      }),
    });

    // Verifica se a resposta é JSON válido
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      resultado.innerText = "Erro: resposta inválida do servidor.";
      resultado.style.color = "red";
      console.error("Erro ao parsear JSON:", jsonError);
      return;
    }

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
    // Tratamento mais específico de erros
    if (error instanceof TypeError && error.message.includes("fetch")) {
      resultado.innerText =
        "Erro ao conectar com o servidor. Verifique se o backend está rodando.";
    } else {
      resultado.innerText = "Erro ao processar a requisição. Tente novamente.";
    }
    resultado.style.color = "red";
    console.error("Erro:", error);
  }
});
