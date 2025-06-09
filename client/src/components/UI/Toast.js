import React, { useState, useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, type = "error", duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`toast toast--${type} ${
        isVisible ? "toast--visible" : "toast--hidden"
      }`}
    >
      <div className="toast__content">
        <span className="toast__message">{message}</span>
        <button className="toast__close" onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Global toast functions
  window.showToast = addToast;
  window.showErrorToast = (message) => addToast(message, "error");
  window.showSuccessToast = (message) => addToast(message, "success");

  return (
    <>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
};

export default Toast;
