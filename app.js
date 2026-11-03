/**
 * app.js - Lógica Central do Tabuleiro Gamificado Missão Dezembro 2026
 * 
 * Gerencia:
 * - Estrutura de dados das frentes e tarefas
 * - Movimentação visual dos pinos no tabuleiro Ludo
 * - Banco de mensagens engraçadas e motivacionais
 * - Efeitos sonoros via Web Audio API (sem dependência de arquivos externos)
 * - Efeitos visuais de confete (canvas-confetti)
 * - Integração bidirecional com a camada sync.js (tempo real)
 */

// ==========================================================================
// DADOS DAS FRENTES, TAREFAS E MENSAGENS ENGRAÇADAS
// ==========================================================================

const GAME_DATA = {
  green: {
    id: 'green',
    name: 'Projetos',
    color: '#10b981',
    emoji: '🌿',
    tasks: [
      {
        id: 'green_1',
        title: 'Finalizar prospecção de tomotoy',
        cheer: '🎯 Prospecção de Tomotoy concluída! Nem o LinkedIn aguentou tanta lábia executiva e foco no resultado!',
        diceCheer: 'Time Projetos tá voando! O Tomotoy já tá no papo!'
      },
      {
        id: 'green_2',
        title: 'Finalizar prospecção de ilustrações',
        cheer: '🎨 Ilustrações prospectadas! O bom gosto desse time deveria pagar imposto de tão fino!',
        diceCheer: 'Se a arte fizesse barulho, os vizinhos já tinham chamado a polícia de tanto que brilhamos!'
      },
      {
        id: 'green_3',
        title: 'Finalizar branding megara',
        cheer: '👑 Branding Megara entregue com padrão de cinema! Pode chamar os investidores que a régua subiu!',
        diceCheer: 'Megara agora tem alma, identidade e respeito na praça!'
      },
      {
        id: 'green_4',
        title: 'Finalizar ruella',
        cheer: '✨ Ruella finalizada! A entrega foi tão redonda que merecia virar estudo de caso em Harvard!',
        diceCheer: 'Ruella tá um espetáculo! Segura essa frente de projetos!'
      },
      {
        id: 'green_5',
        title: 'Finalizar portfolio de fotografia leticia',
        cheer: '📸 Portfolio da Letícia finalizado! As fotos ficaram tão impecáveis que o feed do Instagram vai até travar!',
        diceCheer: 'Letícia tem fotos que curam até dor de coluna! Que orgulho!'
      }
    ]
  },

  red: {
    id: 'red',
    name: 'Mídias',
    color: '#f43f5e',
    emoji: '🔥',
    tasks: [
      {
        id: 'red_1',
        title: 'Alcançar 500 seguidores',
        cheer: '🚀 500 seguidores conquistados! O algoritmo do Instagram tentou sabotar, mas nós somos mais teimosos que ele!',
        diceCheer: '500 almas no nosso culto de engajamento! Quem segura?!'
      },
      {
        id: 'red_2',
        title: 'Alcançar 33 posts',
        cheer: '📰 33 posts na timeline! Mark Zuckerberg acabou de ligar querendo saber qual é o segredo do nosso ritmo!',
        diceCheer: '33 posts de puro suco de criatividade e design sem dó!'
      },
      {
        id: 'red_3',
        title: 'Finalizar 198 stories',
        cheer: '📱 198 stories entregues! O botão de volume dos celulares dos seguidores nunca trabalhou tanto!',
        diceCheer: '198 stories é maratona olímpica! Os polegares do time merecem medalha de honra!'
      },
      {
        id: 'red_4',
        title: 'Aumentar engajamento para 30%',
        cheer: '📈 30% de engajamento atingido! Comentários, curtidas e reações caindo como chuva de verão!',
        diceCheer: 'A taxa de 30% tá maior que a taxa Selic! Que pancada de alcance!'
      },
      {
        id: 'red_5',
        title: 'Estimular equipe a engajar',
        cheer: '🙌 Todo mundo engajado e comentando! Se tiver sorteio de comentário, a gente ganha de nós mesmos!',
        diceCheer: 'Equipe reunida engajando em peso! A firma nunca foi tão unida!'
      }
    ]
  },

  blue: {
    id: 'blue',
    name: 'Zelo',
    color: '#38bdf8',
    emoji: '💎',
    tasks: [
      {
        id: 'blue_1',
        title: 'Arrecadar pagamentos',
        cheer: '💸 O PIX cantou e a paz reinou! O time Zelo cobra com a elegância de um lorde e a eficiência da Receita!',
        diceCheer: 'Boleto pago é serotonina pura correndo nas veias da equipe!'
      },
      {
        id: 'blue_2',
        title: 'Finalizar apresentação padrão',
        cheer: '📊 Apresentação padrão nos trinques! Os slides ficaram tão alinhados que até o Steve Jobs aplaudiria em pé!',
        diceCheer: 'Se o design desse slide fosse comida, era banquete Michelin com estrela!'
      },
      {
        id: 'blue_3',
        title: 'Enviar alertas das próximas reuniões',
        cheer: '⏰ Alertas enviados! Ninguém tem desculpa de falar que esqueceu o link do Google Meet!',
        diceCheer: 'Pontualidade britânica no coração do projeto! Ninguém fica pra trás!'
      },
      {
        id: 'blue_4',
        title: 'Fazer ata das reuniões',
        cheer: '📝 Ata documentada! O que foi dito na reunião agora é sagrado e tem respaldo legal cósmico!',
        diceCheer: 'Quem tem ata documentada tem paz de espírito no final do trimestre!'
      },
      {
        id: 'blue_5',
        title: 'Agendar reunião de encerramento apresentando um report geral',
        cheer: '🏆 Reunião de encerramento agendada e report preparado! A organização desse time dá até arrepio!',
        diceCheer: 'O grande encerramento vem aí com gráficos subindo e champagne na mesa!'
      }
    ]
  },

  yellow: {
    id: 'yellow',
    name: 'Loja',
    color: '#fbbf24',
    emoji: '🛍️',
    tasks: [
      {
        id: 'yellow_1',
        title: 'Apresentar plano de produtos',
        cheer: '📦 Plano de produtos na mesa! A concorrência tá ligando pra mãe pedindo consolo depois dessa!',
        diceCheer: 'Vitrine de produtos pronta! A loja vai ser o ponto mais badalado do pedaço!'
      },
      {
        id: 'yellow_2',
        title: 'Agendar data para iniciar planejamento de campanha',
        cheer: '📅 Data do planejamento travada na agenda! O cronograma tá mais afiado que faca de chef!',
        diceCheer: 'Campanha desenhada com antecedência evita noites em claro tomando energético!'
      },
      {
        id: 'yellow_3',
        title: 'Agendar data para iniciar campanha de venda',
        cheer: '🛒 Data de vendas oficializada! Pode preparar o estoque que o carrinho dos clientes vai cantar!',
        diceCheer: 'Prepara a máquina de cartão que a previsão do tempo é chuva de pedidos!'
      },
      {
        id: 'yellow_4',
        title: 'Passos do fluxo logístico de venda',
        cheer: '🚚 Fluxo logístico impecável! Nem os Correios entregam com tanta certeza e serenidade!',
        diceCheer: 'Logística afinada: o pacote sai da esteira e cai com carinho na mão do cliente!'
      },
      {
        id: 'yellow_5',
        title: 'Passos do fluxo de atendimento',
        cheer: '💬 Atendimento desenhado no mais alto padrão! Cliente vai ser tratado com carinho e agilidade de ouro!',
        diceCheer: 'Pós-venda com amor e resposta rápida: segredo supremo dos gigantes do mercado!'
      }
    ]
  }
};

