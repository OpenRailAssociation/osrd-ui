import { useState } from "react";
import cx from "classnames";
import { X } from '@osrd-project/ui-icons';


type TokenInputProps = {
    label:string,
    tokens:string[]
}

const TokenInput : React.FC<TokenInputProps> = ({
    label,
    tokens: initialTokens
}) => {
    const [tokens, setTokens] = useState(initialTokens);
    const [newToken, setNewToken] = useState("");
    const [selectedToken, setSelectedToken] = useState<number|null>(null);

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            setTokens(oldTokens => [...oldTokens, newToken])
            setNewToken("")
        }
    }

    return (
        <div className="token-input-wrapper">
            <label className="input-label">
                {label}
            </label>
            <div className="tokens-wrapper">
                {tokens.map((token, index) => (
                    <div 
                        key={`${token}-${index}`}
                        onClick={e => setSelectedToken(index)}
                        className={cx("token-item-wrapper", {"selected":selectedToken === index})}
                    >
                            <span className="token-label">{token}</span>
                            <span 
                                className="token-close-btn"
                                onClick={ e => setTokens(oldTokens => oldTokens.filter((t, i) => i !== index))}
                            >
                                <X/>
                            </span>
                    </div>
                ))}
                <input 
                    type="text"
                    value={newToken}
                    onChange={e => setNewToken(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="token-input"
                />
            </div>
        </div>
    )
}



export default TokenInput;
