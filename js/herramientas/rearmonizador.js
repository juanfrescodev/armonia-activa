/**
 * Rearmonizador Avanzado Pro v4.1 - Corrección de Parser y Funciones Armónicas Reales
 */

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

HERRAMIENTAS.rearmonizador = function(containerParam) {
  const container = typeof containerParam === "string" 
    ? document.getElementById(containerParam) 
    : (containerParam || document.getElementById("labPanel") || document.body);

  if (!container) return;

  // --- MOTOR DE AUDIO (Web Audio API) ---
  let audioCtx = null;
  let isPlaying = false;
  let playTimeout = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function noteToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function playTone(midi, startTime, duration) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    const freq = noteToFreq(midi);
    osc.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq * 1.0015, startTime);

    osc.type = "triangle";
    osc2.type = "sine";

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, startTime);
    filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  function playVoicing(midiNotes, duration = 1.2, style = "bloque") {
    initAudio();
    const now = audioCtx.currentTime;

    renderPianoKeys(midiNotes);

    if (style === "arpegio") {
      midiNotes.forEach((note, idx) => {
        playTone(note, now + idx * 0.12, Math.max(0.4, duration - idx * 0.1));
      });
    } else if (style === "swing") {
      midiNotes.forEach(note => {
        playTone(note, now, duration * 0.45);
        playTone(note, now + duration * 0.5, duration * 0.25);
        playTone(note, now + duration * 0.75, duration * 0.2);
      });
    } else if (style === "bossa") {
      const pattern = [0, 0.375, 0.75, 1.125];
      pattern.forEach(delay => {
        if (delay < duration) {
          midiNotes.forEach(note => playTone(note, now + delay, 0.3));
        }
      });
    } else {
      midiNotes.forEach(note => playTone(note, now, duration));
    }
  }

  // --- MOTOR TEÓRICO CORREGIDO ---
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const FLAT_NAMES = { "C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb" };

  function getNoteName(index, preferFlat = false) {
    let idx = (index % 12 + 12) % 12;
    let name = NOTES[idx];
    return preferFlat && FLAT_NAMES[name] ? FLAT_NAMES[name] : name;
  }

  // FIX 1: Parser que NO fuerza minúsculas a menor salvo 'm' o 'min' explícitos
  function parseChordRoot(chordStr) {
    if (!chordStr) return { rootIdx: 0, rootName: "C", type: "maj" };

    let cleaned = chordStr.trim();
    let match = cleaned.match(/^([a-gA-G][#b]?)(.*)$/);
    if (!match) return { rootIdx: 0, rootName: "C", type: "maj" };

    let rawRoot = match[1];
    let rawType = (match[2] || "").trim();

    let rootName = rawRoot.charAt(0).toUpperCase() + rawRoot.slice(1);

    const flatMap = { Db: 1, Eb: 3, Gb: 6, Ab: 8, Bb: 10 };
    let rootIdx = NOTES.indexOf(rootName);
    if (rootIdx === -1 && flatMap[rootName] !== undefined) {
      rootIdx = flatMap[rootName];
    }
    if (rootIdx === -1) rootIdx = 0;

    let type = rawType;
    if (!type) {
      type = "maj";
    }

    return { rootIdx, rootName, type };
  }

  const CHORD_INTERVALS = {
    "": [0, 4, 7], "maj": [0, 4, 7], "m": [0, 3, 7], "min": [0, 3, 7],
    "7": [0, 4, 7, 10], "maj7": [0, 4, 7, 11], "m7": [0, 3, 7, 10],
    "m7b5": [0, 3, 6, 10], "dim7": [0, 3, 6, 9], "9": [0, 4, 7, 10, 14],
    "maj9": [0, 4, 7, 11, 14], "m9": [0, 3, 7, 10, 14], "sus4": [0, 5, 7],
    "7sus4": [0, 5, 7, 10], "add9": [0, 4, 7, 14], "m6": [0, 3, 7, 9]
  };

  function getChordNotes(chordStr, baseOctave = 3) {
    const { rootIdx, type } = parseChordRoot(chordStr);
    const cleanType = type.startsWith("m") && !type.includes("maj") && type !== "m" ? type : (type === "m" ? "m" : type);
    const intervals = CHORD_INTERVALS[cleanType] || CHORD_INTERVALS[type] || CHORD_INTERVALS[""];
    const rootMidi = 12 * (baseOctave + 1) + rootIdx;
    return intervals.map(inter => rootMidi + inter);
  }

  // FIX 2: Mapeo de Función Armónica Teórica Real según Grado en la Tonalidad
  function getHarmonicInfo(semitonesFromKey, type, keyRootStr) {
    const isMinor = type.startsWith("m") && !type.includes("maj");
    
    const scaleDegrees = [
      { roman: isMinor ? "i" : "I", label: "Tónica Principal", desc: `Centro tonal y pilar de reposo absoluto en la tonalidad de ${keyRootStr}.` },
      { roman: isMinor ? "bII" : "II", label: "Supertónica / Subdominante", desc: "Aporta inestabilidad suave y prepara el movimiento hacia la dominante." },
      { roman: isMinor ? "ii" : "II", label: "Subdominante Secundario (ii)", desc: "Acorde de paso predilecto para iniciar cadencias ii-V-I." },
      { roman: isMinor ? "bIII" : "III", label: "Mediante", desc: "Grado de transición con sonoridad tibia y puente tonal." },
      { roman: isMinor ? "iii" : "III", label: "Mediante / Tónica Secundaria", desc: "Comparte notas con la tónica, ofreciendo un reposo más suave e íntimo." },
      { roman: isMinor ? "iv" : "IV", label: "Subdominante Principal", desc: "Sensación de apertura y amplitud. Genera movimiento alejado de la tónica." },
      { roman: isMinor ? "bV" : "bV", label: "Tritono / Tritonal", desc: "Tensión máxima de paso semitonal." },
      { roman: isMinor ? "v" : "V", label: "Dominante Principal", desc: "Eje de máxima tensión armónica. Su nota sensible atrae la resolución hacia la Tónica." },
      { roman: isMinor ? "bVI" : "VI", label: "Submediante / Intercambio Modal", desc: "Color dramático y cinematográfico." },
      { roman: isMinor ? "vi" : "VI", label: "Relativo Menor / Tónica Secundarias", desc: "Ofrece un centro de gravedad melancólico con las mismas notas de la escala principal." },
      { roman: isMinor ? "bVII" : "VII", label: "Subtónica", desc: "Grado modal amplio, común en rock, pop y música épica." },
      { roman: isMinor ? "vii°" : "VII", label: "Sensible / Dominante", desc: "Inestable y tenso, busca resolver directamente en la tónica." }
    ];

    return scaleDegrees[semitonesFromKey] || { roman: "I", label: "Acorde Diatónico", desc: "Grado de la escala base." };
  }

  function generateReharmonization(originalProg, keyRootStr, level) {
    const keyInfo = parseChordRoot(keyRootStr);
    const keyIdx = keyInfo.rootIdx;
    const isFlatKey = ["F", "Bb", "Eb", "Ab", "Db"].includes(keyRootStr);

    let expanded = [];

    originalProg.forEach((origChord, i) => {
      const { rootIdx, type, rootName } = parseChordRoot(origChord);
      const relSemitones = (rootIdx - keyIdx + 12) % 12;
      const displayOrig = rootName + (type === "maj" ? "" : type);

      const hInfo = getHarmonicInfo(relSemitones, type, keyRootStr);

      let mainChord = displayOrig;
      let mainRoman = hInfo.roman;
      let mainTypeLabel = hInfo.label;
      let mainExpl = hInfo.desc;

      if (level === 1) {
        if (type === "" || type === "maj") mainChord = rootName + "maj7";
        else if (type.includes("m")) mainChord = rootName + "m7";
        else mainChord = rootName + "7";
        mainTypeLabel = `${hInfo.label} (7ma)`;
        mainExpl = `${hInfo.desc} Se añade la 7ma para dar mayor profundidad tonal.`;
      } else if (level >= 2) {
        mainChord = rootName + (type.includes("m") ? "m9" : "maj9");
        mainTypeLabel = `${hInfo.label} (9na Neo-Soul)`;
        mainExpl = `${hInfo.desc} La 9na añadida le otorga una resonancia mórbida y moderna.`;
      }

      expanded.push({
        chord: mainChord,
        roman: mainRoman,
        type: mainTypeLabel,
        isPassing: false,
        explanation: mainExpl
      });

      if (level >= 1 && i < originalProg.length - 1) {
        const nextInfo = parseChordRoot(originalProg[i + 1]);
        const nextRelSemitones = (nextInfo.rootIdx - keyIdx + 12) % 12;
        const nextHInfo = getHarmonicInfo(nextRelSemitones, nextInfo.type, keyRootStr);

        if (level === 1) {
          const domSecRoot = (nextInfo.rootIdx + 7) % 12;
          const passingChord = getNoteName(domSecRoot, isFlatKey) + "7";
          expanded.push({
            chord: passingChord,
            roman: `V7 / ${nextHInfo.roman}`,
            type: "Dominante Secundario (Paso)",
            isPassing: true,
            explanation: `Acorde de paso V7/X. Tensión por quinta descendente que resuelve en ${nextInfo.rootName} (${nextHInfo.label}).`
          });
        } else if (level === 2) {
          const subVRoot = (nextInfo.rootIdx + 1) % 12;
          const passingChord = getNoteName(subVRoot, true) + "7";
          expanded.push({
            chord: passingChord,
            roman: `subV7 / ${nextHInfo.roman}`,
            type: "Sustituto Tritonal (Paso)",
            isPassing: true,
            explanation: `Paso tritonal que resuelve cayendo medio tono cromático hacia ${nextInfo.rootName}.`
          });
        } else if (level === 3) {
          const iiRoot = (nextInfo.rootIdx + 2) % 12;
          const vRoot = (nextInfo.rootIdx + 7) % 12;

          expanded.push({
            chord: getNoteName(iiRoot, isFlatKey) + "m7",
            roman: `ii7 / ${nextHInfo.roman}`,
            type: "ii-V Relativo (Paso 1/2)",
            isPassing: true,
            explanation: `Inicia la maniobra de ii-V relativo para preparar el terreno hacia ${nextInfo.rootName}.`
          });

          expanded.push({
            chord: getNoteName(vRoot, isFlatKey) + "7(b9)",
            roman: `V7(b9) / ${nextHInfo.roman}`,
            type: "ii-V Relativo (Paso 2/2)",
            isPassing: true,
            explanation: `Dominante alterado de máxima tensión que resuelve directamente en ${nextInfo.rootName}.`
          });
        }
      }
    });

    return expanded;
  }

  function generateStructureSuggestions(keyStr) {
    const { rootIdx } = parseChordRoot(keyStr);
    const isFlat = ["F", "Bb", "Eb", "Ab", "Db"].includes(keyStr);

    const I = getNoteName(rootIdx, isFlat);
    const ii = getNoteName((rootIdx + 2) % 12, isFlat) + "m7";
    const IV = getNoteName((rootIdx + 5) % 12, isFlat);
    const IVmaj7 = getNoteName((rootIdx + 5) % 12, isFlat) + "maj7";
    const V = getNoteName((rootIdx + 7) % 12, isFlat);
    const V7 = getNoteName((rootIdx + 7) % 12, isFlat) + "7";
    const vi7 = getNoteName((rootIdx + 9) % 12, isFlat) + "m7";
    const bVI = getNoteName((rootIdx + 8) % 12, true) + "maj7";
    const IVm6 = getNoteName((rootIdx + 5) % 12, isFlat) + "m6";

    return {
      prechorus: {
        id: "prechorus",
        name: "Pre-Coro (Tensión Creciente)",
        chords: [ii, IV, vi7, V7],
        explanation: "Genera suspenso e impulso armónico ascendente apuntando al Coro."
      },
      chorus: {
        id: "chorus",
        name: "Estribillo / Coro (Clímax Principal)",
        chords: [IVmaj7, V7, I, vi7],
        explanation: "Abre en el subdominante para mayor amplitud y brillo melódico."
      },
      bridge: {
        id: "bridge",
        name: "Puente / Bridge (Contraste Dramático)",
        chords: [vi7, ii, bVI, V7],
        explanation: "Explora tonalidades oscuras con un intercambio modal (bVI) antes del retorno final."
      },
      outro: {
        id: "outro",
        name: "Outro (Resolución / Cierre)",
        chords: [IVmaj7, IVm6, I + "maj7"],
        explanation: "Cadencia de cierre melancólica y cinematográfica."
      }
    };
  }

  const PRESETS = [
    { name: "2-5-1 Jazz Standard", key: "C", chords: ["Dm7", "G7", "Cmaj7", "A7"] },
    { name: "Progresión Pop (4-Chords)", key: "C", chords: ["C", "G", "Am", "F"] },
    { name: "Andaluza (Tu Secuencia)", key: "A", chords: ["Am", "G", "F", "E"] },
    { name: "Neo-Soul Chill Loop", key: "Eb", chords: ["Fm7", "Bb7", "Ebmaj7", "Cm7"] }
  ];

  let state = {
    key: "C#",
    level: 1,
    style: "bloque",
    bpm: 100,
    chords: ["C#", "G#", "A#m", "F#"],
    songStructure: ["verso", "prechorus", "chorus"],
    selectedIndex: 0,
    reharmResult: []
  };

  function renderUI() {
    container.innerHTML = `
      <style>
        .rearm-wrapper {
          font-family: system-ui, -apple-system, sans-serif;
          color: #e2e8f0;
          background: #0f172a;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          max-width: 1000px;
          margin: 0 auto;
        }
        .rearm-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #334155;
          padding-bottom: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .rearm-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #38bdf8;
          margin: 0;
        }
        .rearm-controls {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          background: #1e293b;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
        }
        .rearm-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .rearm-group label {
          font-size: 0.85rem;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
        }
        .rearm-select, .rearm-input {
          background: #0f172a;
          border: 1px solid #475569;
          color: #fff;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
        }

        .piano-container {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          text-align: center;
        }
        .piano-title {
          font-size: 0.85rem;
          color: #94a3b8;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .piano-keyboard {
          display: flex;
          justify-content: center;
          position: relative;
          height: 120px;
          user-select: none;
          max-width: 680px;
          margin: 0 auto;
        }
        .piano-key {
          position: relative;
          border-radius: 0 0 4px 4px;
          cursor: pointer;
          transition: background 0.1s ease, transform 0.1s ease;
        }
        .piano-key.white {
          width: 30px;
          height: 120px;
          background: #f8fafc;
          border: 1px solid #94a3b8;
          border-top: none;
          z-index: 1;
        }
        .piano-key.black {
          width: 18px;
          height: 75px;
          background: #0f172a;
          margin-left: -9px;
          margin-right: -9px;
          z-index: 2;
          border-radius: 0 0 3px 3px;
        }
        .piano-key.active-white {
          background: #38bdf8 !important;
          box-shadow: inset 0 0 10px #0284c7;
        }
        .piano-key.active-black {
          background: #0284c7 !important;
          box-shadow: 0 0 8px #38bdf8;
        }

        .rearm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }
        .rearm-card {
          background: #1e293b;
          border: 2px solid #334155;
          border-radius: 12px;
          padding: 14px;
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
        }
        .rearm-card:hover { transform: translateY(-3px); border-color: #38bdf8; }
        .rearm-card.passing { border-style: dashed; border-color: #fbbf24; background: #262010; }
        .rearm-card.selected { border-color: #38bdf8 !important; background: #0f2b48 !important; }
        .rearm-card.playing { 
          border-color: #22c55e !important; 
          background: #143324 !important;
          box-shadow: 0 0 18px rgba(34, 197, 94, 0.6) !important;
          transform: scale(1.03);
        }
        .rearm-orig { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; }
        .rearm-chord { font-size: 1.5rem; font-weight: 800; color: #f8fafc; margin: 4px 0; }
        .rearm-reharm { font-size: 1.1rem; font-weight: 700; color: #c084fc; }
        .rearm-badge { 
          display: inline-block; 
          font-size: 0.7rem; 
          padding: 3px 6px; 
          border-radius: 6px; 
          background: #334155; 
          color: #38bdf8; 
          margin-top: 6px; 
        }
        .rearm-badge.passing-badge { background: #78350f; color: #fde047; }

        .theory-panel {
          background: #1e293b;
          border-left: 4px solid #38bdf8;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .theory-title { font-size: 1rem; font-weight: 700; color: #38bdf8; margin-bottom: 6px; }
        .theory-desc { font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; }

        .song-builder {
          background: #1e293b;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid #334155;
        }
        .song-builder-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .song-builder-title { font-size: 1.2rem; font-weight: 700; color: #38bdf8; }
        .section-block {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          transition: all 0.2s ease;
        }
        .section-block.playing {
          border-color: #a855f7;
          background: #23153c;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
        }
        .section-info { display: flex; flex-direction: column; gap: 4px; }
        .section-tag { font-size: 0.75rem; font-weight: 700; color: #a855f7; text-transform: uppercase; }
        .section-chords { font-size: 1.1rem; font-weight: 800; color: #38bdf8; }
        .section-desc { font-size: 0.8rem; color: #94a3b8; }
        .section-actions { display: flex; gap: 8px; align-items: center; }

        .rearm-btn {
          background: #38bdf8;
          color: #0f172a;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .rearm-btn:hover { background: #7dd3fc; }
        .rearm-btn-secondary { background: #334155; color: #f8fafc; }
        .rearm-btn-secondary:hover { background: #475569; }
        .rearm-btn-danger { background: #ef4444; color: #fff; }
      </style>

      <div class="rearm-wrapper">
        <div class="rearm-header">
          <h2 class="rearm-title">🪄 Rearmonizador Pro v4.1</h2>
          <div>
            <select id="rearmPreset" class="rearm-select">
              <option value="">-- Cargar Progresión --</option>
              ${PRESETS.map((p, idx) => `<option value="${idx}">${p.name}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="rearm-controls">
          <div class="rearm-group">
            <label>Tonalidad Principal</label>
            <select id="rearmKey" class="rearm-select">
              ${NOTES.map(n => `<option value="${n}" ${n === state.key ? "selected" : ""}>${n}</option>`).join("")}
            </select>
          </div>

          <div class="rearm-group">
            <label>Nivel Rearmonización & Acordes de Paso</label>
            <select id="rearmLevel" class="rearm-select">
              <option value="0" ${state.level === 0 ? "selected" : ""}>Nivel 0: Original (Sin paso)</option>
              <option value="1" ${state.level === 1 ? "selected" : ""}>Nivel 1: Dominantes de Paso (V7/X)</option>
              <option value="2" ${state.level === 2 ? "selected" : ""}>Nivel 2: Sustitutos Tritonales (subV7)</option>
              <option value="3" ${state.level === 3 ? "selected" : ""}>Nivel 3: Relativos ii-V Jazz/Soul</option>
            </select>
          </div>

          <div class="rearm-group">
            <label>Estilo de Audio</label>
            <select id="rearmStyle" class="rearm-select">
              <option value="bloque" ${state.style === "bloque" ? "selected" : ""}>🎹 Bloque Sostenido</option>
              <option value="arpegio" ${state.style === "arpegio" ? "selected" : ""}>🌊 Arpegiado</option>
              <option value="swing" ${state.style === "swing" ? "selected" : ""}>🎷 Swing Jazz</option>
              <option value="bossa" ${state.style === "bossa" ? "selected" : ""}>🏖️ Bossa Nova</option>
            </select>
          </div>

          <div class="rearm-group">
            <label>Secuencia Base</label>
            <input type="text" id="rearmInput" class="rearm-input" value="${state.chords.join(", ")}">
          </div>
        </div>

        <div class="piano-container">
          <div class="piano-title">🎹 Visor de Acordes en Piano</div>
          <div class="piano-keyboard" id="pianoKeyboard"></div>
        </div>

        <h3 style="color:#38bdf8; margin-top:0;">1. Secuencia Rearmonizada</h3>
        <div class="rearm-grid" id="rearmCardsGrid"></div>

        <div class="theory-panel" id="theoryPanel">
          <div class="theory-title" id="theoryTitle">Análisis Teórico</div>
          <div class="theory-desc" id="theoryDesc">Haz clic en cualquier acorde arriba para ver su función armónica exacta.</div>
        </div>

        <div class="song-builder">
          <div class="song-builder-header">
            <div class="song-builder-title">🎼 2. Ensamblador de la Canción Completa</div>
            <button id="playFullSongBtn" class="rearm-btn" style="background:#a855f7; color:#fff;">
              ▶️ Escuchar Canción Completa
            </button>
          </div>

          <div id="songSectionsList"></div>

          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;">
            <span style="font-size:0.85rem; color:#94a3b8; align-self:center;">Añadir Sección:</span>
            <button class="rearm-btn rearm-btn-secondary add-sec-btn" data-sec="prechorus">+ Pre-Coro</button>
            <button class="rearm-btn rearm-btn-secondary add-sec-btn" data-sec="chorus">+ Coro (Estribillo)</button>
            <button class="rearm-btn rearm-btn-secondary add-sec-btn" data-sec="bridge">+ Puente</button>
            <button class="rearm-btn rearm-btn-secondary add-sec-btn" data-sec="outro">+ Outro</button>
          </div>
        </div>

      </div>
    `;

    attachEvents();
    renderPianoKeys([]);
    updateAll();
  }

  function renderPianoKeys(activeMidiNotes = []) {
    const keyboardEl = container.querySelector("#pianoKeyboard");
    if (!keyboardEl) return;

    keyboardEl.innerHTML = "";
    const startMidi = 48; 
    const totalKeys = 25; 

    const normalizedActiveNotes = activeMidiNotes.map(midi => {
      let pitchClass = midi % 12;
      let octaveOffset = Math.floor((midi - startMidi) / 12);
      if (octaveOffset < 0 || octaveOffset > 1) {
        return startMidi + pitchClass + (pitchClass < (startMidi % 12) ? 12 : 0);
      }
      return midi;
    });

    for (let midi = startMidi; midi < startMidi + totalKeys; midi++) {
      const noteIdx = midi % 12;
      const isBlack = [1, 3, 6, 8, 10].includes(noteIdx);
      const isActive = normalizedActiveNotes.some(activeMidi => activeMidi % 12 === noteIdx);

      const keyEl = document.createElement("div");
      keyEl.className = `piano-key ${isBlack ? "black" : "white"}`;
      if (isActive) {
        keyEl.classList.add(isBlack ? "active-black" : "active-white");
      }

      keyEl.addEventListener("click", () => {
        playVoicing([midi], 0.8, "bloque");
      });

      keyboardEl.appendChild(keyEl);
    }
  }

  function getFullSongSequence() {
    const suggestions = generateStructureSuggestions(state.key);
    const verseChords = state.reharmResult.map(r => r.chord);

    let fullList = [];

    state.songStructure.forEach(secKey => {
      if (secKey === "verso") {
        fullList.push({
          key: "verso",
          type: "Verso / Main Loop (Rearmonizado)",
          chords: verseChords,
          desc: "Secuencia base expandida con acordes de paso."
        });
      } else if (suggestions[secKey]) {
        const s = suggestions[secKey];
        fullList.push({
          key: secKey,
          type: s.name,
          chords: s.chords,
          desc: s.explanation
        });
      }
    });

    return fullList;
  }

  function highlightCard(cardIdx) {
    const cards = container.querySelectorAll(".rearm-card");
    cards.forEach((c, idx) => {
      if (idx === cardIdx) {
        c.classList.add("playing");
      } else {
        c.classList.remove("playing");
      }
    });
  }

  function selectCard(cardIdx) {
    state.selectedIndex = cardIdx;
    const cards = container.querySelectorAll(".rearm-card");
    cards.forEach((c, idx) => {
      if (idx === cardIdx) c.classList.add("selected");
      else c.classList.remove("selected");
    });

    const item = state.reharmResult[cardIdx];
    if (item) {
      const tTitle = container.querySelector("#theoryTitle");
      const tDesc = container.querySelector("#theoryDesc");
      if (tTitle && tDesc) {
        tTitle.innerHTML = `🧐 ${item.chord} (${item.roman}) - ${item.type}`;
        tDesc.innerHTML = item.explanation;
      }
    }
  }

  function clearCardHighlights() {
    const cards = container.querySelectorAll(".rearm-card");
    cards.forEach(c => c.classList.remove("playing"));
  }

  function updateAll() {
    state.reharmResult = generateReharmonization(state.chords, state.key, state.level);

    const grid = container.querySelector("#rearmCardsGrid");
    grid.innerHTML = "";

    state.reharmResult.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = `rearm-card ${item.isPassing ? "passing" : ""} ${index === state.selectedIndex ? "selected" : ""}`;
      card.dataset.index = index;
      card.innerHTML = `
        <div class="rearm-orig">${item.isPassing ? "ACORDE DE PASO" : "PRINCIPAL"}</div>
        <div class="rearm-chord">${item.chord}</div>
        <div class="rearm-reharm">${item.roman}</div>
        <div class="rearm-badge ${item.isPassing ? "passing-badge" : ""}">${item.type}</div>
      `;

      card.addEventListener("click", () => {
        selectCard(index);
        highlightCard(index);
        const notes = getChordNotes(item.chord);
        playVoicing(notes, 1.2, state.style);
        setTimeout(() => {
          clearCardHighlights();
          renderPianoKeys([]);
        }, 1200);
      });

      grid.appendChild(card);
    });

    if (state.reharmResult.length > 0) {
      selectCard(Math.min(state.selectedIndex, state.reharmResult.length - 1));
    }

    renderSongBuilder();
  }

  function renderSongBuilder() {
    const listContainer = container.querySelector("#songSectionsList");
    if (!listContainer) return;

    const sections = getFullSongSequence();
    listContainer.innerHTML = "";

    sections.forEach((sec, idx) => {
      const block = document.createElement("div");
      block.className = `section-block sec-block-${idx}`;
      block.innerHTML = `
        <div class="section-info">
          <div class="section-tag">${sec.type}</div>
          <div class="section-chords">${sec.chords.join(" - ")}</div>
          <div class="section-desc">${sec.desc}</div>
        </div>
        <div class="section-actions">
          <button class="rearm-btn rearm-btn-secondary play-sec-btn" data-idx="${idx}">🔊 Probar Sección</button>
          ${idx > 0 ? `<button class="rearm-btn rearm-btn-danger remove-sec-btn" data-idx="${idx}">✕</button>` : ""}
        </div>
      `;

      block.querySelector(".play-sec-btn").addEventListener("click", () => {
        playSection(sec, block);
      });

      const removeBtn = block.querySelector(".remove-sec-btn");
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          state.songStructure.splice(idx, 1);
          renderSongBuilder();
        });
      }

      listContainer.appendChild(block);
    });
  }

  function playSection(sec, blockEl) {
    if (isPlaying) stopPlayback();
    initAudio();
    isPlaying = true;

    if (blockEl) blockEl.classList.add("playing");
    let stepIdx = 0;
    const duration = 1.0;

    function step() {
      if (!isPlaying || stepIdx >= sec.chords.length) {
        if (blockEl) blockEl.classList.remove("playing");
        clearCardHighlights();
        renderPianoKeys([]);
        isPlaying = false;
        return;
      }

      if (sec.key === "verso") {
        highlightCard(stepIdx);
        selectCard(stepIdx);
      } else {
        clearCardHighlights();
      }

      const chord = sec.chords[stepIdx];
      const notes = getChordNotes(chord);
      playVoicing(notes, duration, state.style);

      stepIdx++;
      playTimeout = setTimeout(step, duration * 1000);
    }

    step();
  }

  function playFullSong() {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    initAudio();
    isPlaying = true;

    const playBtn = container.querySelector("#playFullSongBtn");
    if (playBtn) playBtn.innerHTML = "⏹️ Detener Canción";

    const fullSections = getFullSongSequence();
    let secIdx = 0;
    let chordIdx = 0;
    const duration = 0.95;

    function step() {
      if (!isPlaying) return;

      if (secIdx >= fullSections.length) {
        stopPlayback();
        return;
      }

      const currentSec = fullSections[secIdx];
      const allBlocks = container.querySelectorAll(".section-block");
      allBlocks.forEach((b, idx) => {
        if (idx === secIdx) b.classList.add("playing");
        else b.classList.remove("playing");
      });

      if (currentSec.key === "verso") {
        highlightCard(chordIdx);
        selectCard(chordIdx);
      } else {
        clearCardHighlights();
      }

      const chord = currentSec.chords[chordIdx];
      const notes = getChordNotes(chord);
      playVoicing(notes, duration, state.style);

      chordIdx++;
      if (chordIdx >= currentSec.chords.length) {
        chordIdx = 0;
        secIdx++;
      }

      playTimeout = setTimeout(step, duration * 1000);
    }

    step();
  }

  function stopPlayback() {
    isPlaying = false;
    clearTimeout(playTimeout);
    clearCardHighlights();
    renderPianoKeys([]);

    const playBtn = container.querySelector("#playFullSongBtn");
    if (playBtn) playBtn.innerHTML = "▶️ Escuchar Canción Completa";

    const allBlocks = container.querySelectorAll(".section-block");
    allBlocks.forEach(b => b.classList.remove("playing"));
  }

  function attachEvents() {
    container.querySelector("#rearmKey").addEventListener("change", (e) => {
      state.key = e.target.value;
      updateAll();
    });

    container.querySelector("#rearmLevel").addEventListener("change", (e) => {
      state.level = parseInt(e.target.value);
      updateAll();
    });

    container.querySelector("#rearmStyle").addEventListener("change", (e) => {
      state.style = e.target.value;
    });

    container.querySelector("#rearmInput").addEventListener("change", (e) => {
      const val = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
      if (val.length > 0) {
        state.chords = val;
        updateAll();
      }
    });

    container.querySelector("#rearmPreset").addEventListener("change", (e) => {
      const idx = e.target.value;
      if (idx !== "") {
        const p = PRESETS[idx];
        state.key = p.key;
        state.chords = p.chords;
        container.querySelector("#rearmKey").value = p.key;
        container.querySelector("#rearmInput").value = p.chords.join(", ");
        updateAll();
      }
    });

    container.querySelector("#playFullSongBtn").addEventListener("click", playFullSong);

    container.querySelectorAll(".add-sec-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const secType = btn.getAttribute("data-sec");
        state.songStructure.push(secType);
        renderSongBuilder();
      });
    });
  }

  renderUI();
};