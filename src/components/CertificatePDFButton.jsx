import React, { useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Genera y descarga un PDF tipo certificado con:
 * - JPEG + compresión (archivos ~0.6–1.5 MB normalmente)
 * - Fecha con hora y minutos
 * - “You have completed …” en una línea y “on … at …” en la siguiente
 * - Más espacio tras el título
 * - Degradado aleatorio a toda página que atraviesa el panel de datos
 */
export default function CertificatePDFButton({
  userName = "",
  classCode = "",
  schoolName = "",
  lesson,                 // p.ej. ["1.3 Cartelera de cine", ...]
  language = "French",   // "Spanish" | "French"
  spToEngMode,
  completedAt,
  fileName,
}) {
  const certRef = useRef(null);
  const [busy, setBusy] = useState(false);

  // ---------- FORMATEO FECHA/HORA ----------
  const ts = useMemo(() => (completedAt ? new Date(completedAt) : new Date()), [completedAt]);

  const dateLine1 = useMemo(() => {
    // línea 1: “You have completed …”
    const lessonTitle = Array.isArray(lesson) ? lesson[0] : String(lesson || "");
    return `You have completed ${lessonTitle} for ${language}.`;
  }, [lesson, language]);

  const dateLine2 = useMemo(() => {
    // línea 2: “on Wednesday 17 September 2025 at 17:53”
    const weekday = ts.toLocaleDateString("en-GB", { weekday: "long" });
    const day = ts.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = ts.toLocaleDateString("en-GB", { month: "long" });
    const year = ts.getFullYear();
    const timeStr = ts.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
    return `on ${weekday} ${day} ${month} ${year} at ${timeStr}`;
  }, [ts]);

  const heading = language === "Spanish" ? "¡Enhorabuena!" : "Félicitations !";

  const direction =
    typeof spToEngMode === "boolean"
      ? spToEngMode
        ? "Spanish ➜ English"
        : "English ➜ Spanish"
      : null;

  // ---------- PARÁMETROS DE CALIDAD (ajustables) ----------
  const BASE_W = 900;    // px (A4 ~ 794x1123 @96dpi; subimos un poco para nitidez)
  const BASE_H = 1273;   // px
  const SCALE = 1.6;     // 1.4–1.8 da buen balance de peso/calidad
  const JPEG_QUALITY = 0.82; // 0.75–0.85 normalmente ~1 MB

  // ---------- GRADIENTE ALEATORIO A TODA PÁGINA ----------
  const gradientStyle = useMemo(() => {
    // paleta inspirada en tu UI
    const palette = ["#7C2641", "#D91656", "#5758B4", "#ED4542", "#EB5B00", "#FFB200"];
    const shuffle = (arr) => arr.map(v => [Math.random(), v])
                                .sort((a,b)=>a[0]-b[0])
                                .map(([,v])=>v);

    const angle = Math.floor(Math.random() * 360);
    const stops = shuffle(palette).slice(0, 6).map((c, i) => {
      const pos = Math.floor(8 + Math.random() * 84); // 8–92%
      return `${c} ${pos}%`;
    });

    // Añadimos toques radiales suaves aleatorios para “huella” única
    const radials = Array.from({ length: 3 }).map(() => {
      const c = palette[Math.floor(Math.random() * palette.length)];
      const x = Math.floor(10 + Math.random() * 80);
      const y = Math.floor(10 + Math.random() * 80);
      return `radial-gradient(circle at ${x}% ${y}%, ${hexWithAlpha(c, 0.25)} 0%, transparent 55%)`;
    });

    // Capa principal lineal + radiales encima (todas visibles por html2canvas)
    return {
      backgroundImage: [
        `linear-gradient(${angle}deg, ${stops.join(", ")})`,
        ...radials,
      ].join(", "),
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }, [ts]); // cambia cada certificado

  // util para alpha en hex
  function hexWithAlpha(hex, alpha = 0.3) {
    const a = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    return `${hex}${a}`;
  }

  // ---------- DESCARGA PDF ----------
  async function handleDownload() {
    if (!certRef.current) return;
    try {
      setBusy(true);

      const canvas = await html2canvas(certRef.current, {
        scale: SCALE,
        backgroundColor: "#ffffff", // sin transparencia → mejor compresión
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", JPEG_QUALITY);

      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4", compress: true });
      const pageW = pdf.internal.pageSize.getWidth();   // 595
      const pageH = pdf.internal.pageSize.getHeight();  // 842

      const ratio = Math.min(pageW / canvas.width, pageH / canvas.height);
      const w = canvas.width * ratio;
      const h = canvas.height * ratio;
      const x = (pageW - w) / 2;
      const y = (pageH - h) / 2;

      pdf.addImage(imgData, "JPEG", x, y, w, h);
      const outName =
        fileName ||
        `certificate_${userName ? userName.replace(/\s+/g, "_") + "_" : ""}${ts
          .toISOString()
          .slice(0, 10)}.pdf`;
      pdf.save(outName);
    } finally {
      setBusy(false);
    }
  }

  const Safe = (v) => (v ? v : "—");

  return (
    <>
      <button
        type="button"
        className="main-button big-text-button"
        onClick={handleDownload}
        disabled={busy}
        aria-busy={busy}
      >
        {busy ? "Preparing PDF…" : "Download certificate"}
      </button>

      {/* Certificado oculto, pero “pintado” (no display:none) */}
      <div
        ref={certRef}
        style={{
          position: "fixed",
          left: "-10000px",
          top: 0,
          width: `${BASE_W}px`,
          height: `${BASE_H}px`,
          ...gradientStyle, // degradado aleatorio a pantalla completa
          padding: "22px",
          boxSizing: "border-box",
        }}
      >
        {/* Marco interior translúcido para que el gradiente atraviese todo */}
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "rgba(255,255,255,0.68)", // deja ver el gradiente (CAMBIA ESTO)
            borderRadius: "18px",
            boxShadow: "0 0 0 2px rgba(255,255,255,0.4) inset, 0 10px 30px rgba(0,0,0,.18)",
            display: "flex",
            flexDirection: "column",
            padding: "46px 56px",
            fontFamily: "Georgia, 'Times New Roman', ui-serif, 'Noto Serif', serif",
            color: "#111",
          }}
        >
          {/* Cabecera */}
          <header style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "13px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              Certificate of Achievement
            </div>
            <h1
              style={{
                fontSize: "56px",
                margin: "14px 0 22px 0", // MÁS espacio bajo el título (p.4)
                lineHeight: 1.1,
              }}
            >
              {heading}
            </h1>

            {/* Línea 1 y línea 2 separadas (p.3) */}
            <p style={{ margin: "0 0 6px 0", fontSize: "18px" }}>{dateLine1}</p>
            <p style={{ margin: 0, fontSize: "18px", opacity: 0.9 }}>{dateLine2}</p>
          </header>

          {/* Panel de datos (translúcido: deja pasar gradiente, p.5) */}
          <section
            style={{
              marginTop: "28px",
              borderRadius: "16px",
              padding: "22px 24px",
              background: "rgba(255,255,255,0.05)",     // casi transparente
              border: "1px solid rgba(17,24,39,0.10)",  // borde muy sutil
              boxShadow: "none",
              backdropFilter: "blur(0.6px)",
            }}
          >
            <Row label="Name" value={Safe(userName)} />
            <Row label="Class code" value={Safe(classCode)} />
            <Row label="School" value={Safe(schoolName)} />
            <Row label="Language" value={Safe(language)} />
            {direction && <Row label="Direction" value={direction} />}
            {/* Fecha completa también aquí si te interesa tenerla duplicada */}
            <Row label="Date" value={dateLine2.replace(/^on\s+/i, "")} />
          </section>

          {/* Firmas */}
          <footer
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <SigLine label="Teacher / Examiner" />
            <div style={{ textAlign: "center", opacity: 0.8 }}>
              <div style={{ fontSize: 12 }}>Issued by</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>MFL Vocab Trainer</div>
            </div>
            <SigLine label="Student" />
          </footer>
        </div>
      </div>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: "12px",
        alignItems: "baseline",
        padding: "10px 0",
        borderBottom: "1px dashed rgba(17,24,39,0.18)",
      }}
    >
      <div style={{ fontWeight: 700 }}>{label}:</div>
      <div>{value}</div>
    </div>
  );
}

function SigLine({ label }) {
  return (
    <div style={{ width: 220, textAlign: "center" }}>
      <div
        style={{
          borderBottom: "1.5px solid #111",
          height: 36,
          marginBottom: 8,
        }}
      />
      <div style={{ fontSize: 12, opacity: 0.75 }}>{label}</div>
    </div>
  );
}