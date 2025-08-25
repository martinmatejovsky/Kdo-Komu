import {type Dispatch, type ReactNode, type SetStateAction} from "react";
import '../styles/overlay.scss'
import * as React from "react";

interface Props {
    children: ReactNode,
    setClose: Dispatch<SetStateAction<boolean>>,
    title?: string
}

const Overlay = ({children, setClose, title}: Props) => {
    function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) setClose(false)
    }

    return (
        <div className={'overlay'} onClick={handleOutsideClick}>
            <div className="overlay__wrapper">
                <div className="overlay__controls">
                    {title && <h2>{title}</h2>}

                    <button type={'button'} onClick={() => setClose(false)}
                            className="close overlay__close">&#10006;
                    </button>
                </div>

                <section className="overlay__content">
                    {
                        children
                    }
                </section>
            </div>
        </div>
    )
}

export default Overlay