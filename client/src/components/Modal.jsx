import React, {useRef, useState} from "react";

function Modal({ onClose , url}) {
    const [clicked, setClicked] = useState(false);

    const urlRef = useRef(null);

    const copyToClipboard = () => {
        // Access the text to copy from the ref
        const textToCopy = urlRef.current.innerText;

        // Use the Clipboard API to copy the text
        navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Text copied to clipboard:', textToCopy);
        })
        .catch((error) => {
            console.error('Error copying text to clipboard:', error);
        });

        setClicked(true);
    };


    return(
        <div className="modal">
            <h4 className="close_modal" onClick={onClose}>X</h4>
            <h3 ref={urlRef}>{url}</h3>
            {
                clicked ? <button onClick={copyToClipboard}>Copied</button> : <button onClick={copyToClipboard}>Copy link</button>
            }        
        </div>
    );
}

export default Modal;