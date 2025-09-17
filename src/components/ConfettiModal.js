import React from "react";
import CertificatePDFButton from "./CertificatePDFButton";

export default function ConfettiModal({
  shouldCelebrate = false,
  onClose,
  onPlayAgain,
  userName,
  classCode,
  schoolName,
  lesson,
  language,
  spToEngMode,
  completedAt, // pass a Date from parent when the user finishes
}) {
  if (!shouldCelebrate) return null;

  const ts = completedAt ? new Date(completedAt) : new Date();
  const timeStr = ts.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  const weekday = ts.toLocaleDateString("en-GB", { weekday: "long" });
  const dateStr = ts.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        <h2>
          {language === "Spanish" ? "¡Enhorabuena" : "Félicitations"}
          {userName && ` ${userName}`}
          {classCode && ` (${classCode})`}
          {schoolName && `, from ${schoolName}`}!
        </h2>
        <p>
          You have completed lesson <strong>{lesson[0]}</strong> for {language} at {timeStr} on {weekday}, {dateStr}.
        </p>

        {spToEngMode && <p>You translated from <strong>{language} to English</strong>.</p>}

        {!spToEngMode && <p>You translated from <strong>English to {language}</strong>.</p>}

        {userName && 
          <p>Make sure you take a snapshot of this screen before closing this window.</p>
        }

        <div className="modal-actions" style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
          <CertificatePDFButton
            userName={userName}
            classCode={classCode}
            schoolName={schoolName}
            lesson={lesson}
            language={language}
            spToEngMode={spToEngMode}
            completedAt={completedAt}
          />
          <button type="button" className="main-button" onClick={onClose}>Close</button>
        </div>

      </div>
    </div>
  );
}