// import { useAtom } from "jotai";
// import { UiAtom } from "../State/modalState";
import  SecretSection from '../components/SecretePage';


const Modal = ({type}) => {
   const  modalContent = {
     secretPage : <SecretSection/>,
   }

   return (
    <>{modalContent[type] || null}</>
   )
}



export default Modal;