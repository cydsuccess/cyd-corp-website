import { useEffect } from "react";

export default function Toast({ kind = "success", text = "", open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), 2800);
    return () => clearTimeout(t);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={`toast ${kind === "success" ? "toast-success" : "toast-error"}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${kind === "success" ? "bg-cyan-400" : "bg-red-400"} toast-ring`} />
        <span>{text}</span>
      </div>
    </div>
  );
}
