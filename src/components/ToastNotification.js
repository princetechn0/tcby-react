import { Toast, ToastContainer } from "react-bootstrap";

function ToastNotification({ onClose, showToast, message }) {
  return (
    <ToastContainer position="top-end" className="m-5">
      <Toast onClose={onClose} show={showToast} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastNotification;
