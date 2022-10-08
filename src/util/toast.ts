import { toast } from "react-toastify";

export const toastSuccess = (text: string, time?: number) => {
  toast.success(text, {
    position: "top-center",
    autoClose: time ? time : 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const toastError = (text: string, time?: number) => {
  toast.error(text, {
    position: "top-center",
    autoClose: time ? time : 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
