// toastUtils.js
import { toast } from "react-toastify";

export const alertToast = (message, type = "success") => {
  const options = {
    position: "top-right",
    autoClose: 2300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
    default:
      toast(message, options); // generic toast
  }
};
