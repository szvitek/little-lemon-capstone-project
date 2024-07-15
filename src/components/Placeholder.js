import { useState } from "react";

export default function Placeholder({ children, title }) {
  const [msg, setMsg] = useState(title)

  return (
    <div className="placeholder">
      {title ? (
        <div
          className="placeholder__title"
          onMouseOver={() => setMsg('Coming soon')}
          onMouseLeave={() => setMsg(title)}
        >
          {msg}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
