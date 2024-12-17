// import { useAtom } from "jotai";
// import { UiAtom } from "../State/modalState";
import  SecretSection from './VarificationModal';


const Modal = ({type}) => {
   const  modalContent = {
     secretPage : <SecretSection/>,
   }

   return (
    <>{modalContent[type] || null}</>
   )
}



export default Modal;