// Frases aleatórias do "Dado da Motivação"
const DICE_QUOTES = [
  "🎲 'Quem não arrisca uma tarefa concluída não chega no réveillon de 2026 de cabeça erguida!'",
  "🎲 'A meta de Dezembro tá cada vez mais perto. Respira fundo, toma uma água e bora pra cima!'",
  "🎲 'O dado rolou 6: Isso significa que a próxima tarefa que você fizer vale em dobro no orgulho da equipe!'",
  "🎲 'Café tomado, foco ativado! Cada pino que anda é um motivo a mais pra gente comemorar!'",
  "🎲 'O time tá entrosado demais. Dezembro de 2026 não é um sonho, é compromisso agendado!'",
  "🎲 'Dica do mestre do jogo: Ajude o pino do seu vizinho se você já adiantou as suas tarefas!'"
];

// ==========================================================================
// GERENCIADOR DE ÁUDIO SINTETIZADO (Web Audio API)
// ==========================================================================

class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  _ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playPawnStep() {
    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  playTaskComplete() {
    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;

    // Arpeggio alegre (Dó Maior: C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + (idx * 0.08);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.3, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.26);
    });
  }

  playVictory() {
    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;

    // Fanfarra triunfante
    const fanfare = [
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.4 },
      { f: 783.99, d: 0.2 },
      { f: 1046.50, d: 0.8 }
    ];

    let t = this.ctx.currentTime;
    fanfare.forEach((n) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, t);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + n.d);

      t += n.d * 0.9;
    });
  }

  playDice() {
    if (!this.enabled) return;
    this._ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Rattle clicks
    for (let i = 0; i < 5; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + (i * 0.05);

      osc.type = 'square';
      osc.frequency.setValueAtTime(300 + (Math.random() * 200), time);

      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.05);
    }
  }
}

