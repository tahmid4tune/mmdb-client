import { FC, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { ToastAlertProps } from "../../lib/hooks/useToastAlert";

interface ToastWithCloseButtonProps extends ToastAlertProps {
  onClose?: () => void;
}
const ToastAlert: FC<ToastWithCloseButtonProps> = ({
  visible,
  onClose,
  variant,
  message,
}) => {
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        onClose && onClose();
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Toast
      className={`mine-toast mine-toast-${variant}`}
      show={visible}
      onClose={onClose}
    >
      <Toast.Body className="d-flex">
        <div className="w-100 float-start">
          <p className={`fw-bold text-${variant} m-0 float-end`}>{message}</p>
        </div>
      </Toast.Body>
    </Toast>
  );
};

ToastAlert.defaultProps = {
  variant: "primary",
  visible: false,
};

export default ToastAlert;
