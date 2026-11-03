# 🎲 Missão Dezembro 2026 — O Tabuleiro Gamificado da Equipe

Um jogo de tabuleiro interativo no estilo **Ludo** projetado para engajar, motivar e acompanhar em tempo real as metas das 4 frentes do time rumo à grande conquista de **Dezembro de 2026**! 🏁✨

---

## 🎨 As Frentes e Pistas do Tabuleiro

Cada time possui seu próprio **QG (Base)**, seu **Pino 3D estilizado**, sua **pista de 5 casas** e suas metas específicas:

| Cor | Frente | Metas |
| :--- | :--- | :--- |
| 🌿 **Verde** | **Projetos** | 1. Prospecção de tomotoy<br>2. Prospecção de ilustrações<br>3. Branding megara<br>4. Ruella<br>5. Portfolio de fotografia leticia |
| 🔥 **Vermelho** | **Mídias** | 1. 500 seguidores<br>2. 33 posts<br>3. 198 stories<br>4. Aumentar engajamento para 30%<br>5. Estimular equipe a engajar |
| 💎 **Azul** | **Zelo** | 1. Arrecadar pagamentos<br>2. Apresentação padrão<br>3. Alertas das próximas reuniões<br>4. Ata das reuniões<br>5. Reunião de encerramento com report |
| 🛍️ **Amarelo** | **Loja** | 1. Apresentar plano de produtos<br>2. Agendar planejamento de campanha<br>3. Agendar início de campanha de venda<br>4. Fluxo logístico de venda<br>5. Fluxo de atendimento |

🎯 **Centro do Tabuleiro (Grande Chegada):**
Conforme cada frente conclui suas 5 etapas, seu pino sobe para o Pódio Central em **Dezembro de 2026**. Quando todas as 20 metas coletivas forem batidas, uma grande celebração cinematográfica de vitória com fogos, confetes e fanfarra é acionada!

---

## 🚀 Como Funciona a Sincronização em Tempo Real (GitHub Pages)

### Dá para fazer sincronização em tempo real no GitHub Pages?
**SIM, 100%!** 
O GitHub Pages é uma hospedagem estática gratuita (serve HTML, CSS e JavaScript), o que significa que ele não roda servidores próprios com banco de dados ou Node.js. 

Para que **uma pessoa marcando uma tarefa veja a reação se propagar instantaneamente na tela dos colegas conectados em seus computadores**, nós implementamos um sistema de **dupla camada de sincronização**:

### 1. Modo Local Imediato (Zero Configuração — BroadcastChannel)
- Funciona direto no seu navegador sem precisar cadastrar nada!
- Se você abrir o `index.html` em duas ou mais abas ou janelas no seu computador, qualquer tarefa que você marcar em uma aba faz o pino pular, o som tocar e os confetes estourarem na outra aba na mesma hora!

### 2. Modo Nuvem em Tempo Real para o Time Remoto (Firebase Realtime Database — Gratuito)
Para que a sua equipe inteira acesse pelo link do **GitHub Pages** de qualquer lugar e sincronize ao vivo:
1. Acesse o [Firebase Console](https://console.firebase.google.com) (grátis com conta Google).
2. Clique em **"Adicionar projeto"** (ex: `tabuleiro-missao-2026`).
3. No menu lateral esquerdo, vá em **Criação** -> **Realtime Database** -> clique em **Criar banco de dados**.
4. Escolha qualquer localização (ex: Estados Unidos) e selecione **"Iniciar no modo de teste"** (para permitir leitura e escrita imediata do time).
5. Vá nas **Configurações do Projeto** (ícone de engrenagem no topo) -> Geral -> Na seção "Seus aplicativos", clique no ícone da Web (`</>`), dê um nome e copie o objeto `firebaseConfig`.
6. Você pode conectar de duas formas:
   - **Opção A (Pelo próprio site):** Clique no botão **`⚙️ Sincronização`** no cabeçalho do jogo e cole o JSON.
   - **Opção B (No código):** Abra o arquivo `config.js` e cole o objeto na variável `window.FIREBASE_CONFIG`. Salve e suba para o GitHub!

---

## 📦 Como Publicar no GitHub Pages (Passo a Passo)

1. Crie um novo repositório no GitHub (ex: `missao-2026-tabuleiro`).
2. Suba todos os arquivos desta pasta:
   ```bash
   git init
   git add .
   git commit -m "feat: Tabuleiro gamificado Missão Dezembro 2026"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
3. No GitHub, vá na aba **Settings** do seu repositório.
4. No menu lateral esquerdo, clique em **Pages**.
5. Em **Source**, selecione **Deploy from a branch** -> Branch: **`main`** / Folder: **`/ (root)`** -> clique em **Save**.
6. Aguarde cerca de 1 a 2 minutos. O GitHub Pages fornecerá o link público (ex: `https://seu-usuario.github.io/seu-repositorio/`).
7. Compartilhe o link com sua equipe! 🚀

---

## 🎮 Recursos de Gamificação Incluídos

- **Pinos 3D com Física de Salto:** Quando uma meta é concluída, o pino do respectivo time pula e avança para a próxima casa da pista com som suave e animação elástica.
- **Banco de Mensagens Divertidas:** Cada uma das 20 metas possui uma mensagem personalizada cheia de humor, afeto e energia para parabenizar a frente responsável.
- **Áudio Sintetizado Retrô (Web Audio API):** Efeitos de som de videogame (passos dos pinos, arpeggio de tarefa concluída, barulho de dados rolando e fanfarra final) sem precisar de arquivos externos de áudio.
- **Dado da Motivação Interativo:** Botão "Rolar Dado" no cabeçalho que pode ser usado em reuniões de alinhamento com provocações leves e divertidas.
- **Feed de Atividades em Tempo Real:** Painel lateral direito que exibe o histórico de conquistas com horário e nome do time.
- **Celebração Final:** Quando a meta de 20/20 tarefas for alcançada, o pódio dourado se ilumina com confetes e fanfarra!
