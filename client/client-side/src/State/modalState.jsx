
import { atom } from "jotai";

 const UiAtom = atom({
    modals: {
        secretModal: {
            isOpen: false,
            clubId: ''
        }
    }
});

export default UiAtom;

