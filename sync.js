/**
 * sync.js - Camada de Sincronização em Tempo Real para o Tabuleiro Gamificado
 * 
 * Funciona de duas formas complementares para máxima facilidade:
 * 1. MODO LOCAL / MULTI-ABAS (Zero Configuração):
 *    Usa BroadcastChannel e localStorage. Se você abrir o jogo em 2 ou mais abas,
 *    elas sincronizam instantaneamente em tempo real na mesma máquina!
 * 
 * 2. MODO ONLINE EM TEMPO REAL (Para GitHub Pages com a Equipe Remota):
 *    Conecta ao Firebase Realtime Database (plano gratuito Google).
 *    Quando qualquer membro da equipe marca uma tarefa em qualquer lugar do mundo,
 *    todos os computadores conectados recebem o evento e movimentam o tabuleiro ao vivo!
 */

const SYNC_STORAGE_KEY = 'joguin_missao_2026_state';
const FIREBASE_CONFIG_KEY = 'joguin_firebase_config';
const BROADCAST_CHANNEL_NAME = 'joguin_missao_2026_channel';

class GameSyncManager {
  constructor() {
    this.broadcastChannel = null;
    this.firebaseApp = null;
    this.firebaseDb = null;
    this.dbRef = null;
    this.isFirebaseActive = false;
    this.listeners = [];
    this.statusListeners = [];
    this.lastStateHash = '';

    this._initBroadcastChannel();
    this._initFirebaseIfAvailable();
  }

  onStatusChange(callback) {
    if (typeof callback === 'function') {
      this.statusListeners.push(callback);
    }
  }

  _notifyStatusChange() {
    const status = this.getStatus();
    this.statusListeners.forEach((fn) => {
      try { fn(status); } catch (e) { console.error('Erro em ouvinte de status:', e); }
    });
  }

  /**
   * Sanitiza e normaliza o estado recebido (do Firebase, LocalStorage ou Broadcast)
   * Isso previne erros onde o Firebase Realtime Database remove nós vazios como {} ou []
   */
  _sanitizeState(raw) {
    const defaultCheer = {
      text: "Bem-vindos ao tabuleiro da virada! O objetivo coletivo é levar todos os 4 pinos até o centro na Missão Offsete 2026. Quem vai dar o primeiro passo?!",
      author: "O Juiz do Jogo 🎲"
    };

    if (!raw || typeof raw !== 'object') {
      return {
        completedTasks: {},
        history: [],
        lastCheer: defaultCheer,
        updatedAt: Date.now()
      };
    }

    // Normaliza completedTasks
    let completedTasks = {};
    if (raw.completedTasks && typeof raw.completedTasks === 'object') {
      completedTasks = { ...raw.completedTasks };
      delete completedTasks._empty;
      delete completedTasks._init;
    }

    // Normaliza history
    let history = [];
    if (Array.isArray(raw.history)) {
      history = [...raw.history];
    } else if (raw.history && typeof raw.history === 'object') {
      // Firebase às vezes converte arrays em objetos com índices numéricos
      history = Object.values(raw.history);
    }

    // Normaliza lastCheer
    let lastCheer = defaultCheer;
    if (raw.lastCheer && typeof raw.lastCheer === 'object' && raw.lastCheer.text) {
      lastCheer = {
        text: raw.lastCheer.text,
        author: raw.lastCheer.author || 'O Juiz do Jogo 🎲'
      };
    }

    return {
      completedTasks,
      history,
      lastCheer,
      updatedAt: raw.updatedAt || Date.now()
    };
  }

