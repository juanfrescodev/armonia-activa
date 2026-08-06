// ============================================================
// ARMONÍA ACTIVA
// js/herramientas/afinador.js
// ============================================================
// AFINADOR CROMÁTICO EN TIEMPO REAL
// - Captura micrófono con getUserMedia + Web Audio API.
// - Detección de pitch por Autocorrelación.
// - Visualizador de aguja/desviación en centésimas de semitono (cents).
// ============================================================

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

const NOTAS_AFINADOR = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FREC_A4 = 440; // A4 de referencia

window.HERRAMIENTAS.afinador = function(panel) {
    if (!panel) return;

    let audioCtx = null;
    let analyser = null;
    let micStream = null;
    let animFrameId = null;

    panel.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 24px; max-width: 700px; margin: 0 auto; padding-bottom: 40px;">
            
            <!-- Encabezado -->
            <div style="display: flex; flex-direction: column; gap: 12px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px; border-radius: 16px; border: 1px solid #334155;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <button type="button" id="volverHerramientas" style="
                        background: rgba(51, 65, 85, 0.6); border: 1px solid #475569; color: #f8fafc; 
                        padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;
                    ">← Volver a Herramientas</button>
                    <span style="font-size: 2rem;">🎧</span>
                </div>
                <div>
                    <h2 style="font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin: 0 0 6px 0;">Afinador Cromático</h2>
                    <p style="color: #94a3b8; margin: 0; font-size: 1rem;">Toca una nota en tu instrumento o cantá. El afinador te dirá la nota exacta y si estás afinado, grave o agudo.</p>
                </div>
            </div>

            <!-- Botón de Inicio de Micrófono -->
            <div id="pantallaInicioMic" style="background: #1e293b; padding: 40px 20px; border-radius: 16px; border: 1px solid #334155; text-align: center;">
                <button type="button" id="btnActivarMic" style="
                    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: white;
                    border: none; padding: 16px 32px; font-size: 1.2rem; font-weight: 800; border-radius: 12px;
                    cursor: pointer; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
                ">🎤 Activar Micrófono</button>
                <p style="color: #64748b; font-size: 0.85rem; margin-top: 12px;">Se solicitará permiso de acceso al micrófono en tu navegador.</p>
            </div>

            <!-- Interfaz del Afinador (Oculta al inicio) -->
            <div id="interfazAfinador" style="display: none; background: #1e293b; padding: 30px; border-radius: 16px; border: 1px solid #334155; text-align: center; flex-direction: column; align-items: center; gap: 20px;">
                
                <!-- Nota Detectada u Octava -->
                <div style="position: relative; display: inline-block;">
                    <div id="displayNotaAfinador" style="font-size: 5rem; font-weight: 900; color: #94a3b8; line-height: 1; transition: color 0.15s ease;">--</div>
                    <div id="displayOctavaAfinador" style="font-size: 1.2rem; font-weight: 700; color: #64748b; margin-top: 4px;">-</div>
                </div>

                <!-- Frecuencia en Hz -->
                <div id="displayFrecuenciaAfinador" style="font-size: 1.1rem; font-weight: 700; color: #38bdf8;">0.0 Hz</div>

                <!-- Indicador de Aguja / Cents -->
                <div style="width: 100%; max-width: 400px; background: #0f172a; padding: 20px; border-radius: 12px; border: 1px solid #475569; position: relative;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #64748b; font-weight: 800; margin-bottom: 8px;">
                        <span>♭ GRAVE (-50c)</span>
                        <span id="estadoAfinacion" style="color: #38bdf8;">ESCUCHANDO</span>
                        <span>AGUDO (+50c) ♯</span>
                    </div>

                    <!-- Pista de la Aguja -->
                    <div style="position: relative; height: 12px; background: #334155; border-radius: 6px; overflow: hidden;">
                        <!-- Centro (Afinado) -->
                        <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 4px; background: #22c55e; transform: translateX(-50%); z-index: 2;"></div>
                        <!-- Aguja Móvil -->
                        <div id="agujaAfinador" style="position: absolute; left: 50%; top: 0; bottom: 0; width: 8px; background: #38bdf8; border-radius: 4px; transform: translateX(-50%); transition: left 0.1s ease, background 0.15s ease; z-index: 3;"></div>
                    </div>
                </div>

                <!-- Botón Apagar -->
                <button type="button" id="btnDesactivarMic" style="
                    background: transparent; border: 1px solid #64748b; color: #94a3b8;
                    padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600; margin-top: 10px;
                ">Detener Micrófono</button>
            </div>

        </div>
    `;

    // Conectar botón de salida
    const volver = document.getElementById("volverHerramientas");
    if (volver) {
        volver.addEventListener("click", () => {
            if (typeof volverHerramientas === "function") volverHerramientas();
        });
    }

    const btnActivar = document.getElementById("btnActivarMic");
    const btnDesactivar = document.getElementById("btnDesactivarMic");

    if (btnActivar) btnActivar.addEventListener("click", iniciarMicrofono);
    if (btnDesactivar) btnDesactivar.addEventListener("click", deteniendoMicrofono);

    async function iniciarMicrofono() {
        try {
            micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            analyser.fftSize = 2048;

            const source = audioCtx.createMediaStreamSource(micStream);
            source.connect(analyser);

            document.getElementById("pantallaInicioMic").style.display = "none";
            document.getElementById("interfazAfinador").style.display = "flex";

            procesarPitch();
        } catch (err) {
            alert("No se pudo acceder al micrófono. Asegurate de dar los permisos correspondientes.");
        }
    }

    function deteniendoMicrofono() {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        if (micStream) {
            micStream.getTracks().forEach(track => track.stop());
            micStream = null;
        }
        if (audioCtx && audioCtx.state !== 'closed') {
            audioCtx.close();
            audioCtx = null;
        }

        document.getElementById("pantallaInicioMic").style.display = "block";
        document.getElementById("interfazAfinador").style.display = "none";
    }

    // Loop de detección continuo
    function procesarPitch() {
        if (!analyser) return;

        const buffer = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(buffer);

        const pitch = autocorrelacion(buffer, audioCtx.sampleRate);

        if (pitch !== -1) {
            actualizarUI(pitch);
        }

        animFrameId = requestAnimationFrame(procesarPitch);
    }

    // Registro de limpieza obligatoria
    panel._limpiarHerramienta = function() {
        deteniendoMicrofono();
    };
};

// ============================================================
// ALGORITMO DE AUTOCORRELACIÓN PARA PITCH
// ============================================================
function autocorrelacion(buffer, sampleRate) {
    const SIZE = buffer.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
        const val = buffer[i];
        rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    // Umbral de silencio
    if (rms < 0.01) return -1;

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    }

    const buf = buffer.slice(r1, r2);
    const newSize = buf.length;

    const c = new Array(newSize).fill(0);
    for (let i = 0; i < newSize; i++) {
        for (let j = 0; j < newSize - i; j++) {
            c[i] = c[i] + buf[j] * buf[j + i];
        }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < newSize; i++) {
        if (c[i] > maxval) {
            maxval = c[i];
            maxpos = i;
        }
    }

    let T0 = maxpos;

    // Interpolación parabólica para precisión
    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
}

// ============================================================
// CÁLCULOS Y ACTUALIZACIÓN VISUAL
// ============================================================
function actualizarUI(frecuencia) {
    // Convertir Frecuencia a Semitonos desde A4 (440Hz)
    const semitonoDesdeA4 = 12 * (Math.log(frecuencia / FREC_A4) / Math.log(2));
    const notaNumero = Math.round(semitonoDesdeA4) + 69; // 69 es A4 en MIDI
    
    const nombreNota = NOTAS_AFINADOR[notaNumero % 12];
    const octava = Math.floor(notaNumero / 12) - 1;
    
    // Frecuencia teórica exacta de la nota más cercana
    const frecTeorica = FREC_A4 * Math.pow(2, (notaNumero - 69) / 12);
    
    // Desviación en cents (-50 a +50)
    const cents = Math.floor(1200 * (Math.log(frecuencia / frecTeorica) / Math.log(2)));

    // Renderizar
    const displayNota = document.getElementById("displayNotaAfinador");
    const displayOctava = document.getElementById("displayOctavaAfinador");
    const displayFrec = document.getElementById("displayFrecuenciaAfinador");
    const estado = document.getElementById("estadoAfinacion");
    const aguja = document.getElementById("agujaAfinador");

    if (!displayNota) return;

    displayNota.textContent = nombreNota;
    displayOctava.textContent = `Octava ${octava}`;
    displayFrec.textContent = `${frecuencia.toFixed(1)} Hz`;

    // Posición aguja en porcentaje (0% a 100%, 50% es perfecto)
    const posPorcentaje = Math.min(Math.max(50 + cents, 5), 95);
    aguja.style.left = `${posPorcentaje}%`;

    // Estado visual por color
    if (Math.abs(cents) <= 5) {
        displayNota.style.color = "#22c55e"; // Verde = Afinado
        aguja.style.background = "#22c55e";
        estado.textContent = "¡AFINADO!";
        estado.style.color = "#22c55e";
    } else if (cents < -5) {
        displayNota.style.color = "#38bdf8"; // Azul = Grave
        aguja.style.background = "#38bdf8";
        estado.textContent = "GRAVE";
        estado.style.color = "#38bdf8";
    } else {
        displayNota.style.color = "#f59e0b"; // Naranja = Agudo
        aguja.style.background = "#f59e0b";
        estado.textContent = "AGUDO";
        estado.style.color = "#f59e0b";
    }
}