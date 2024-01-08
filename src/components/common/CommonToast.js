import { toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const CommonToast = (type, text) => {

  if (type === "success") {
    toast.success(
      <p className="text-white tx-16 mb-0 d-print-none">{text}</p>,
      {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        transition: Slide,
        autoClose: 1000,
        theme: "colored",
      }
    );
  }
  if (type === "warn") {
    toast.warn(
      <p className="text-white tx-16 mb-0 d-print-none">{text}</p>,
      {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        transition: Slide,
        autoClose: 1000,
        theme: "colored",
      }
    );
  }
  if (type === "conflict") {
    toast.error(
      <p className="text-white tx-16 mb-0 d-print-none">{text}</p>,
      {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        transition: Slide,
        autoClose: 1000,
        theme: "colored", 
      }
    );
  }

  if (type === "error") {
    toast.error(
      <p className="text-white tx-16 mb-0 d-print-none">{text}</p>,
      {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        transition: Slide,
        autoClose: 1000,
        theme: "colored",
      }
    );
  }
};

export default CommonToast;
