import { useRef, useState } from 'react';
import findLongestPeriodPairTeam from '../../utils/findLongestPeriodPairTeam';
import './Uploader.css';

const Uploader = ({ setData }) => {
    const [isWrongFormat, setWrongFormat] = useState(false);
    const inputRef = useRef(null);

    const handleChangeInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'text/plain') {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const text = e.target.result;
                    setData(findLongestPeriodPairTeam(text));
                };
                reader.readAsText(file);
            } else {
                setWrongFormat(true);
                inputRef.current.value = null;
            }
        }
    };

    return (
        <div className='uploader-wrapper'>
            {isWrongFormat ? (
                <p className='uploader-empty-state-text error-text'>
                    The file should be in text format
                </p>
            ) : (
                <p className='uploader-empty-state-text'>
                    Please, upload a text file
                </p>
            )}
            <div className='uploader-input-wrapper'>
                <input
                    type='file'
                    id='file'
                    name='file'
                    ref={inputRef}
                    onChange={handleChangeInput}
                />
            </div>
        </div>
    );
};

export default Uploader;
