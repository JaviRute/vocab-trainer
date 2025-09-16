import React, { useEffect, useState } from 'react';
import './Modal.css';

export default function UserInfo({
  userName, setUserName,
  classCode, setClassCode,
  schoolName, setSchoolName,
  showUserInfo, setShowUserInfo,
  handleUserInfo, inputRef
}) {
  // Local draft so typing doesn't change parent state until Save
  const [draft, setDraft] = useState({
    userName: '',
    classCode: '',
    schoolName: ''
  });

  // When the modal opens, preload the draft with current saved values
  useEffect(() => {
    if (showUserInfo) {
      setDraft({
        userName: userName || '',
        classCode: classCode || '',
        schoolName: schoolName || ''
      });
      // optional focus
      setTimeout(() => inputRef?.current?.focus?.(), 0);
    }
  }, [showUserInfo, userName, classCode, schoolName, inputRef]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setDraft((d) => ({ ...d, [name]: value }));
  };

  const saveAndClose = () => {
    setUserName(draft.userName.trim());
    setClassCode(draft.classCode.trim());
    setSchoolName(draft.schoolName.trim());
    handleUserInfo(); // close modal
  };

  if (!showUserInfo) return null;

  return (
    <div className="modal-backdrop" onClick={handleUserInfo} role="dialog" aria-modal="true">
      <div className="user-modal" onClick={(e) => e.stopPropagation()}>
        {/* Full name */}
        <div className="field-row">
          <label htmlFor="fullName" className="field-label">Full name</label>
          <div className="field-inputs">
            <input
              id="fullName"
              name="userName"
              className="user-info"
              type="text"
              value={draft.userName}
              onChange={onChange}
              placeholder="e.g. Michael Jordan"
              ref={inputRef}
              autoComplete="name"
            />
          </div>
        </div>

        {/* Class code */}
        <div className="field-row">
          <label htmlFor="classCode" className="field-label">Class code</label>
          <div className="field-inputs">
            <input
              id="classCode"
              name="classCode"
              className="user-info"
              type="text"
              value={draft.classCode}
              onChange={onChange}
              placeholder="e.g. 10C/Sp1"
              autoComplete="off"
            />
          </div>
        </div>

        {/* School */}
        <div className="field-row">
          <label htmlFor="schoolName" className="field-label">School</label>
          <div className="field-inputs">
            <input
              id="schoolName"
              name="schoolName"
              className="user-info"
              type="text"
              value={draft.schoolName}
              onChange={onChange}
              placeholder="e.g. Enfield County School for Girls"
              autoComplete="organization"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="modal-actions" style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
          <button type="button" className="main-button" onClick={handleUserInfo}>
            Cancel
          </button>
          <button type="button" className="main-button" onClick={saveAndClose}>
            Save
          </button>
        </div>
        <p className="privacy-note">
            <strong>Privacy:</strong> The name, class and school you enter stay on <em>this device only</em>.
            We don't save or send this data, therefore it can't be stolen either. It's only used to show your progress today.
            If you prefer, you may use a nickname already agreed with your teacher.
        </p>
      </div>
    </div>
  );
}