import { toast } from "react-toastify";

export const Success = (msg) => {
  toast.success(msg, {
    position: "top-right"
  })
} 

export const Error = (msg) => {
  toast.error(msg, {
    position: "top-right"
  })
} 