# Simulador de Taxas de Pagamento

## Projeto Ledius

## Licença
Este projeto está licenciado sob a licença MIT.

---

**Desenvolvedor:** Anthony Prates  
**Data:** 2025
**Tecnologias:** Python, Flask, HTML, CSS, JavaScript

---

## 1. Introdução

Este documento apresenta o **Simulador de Taxas de Pagamento**, uma aplicação web desenvolvida para calcular valores líquidos após a aplicação de taxas específicas para diferentes métodos de pagamento (PIX, Débito e Crédito). O projeto demonstra habilidades em desenvolvimento full-stack, criando uma solução prática e profissional utilizando tecnologias modernas.

---

## 2. Visão Geral do Projeto

O Simulador de Taxas é uma aplicação web responsiva que permite aos usuários inserir um valor de venda e escolher um método de pagamento, recebendo como resultado o valor líquido após o desconto das taxas correspondentes.

### Objetivos do Projeto

- **Calcular taxas de pagamento** de forma precisa e em tempo real
- **Fornecer interface intuitiva** e moderna para o usuário
- **Implementar validações robustas** tanto no frontend quanto no backend
- **Garantir segurança** através de tratamento adequado de erros
- **Demonstrar boas práticas** de desenvolvimento web

---

## 3. Tecnologias Utilizadas

### Backend

- **Python 3.x**: Linguagem de programação principal
- **Flask**: Micro-framework web leve e flexível para criar a API REST
- **Flask-CORS**: Extensão para permitir requisições cross-origin do frontend

### Frontend

- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript (ES6+)**: Lógica de interação e comunicação com API
- **Google Fonts (Inter)**: Tipografia moderna e profissional

### Arquitetura

- **Arquitetura RESTful**: API REST para comunicação entre frontend e backend
- **Separação de responsabilidades**: Frontend e backend completamente separados
- **Design Responsivo**: Interface adaptável a diferentes tamanhos de tela

---

## 4. Estrutura do Projeto

```
projeto-ledius/
│
├── backend/
│   ├── app.py                 # Aplicação Flask principal
│   └── requeriments.txt       # Dependências Python
│
└── frontend/
    ├── index.html             # Estrutura HTML
    ├── style.css              # Estilos CSS
    ├── script.js              # Lógica JavaScript
    └── assets/
        └── ledius.png         # Logo da aplicação
```

### Descrição dos Componentes

#### Backend (`app.py`)

- **Função `calcular_desconto()`**: Calcula descontos baseados no método de pagamento
- **Rota `/calcular`**: Endpoint REST que recebe requisições POST e retorna cálculos em JSON
- **Validações robustas**: Verificação de tipos, valores e métodos de pagamento
- **Tratamento de erros**: Respostas HTTP apropriadas com mensagens descritivas

#### Frontend

- **`index.html`**: Interface do usuário com formulário de entrada
- **`style.css`**: Design moderno com tema escuro, gradientes e animações suaves
- **`script.js`**: Validação de entrada, comunicação com API e atualização dinâmica da interface

---

## 5. Funcionalidades Principais

### 5.1. Cálculo de Taxas

A aplicação calcula descontos baseados em três métodos de pagamento:

- **PIX**: Taxa fixa de R$ 0,40
- **Débito**: Taxa de 3% sobre o valor da venda
- **Crédito**: Taxa de 5% sobre o valor da venda

### 5.2. Validações Implementadas

#### No Frontend:

- Validação de campos obrigatórios
- Validação de formato numérico (apenas números, ponto e vírgula)
- Validação específica para PIX (valor mínimo maior que R$ 0,40)
- Prevenção de entrada de caracteres inválidos
- Tratamento de erros de conexão

#### No Backend:

- Validação de Content-Type (deve ser JSON)
- Validação de presença de dados
- Validação de tipos de dados (valor numérico)
- Validação de valores positivos
- Validação de método de pagamento válido
- Validação específica para regras de negócio (PIX)
- Garantia de que valor líquido nunca seja negativo

### 5.3. Interface do Usuário

- **Design Moderno**: Tema escuro profissional com gradientes sutis
- **Responsividade**: Adaptável a diferentes tamanhos de tela
- **Feedback Visual**: Animações suaves e estados de hover/focus
- **Acessibilidade**: Labels apropriados e navegação por teclado
- **UX Otimizada**: Validações em tempo real e mensagens de erro claras

---

## 6. Destaques Técnicos

