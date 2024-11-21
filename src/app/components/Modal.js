import React from "react";
/**
 * @typedef {Object} ModalProps
 * @property {boolean} modalOpen - Declare of the open state of the modal.
 * @property {(open: boolean) => boolean | void} setIsOpen - Function to close the modal it can return void ntg too.
 * @property {React.ReactNode} children - The content of the modal.
 */
// @ts-check

const Modal = ({modalOpen ,setIsOpen , children}) => {
    return (
        
        <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
                <form method="dialog" onClick={()=> setIsOpen(false)}>
                    
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {children}
            </div>
        </dialog>
    );
}
export default Modal;