// ==========================================================================
// APLICAÇÃO PRINCIPAL (JOGUIN)
// ==========================================================================

class JoguinApp {
  constructor() {
    this.sound = new SoundFX();
    
    // Estado inicial padrão
    this.state = {
      completedTasks: {}, // { 'green_1': true, ... }
      history: [],        // [{ team, taskTitle, time, cheer }]
      lastCheer: {
        text: "Bem-vindos ao tabuleiro da virada! O objetivo coletivo é levar todos os 4 pinos até o centro em Dezembro de 2026. Quem vai dar o primeiro passo?!",
        author: "O Juiz do Jogo 🎲"
      }
    };

    this.cacheDOMElements();
    this.renderTaskChecklists();
    this.bindEvents();
    this.initSync();
  }

  cacheDOMElements() {
    // Header & Stats
    this.globalProgressText = document.getElementById('global-progress-text');
    this.globalProgressBar = document.getElementById('global-progress-bar');
    this.btnSyncStatus = document.getElementById('btn-sync-status');
    this.syncDot = document.getElementById('sync-dot');
    this.syncLabel = document.getElementById('sync-label');
    this.btnSoundToggle = document.getElementById('btn-sound-toggle');
    this.btnRollDice = document.getElementById('btn-roll-dice');

    // Sidebar
    this.cheerText = document.getElementById('cheer-text');
    this.cheerAuthor = document.getElementById('cheer-author');
    this.feedList = document.getElementById('feed-list');
    this.btnResetGame = document.getElementById('btn-reset-game');

    // Modais
    this.celebrationModal = document.getElementById('celebration-modal');
    this.modalEmoji = document.getElementById('modal-emoji');
    this.modalTitle = document.getElementById('modal-title');
    this.modalTask = document.getElementById('modal-task');
    this.modalCheer = document.getElementById('modal-cheer');
    this.btnCloseModal = document.getElementById('btn-close-modal');

    this.victoryModal = document.getElementById('victory-modal');
    this.btnCloseVictory = document.getElementById('btn-close-victory');

    this.syncModal = document.getElementById('sync-modal');
    this.btnCloseSync = document.getElementById('btn-close-sync');
    this.firebaseConfigInput = document.getElementById('firebase-config-input');
    this.btnSaveFirebase = document.getElementById('btn-save-firebase');
    this.btnClearFirebase = document.getElementById('btn-clear-firebase');
    this.syncModalStatus = document.getElementById('sync-modal-status');
  }

  /**
   * Renderiza os itens de checklist na barra lateral
   */
  renderTaskChecklists() {
    Object.values(GAME_DATA).forEach((team) => {
      const container = document.getElementById(`tasks-${team.id}`);
      if (!container) return;

      container.innerHTML = '';
      team.tasks.forEach((task, idx) => {
        const item = document.createElement('div');
        item.className = 'task-item';
        item.id = `item-${task.id}`;
        item.dataset.taskId = task.id;
        item.dataset.team = team.id;

        const isChecked = !!this.state.completedTasks[task.id];
        if (isChecked) item.classList.add('completed');

        item.innerHTML = `
          <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''} aria-label="${task.title}">
          <span class="task-label">${task.title}</span>
          <span class="task-step-badge">Casa ${idx + 1}</span>
        `;

        // Clique no item inteiro alterna a tarefa
        item.addEventListener('click', (e) => {
          // Previne duplo disparo caso clique direto na caixinha
          if (e.target.tagName !== 'INPUT') {
            const cb = item.querySelector('input[type="checkbox"]');
            cb.checked = !cb.checked;
          }
          this.toggleTask(team.id, task.id);
        });

        container.appendChild(item);
      });
    });
  }