### 6.1. Boas Práticas de Código

- **Constantes configuráveis**: Taxas definidas como constantes no topo do código
- **Funções reutilizáveis**: Lógica de cálculo separada em função dedicada
- **Documentação**: Docstrings explicando parâmetros e retornos
- **Código limpo**: Estrutura organizada e fácil manutenção
- **Tratamento de exceções**: Try/catch para operações que podem falhar

### 6.2. Segurança

- **Validação em múltiplas camadas**: Frontend e backend
- **Sanitização de entrada**: Normalização de dados antes do processamento
- **Proteção contra valores negativos**: Garantia de cálculos válidos
- **CORS configurado**: Controle de acesso cross-origin

### 6.3. Performance

- **Código otimizado**: Operações eficientes e mínimas requisições
- **CSS otimizado**: Estilos organizados e sem redundâncias
- **Fontes otimizadas**: Uso de Google Fonts com preconnect

### 6.4. Manutenibilidade

- **Separação de responsabilidades**: Backend e frontend independentes
- **Código documentado**: Comentários explicativos onde necessário
- **Estrutura modular**: Fácil adicionar novos métodos de pagamento
- **Validações centralizadas**: Fácil ajustar regras de negócio

---

## 7. Como Executar o Projeto

### Pré-requisitos

- Python 3.7 ou superior
- Navegador web moderno (Chrome, Firefox, Edge, Safari, Brave)

### Instalação e Execução

#### Backend

1. Navegue até a pasta do backend:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   pip install -r requeriments.txt
   ```

3. Execute a aplicação:

   ```bash
   python app.py
   ```

4. O servidor estará disponível em: `http://127.0.0.1:5000`

#### Frontend

1. Abra o arquivo `index.html` em um navegador web
2. Ou use um servidor local (recomendado):

   ```bash
   # Usando Python
   python -m http.server 8000

   # Ou usando Node.js (http-server)
   npx http-server
   ```

3. Acesse: `http://localhost:8000`

### Testando a Aplicação

1. Abra a aplicação no navegador
2. Digite um valor de venda (ex: 100,00)
3. Selecione um método de pagamento (PIX, Débito ou Crédito)
4. Clique em "Calcular Líquido"
5. Veja o resultado com o valor líquido e desconto aplicado

---

## 8. Exemplos de Uso

### Exemplo 1: Pagamento via PIX

- **Valor de venda**: R$ 100,00
- **Método**: PIX
- **Desconto**: R$ 0,40 (taxa fixa)
- **Valor líquido**: R$ 99,60

### Exemplo 2: Pagamento via Débito

- **Valor de venda**: R$ 100,00
- **Método**: Débito
- **Desconto**: R$ 3,00 (3%)
- **Valor líquido**: R$ 97,00

### Exemplo 3: Pagamento via Crédito

- **Valor de venda**: R$ 100,00
- **Método**: Crédito
- **Desconto**: R$ 5,00 (5%)
- **Valor líquido**: R$ 95,00

---

## 9. Considerações Finais

### Pontos Fortes do Projeto

✅ **Arquitetura bem estruturada** com separação clara entre frontend e backend  
✅ **Validações robustas** em múltiplas camadas  
✅ **Interface moderna e responsiva** com design profissional  
✅ **Código limpo e documentado** seguindo boas práticas  
✅ **Tratamento adequado de erros** com mensagens claras  
✅ **Fácil manutenção e extensão** para adicionar novas funcionalidades

### Aprendizados e Desafios

Este projeto demonstrou a capacidade de:

- Desenvolver uma aplicação full-stack completa
- Implementar validações de dados em múltiplas camadas
- Criar interfaces modernas e responsivas
- Trabalhar com APIs REST
- Aplicar boas práticas de desenvolvimento
- Resolver problemas de UX (validação de entrada, feedback visual)

---

## 10. Conclusão

O **Simulador de Taxas de Pagamento** é um projeto que demonstra habilidades práticas em desenvolvimento web full-stack, desde a criação de uma API REST robusta até o desenvolvimento de uma interface de usuário moderna e intuitiva. O projeto segue boas práticas de desenvolvimento, implementa validações adequadas e apresenta um código limpo e bem documentado.

Este projeto é um exemplo claro de como combinar tecnologias modernas para criar soluções práticas e profissionais, demonstrando capacidade técnica e atenção aos detalhes essenciais para um desenvolvedor.

---

**Obrigado pela atenção!**

