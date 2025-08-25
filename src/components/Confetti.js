// src/components/Confetti.js
import { forwardRef, useImperativeHandle, useState } from "react";
import Confetti from "react-confetti";

const ConfettiCelebration = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    fire() {
      setShow(true);
      setTimeout(() => setShow(false), 10000); // falls naturally
    },
  }));

  return (
    <>
      {show && <Confetti recycle={false} numberOfPieces={4000} />}
    </>
  );
});

export default ConfettiCelebration;