  /**
   * Vincula os eventos de clique, teclado e botões
   */
  bindEvents() {
    // Alternar som
    this.btnSoundToggle.addEventListener('click', () => {
      const active = this.sound.toggle();
      this.btnSoundToggle.textContent = active ? '🔊' : '🔇';
      this.btnSoundToggle.style.opacity = active ? '1' : '0.6';
    });

    // Rolar dado
    this.btnRollDice.addEventListener('click', () => this.rollDice());

    // Botão de status de sincronização abre modal de configuração
    this.btnSyncStatus.addEventListener('click', () => this.openSyncModal());
    this.btnCloseSync.addEventListener('click', () => this.closeSyncModal());

    // Salvar configuração do Firebase
    this.btnSaveFirebase.addEventListener('click', () => this.saveFirebase());
    this.btnClearFirebase.addEventListener('click', () => this.clearFirebase());

    // Fechar modais de celebração
    this.btnCloseModal.addEventListener('click', () => this.closeCelebrationModal());
    this.btnCloseVictory.addEventListener('click', () => this.closeVictoryModal());

    // Fechar modal ao clicar fora
    [this.celebrationModal, this.victoryModal, this.syncModal].forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    });

    // Resetar jogo
    this.btnResetGame.addEventListener('click', () => {
      const confirmReset = confirm('Tem certeza que deseja reiniciar o tabuleiro? Todas as 20 metas voltarão para o início!');
      if (confirmReset) {
        this.resetGame();
      }
    });

    // Acordeom dos cards de times
    document.querySelectorAll('.team-card-header').forEach((header) => {
      header.addEventListener('click', () => {
        const card = header.closest('.team-card');
        card.classList.toggle('collapsed');
      });
    });

    // Clique direto nas casas do tabuleiro para ver/concluir a tarefa correspondente
    document.querySelectorAll('.tile').forEach((tile) => {
      tile.addEventListener('click', () => {
        const teamId = tile.dataset.team;
        const stepNum = parseInt(tile.dataset.step, 10);
        const team = GAME_DATA[teamId];
        if (team && team.tasks[stepNum - 1]) {
          const task = team.tasks[stepNum - 1];
          this.toggleTask(teamId, task.id);
        }
      });
    });
  }

  /**
   * Inicializa a sincronização via sync.js
   */
  initSync() {
    // 1. Carrega dados salvos ou padrão
    const initial = window.GameSync.getInitialState();
    if (initial) {
      this.state = initial;
    }

    this.updateUI();
    this.updateSyncBadge();

    // 2. Registra escutador de atualizações remotas / de outras abas
    window.GameSync.onStateChange((newState, source) => {
      this.state = newState;
      this.updateUI();

      // Se a mudança veio de fora, tocar um som suave de avanço
      if (source !== 'local_action') {
        this.sound.playPawnStep();
      }
    });
  }

  /**
   * Alterna a conclusão de uma tarefa
   */
  toggleTask(teamId, taskId) {
    const isNowDone = !this.state.completedTasks[taskId];
    this.state.completedTasks[taskId] = isNowDone;

    const team = GAME_DATA[teamId];
    const task = team.tasks.find(t => t.id === taskId);

    if (isNowDone) {
      // Registrar no histórico e cheer
      const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      
      this.state.lastCheer = {
        text: task.cheer,
        author: `Time ${team.name} ${team.emoji}`
      };

      this.state.history.unshift({
        teamId: team.id,
        teamName: team.name,
        taskTitle: task.title,
        time: timeStr
      });

      if (this.state.history.length > 20) {
        this.state.history.pop();
      }

      // Efeitos de Sucesso
      this.sound.playTaskComplete();
      this.triggerConfetti();
      this.showCelebrationModal(team, task);
    } else {
      this.sound.playPawnStep();
    }

    // Publica o novo estado para a rede / abas
    window.GameSync.publishState(this.state);
    this.updateUI();
  }

  /**
   * Rola o dado interativo
   */
  rollDice() {
    this.sound.playDice();

    const teams = Object.values(GAME_DATA);
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];
    const randomQuote = DICE_QUOTES[Math.floor(Math.random() * DICE_QUOTES.length)];

    this.state.lastCheer = {
      text: randomQuote,
      author: `Rolo da Sorte: Frente ${randomTeam.name} ${randomTeam.emoji}`
    };

    this.cheerText.textContent = `"${this.state.lastCheer.text}"`;
    this.cheerAuthor.textContent = `— ${this.state.lastCheer.author}`;

    // Efeito visual no botão de dado
    this.btnRollDice.style.transform = 'scale(1.15) rotate(15deg)';
    setTimeout(() => {
      this.btnRollDice.style.transform = '';
    }, 250);
  }

  /**
   * Atualiza toda a interface (tabuleiro, contadores, pinos, histórico)
   */
  updateUI() {
    let totalDone = 0;
    const totalMetas = 20;

    // Atualiza cada time
    Object.values(GAME_DATA).forEach((team) => {
      let teamDoneCount = 0;

      team.tasks.forEach((task, idx) => {
        const isDone = !!this.state.completedTasks[task.id];
        if (isDone) teamDoneCount++;

        // Atualiza checkbox no painel lateral
        const item = document.getElementById(`item-${task.id}`);
        if (item) {
          const cb = item.querySelector('input[type="checkbox"]');
          if (cb) cb.checked = isDone;
          item.classList.toggle('completed', isDone);
        }

        // Atualiza a casa no tabuleiro (active)
        const tile = document.getElementById(`tile-${team.id}-${idx + 1}`);
        if (tile) {
          tile.classList.toggle('active', isDone);
        }
      });

      // Atualiza texto do time "X/5 concluídas"
      const countEl = document.getElementById(`count-${team.id}`);
      if (countEl) {
        countEl.textContent = `${teamDoneCount}/5 concluídas`;
      }

      // Move o pino correspondente no tabuleiro
      this.positionPawn(team.id, teamDoneCount);

      totalDone += teamDoneCount;
    });

    // Atualiza barra de progresso global
    const pct = Math.round((totalDone / totalMetas) * 100);
    this.globalProgressText.textContent = `${totalDone} / ${totalMetas} (${pct}%)`;
    this.globalProgressBar.style.width = `${pct}%`;

    // Atualiza o painel do último Cheer
    if (this.state.lastCheer) {
      this.cheerText.textContent = `"${this.state.lastCheer.text}"`;
      this.cheerAuthor.textContent = `— ${this.state.lastCheer.author}`;
    }

    // Atualiza lista do feed
    this.renderHistoryFeed();

    // Checagem de Grande Vitória Coletiva (20/20)
    if (totalDone === totalMetas) {
      this.triggerVictory();
    }
  }

  /**
   * Posiciona o pino no tabuleiro de acordo com o número de metas concluídas
   */
  positionPawn(teamId, count) {
    const pawn = document.getElementById(`pawn-${teamId}`);
    if (!pawn) return;

    let targetSlot = null;

    if (count === 0) {
      // Está na base inicial do time
      targetSlot = document.getElementById(`base-slot-${teamId}`);
    } else if (count >= 1 && count <= 4) {
      // Está em uma das casas intermediárias (1 a 4)
      const tile = document.getElementById(`tile-${teamId}-${count}`);
      if (tile) {
        targetSlot = tile.querySelector('.tile-pawn-slot');
      }
    } else if (count >= 5) {
      // Chegou no pódio final no centro do tabuleiro (Dezembro 2026)!
      targetSlot = document.getElementById(`podium-${teamId}`);
    }

    if (targetSlot && pawn.parentElement !== targetSlot) {
      // Adiciona animação de salto ao pino
      pawn.classList.add('hopping');
      targetSlot.appendChild(pawn);
      setTimeout(() => pawn.classList.remove('hopping'), 600);
    }
  }

  /**
   * Renderiza os itens do histórico de avanços
   */
  renderHistoryFeed() {
    this.feedList.innerHTML = '';
    if (!this.state.history || this.state.history.length === 0) {
      this.feedList.innerHTML = '<li class="feed-item" style="color: #64748b; text-align: center;">Nenhuma meta concluída ainda. O jogo começou! 🚀</li>';
      return;
    }

    this.state.history.forEach((h) => {
      const li = document.createElement('li');
      li.className = 'feed-item';
      
      const teamColor = GAME_DATA[h.teamId] ? GAME_DATA[h.teamId].color : '#fff';

      li.innerHTML = `
        <div class="feed-item-top">
          <span class="feed-item-team" style="color: ${teamColor};">● ${h.teamName}</span>
          <span class="feed-item-time">${h.time}</span>
        </div>
        <span class="feed-item-task">${h.taskTitle}</span>
      `;

      this.feedList.appendChild(li);
    });
  }

  /**
   * Exibe o modal de celebração por tarefa
   */
  showCelebrationModal(team, task) {
    this.modalEmoji.textContent = team.emoji;
    this.modalTitle.textContent = `Avanço do Time ${team.name}!`;
    this.modalTask.textContent = `Meta batida: "${task.title}"`;
    this.modalCheer.textContent = task.cheer;
    this.celebrationModal.removeAttribute('aria-hidden');
  }

  closeCelebrationModal() {
    this.celebrationModal.setAttribute('aria-hidden', 'true');
  }

  /**
   * Grande Vitória Coletiva (20/20 concluídas)
   */
  triggerVictory() {
    this.sound.playVictory();
    this.triggerEpicConfetti();
    this.victoryModal.removeAttribute('aria-hidden');
  }

  closeVictoryModal() {
    this.victoryModal.setAttribute('aria-hidden', 'true');
  }

  /**
   * Efeito de confete padrão
   */
  triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#10b981', '#f43f5e', '#38bdf8', '#fbbf24']
      });
    }
  }

  /**
   * Efeito épico de confetes e fogos contínuos na vitória
   */
  triggerEpicConfetti() {
    if (typeof confetti !== 'function') return;

    const duration = 4.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#3b82f6', '#10b981', '#f43f5e']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#3b82f6', '#10b981', '#f43f5e']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  /**
   * Reiniciar jogo
   */
  resetGame() {
    this.state = {
      completedTasks: {},
      history: [],
      lastCheer: {
        text: "Tabuleiro reiniciado! Novo ciclo em direção a Dezembro de 2026! Quem dá o pontapé inicial?!",
        author: "O Juiz do Jogo 🎲"
      }
    };
    window.GameSync.publishState(this.state);
    this.updateUI();
  }

  /**
   * Modal e Conexão Firebase
   */
  openSyncModal() {
    const status = window.GameSync.getStatus();
    this.syncModalStatus.innerHTML = `
      <span class="status-icon">${status.mode === 'firebase' ? '🟢' : '🟡'}</span>
      <span>Status: <strong>${status.label}</strong></span>
    `;

    const saved = localStorage.getItem('joguin_firebase_config');
    if (saved) {
      try {
        this.firebaseConfigInput.value = JSON.stringify(JSON.parse(saved), null, 2);
      } catch (e) {
        this.firebaseConfigInput.value = saved;
      }
    }

    this.syncModal.removeAttribute('aria-hidden');
  }

  closeSyncModal() {
    this.syncModal.setAttribute('aria-hidden', 'true');
  }

  saveFirebase() {
    const raw = this.firebaseConfigInput.value.trim();
    if (!raw) {
      alert('Por favor, cole o JSON de configuração do seu projeto Firebase.');
      return;
    }

    try {
      const config = JSON.parse(raw);
      const ok = window.GameSync.connectFirebase(config);
      if (ok) {
        alert('🎉 Conectado com sucesso ao Firebase! Agora o tabuleiro atualiza em tempo real para todo o time no GitHub Pages!');
        this.closeSyncModal();
        this.updateSyncBadge();
      } else {
        alert('Não foi possível conectar. Verifique os dados do Firebase.');
      }
    } catch (e) {
      alert('O texto inserido não é um JSON válido. Verifique chaves e aspas.');
    }
  }

  clearFirebase() {
    window.GameSync.disconnectFirebase();
    this.firebaseConfigInput.value = '';
    alert('Desconectado do Firebase. Tabuleiro operando em modo local (Multi-Abas).');
    this.closeSyncModal();
    this.updateSyncBadge();
  }

  updateSyncBadge() {
    const status = window.GameSync.getStatus();
    this.syncDot.className = `sync-dot ${status.dotClass}`;
    this.syncLabel.textContent = status.mode === 'firebase' ? 'Sincronização: Online (Firebase)' : 'Sincronização: Local (Abas)';
  }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.App = new JoguinApp();
});
