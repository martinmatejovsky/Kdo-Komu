import type {Dispatch, ReactNode, SetStateAction} from "react";
import '../styles/overlay.scss'

interface Props {
    children: ReactNode,
    setClose: Dispatch<SetStateAction<boolean>>,
    title?: string
}

const Overlay = ({children, setClose, title}: Props) => {
    return (
        <div className={'overlay'}>
            <div className="overlay__wrapper">
                <div className="overlay__controls">
                    {title && <h2>{title}</h2>}

                    <button type={'button'} onClick={() => setClose(false)}
                            className="close overlay__close">&#10006;
                    </button>
                </div>

                <div className="overlay__content">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}

export default Overlay