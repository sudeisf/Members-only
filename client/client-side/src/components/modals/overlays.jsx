
import { createPortal } from "react-dom"
import UiAtom from "../../State/modalState"
import { useAtomValue } from "jotai"
import Modal from "./modal"

const Overlays = () => {
    const ui = useAtomValue(UiAtom);
    const mountElement = document.getElementById('portal-root');

    
    if (!mountElement) return null;
    const isOpen = ui?.modals?.secretModal?.isOpen;
    const clubId = ui?.modals?.secretModal?.clubID;




    return createPortal(
    <>
       {isOpen && <Modal type='secretPage' clubId ={clubId} />} 
        
        
    </>,
    mountElement
    );
    
}

export default Overlays;