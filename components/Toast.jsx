// components/Toast.jsx
import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-white
      ${type === "success" ? "bg-cyan-500" : "bg-red-500"}`}>
      {message}
    </div>
  );
}
