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
      {show && (
        <div
          style={{
            position: "fixed",
            inset: 0, // shorthand for top:0; right:0; bottom:0; left:0
            zIndex: 2000,
            pointerEvents: "none", // let user still click buttons behind
          }}
        >
          <Confetti
            recycle={false}
            numberOfPieces={4000}
          />
        </div>
      )}
    </>
  );
});

export default ConfettiCelebration;