  /**
   * Inicializa o canal BroadcastChannel para testes locais entre abas
   */
  _initBroadcastChannel() {
    if ('BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      this.broadcastChannel.onmessage = (event) => {
        if (event && event.data && event.data.type === 'STATE_UPDATE') {
          this._notifyListeners(event.data.payload, 'broadcast');
        }
      };
    }
  }

  /**
   * Tenta carregar credenciais do Firebase salvas no localStorage ou window
   */
  _initFirebaseIfAvailable() {
    const attempt = () => {
      let savedConfig = null;

      if (window.FIREBASE_CONFIG) {
        savedConfig = window.FIREBASE_CONFIG;
      } else {
        const raw = localStorage.getItem(FIREBASE_CONFIG_KEY);
        if (raw) {
          try {
            savedConfig = JSON.parse(raw);
          } catch (e) {
            console.warn('Erro ao decodificar configuração do Firebase:', e);
          }
        }
      }

      if (savedConfig && savedConfig.apiKey && savedConfig.databaseURL) {
        if (typeof firebase !== 'undefined') {
          this.connectFirebase(savedConfig);
        } else {
          window.addEventListener('load', () => {
            if (typeof firebase !== 'undefined' && !this.isFirebaseActive) {
              this.connectFirebase(savedConfig);
            }
          }, { once: true });
        }
      }
    };

    attempt();
  }

  /**
   * Conecta ao Firebase Realtime Database
   */
  connectFirebase(config) {
    try {
      if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK ainda não carregou via CDN.');
        return false;
      }

      // Se já houver app inicializado, reaproveita
      if (!firebase.apps.length) {
        this.firebaseApp = firebase.initializeApp(config);
      } else {
        this.firebaseApp = firebase.app();
      }

      this.firebaseDb = firebase.database();
      this.dbRef = this.firebaseDb.ref('missao_dezembro_2026');

      // Escuta mudanças em tempo real na nuvem
      this.dbRef.on('value', (snapshot) => {
        const cloudState = snapshot.val();
        // Sanitiza para garantir que se for null ou faltar campos, retorne objeto seguro
        const cleanState = this._sanitizeState(cloudState);
        this._notifyListeners(cleanState, 'firebase');
      }, (error) => {
        console.error('Erro de permissão ou conexão no Firebase:', error);
      });

      this.isFirebaseActive = true;
      localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
      this._notifyStatusChange();
      return true;
    } catch (err) {
      console.error('Falha ao conectar ao Firebase:', err);
      this.isFirebaseActive = false;
      this._notifyStatusChange();
      return false;
    }
  }

  /**
   * Remove credenciais do Firebase e volta para modo local
   */
  disconnectFirebase() {
    if (this.dbRef) {
      this.dbRef.off();
    }
    this.isFirebaseActive = false;
    localStorage.removeItem(FIREBASE_CONFIG_KEY);
    this._notifyStatusChange();
  }

  /**
   * Registra um callback para quando o estado mudar em qualquer tela
   */
  onStateChange(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }

  /**
   * Notifica todos os ouvintes internos da tela com estado limpo e seguro
   */
  _notifyListeners(rawState, source) {
    const state = this._sanitizeState(rawState);
    const serialized = JSON.stringify(state);

    if (serialized === this.lastStateHash) return; // Evita loop infinito
    this.lastStateHash = serialized;

    // Atualiza cópia no localStorage
    localStorage.setItem(SYNC_STORAGE_KEY, serialized);

    this.listeners.forEach((fn) => {
      try {
        fn(state, source);
      } catch (e) {
        console.error('Erro ao executar ouvinte de estado:', e);
      }
    });
  }

  /**
   * Publica uma alteração feita pelo usuário nesta tela para todas as outras
   */
  publishState(newState) {
    const cleanState = this._sanitizeState(newState);
    const serialized = JSON.stringify(cleanState);
    this.lastStateHash = serialized;
    localStorage.setItem(SYNC_STORAGE_KEY, serialized);

    // 1. Envia via BroadcastChannel para outras abas locais
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({
        type: 'STATE_UPDATE',
        payload: cleanState,
        timestamp: Date.now()
      });
    }

    // 2. Envia via Firebase para a equipe remota (se ativo)
    if (this.isFirebaseActive && this.dbRef) {
      // Cria payload seguro para o Firebase (se completedTasks for vazio, coloca sentinela para não apagar o nó)
      const firebasePayload = {
        completedTasks: Object.keys(cleanState.completedTasks).length === 0
          ? { _empty: true }
          : cleanState.completedTasks,
        history: cleanState.history.length === 0 ? [] : cleanState.history,
        lastCheer: cleanState.lastCheer,
        updatedAt: Date.now()
      };

      this.dbRef.set(firebasePayload).catch((err) => {
        console.error('Erro ao sincronizar com Firebase:', err);
      });
    }
  }

  /**
   * Retorna o estado salvo ou nulo
   */
  getInitialState() {
    const raw = localStorage.getItem(SYNC_STORAGE_KEY);
    if (raw) {
      try {
        return this._sanitizeState(JSON.parse(raw));
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  /**
   * Retorna informações sobre o status de conectividade
   */
  getStatus() {
    return {
      mode: 'firebase',
      label: this.isFirebaseActive ? 'Ao Vivo (Online)' : 'Conectando à Nuvem...',
      dotClass: this.isFirebaseActive ? 'online' : 'offline'
    };
  }
}

// Expõe globalmente
window.GameSync = new GameSyncManager();
