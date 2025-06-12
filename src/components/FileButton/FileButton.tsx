import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';
import CloseIcon from '../../assets/icons/close.svg';
import './FileButton.css';

interface FileUploadButtonProps {
    onFileChange: (file: File | null) => void;
    clearMessages: () => void;
}

export default function FileUploadButton({ onFileChange, clearMessages }: FileUploadButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleClick = () => {
        inputRef.current?.click();
        inputRef.current!.value = ''; // Clear the input value to allow re-uploading the same file
        setFile(null); // Reset the file state
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            clearMessages();
        }
    };

    const deleteFileHandler = (evt: React.MouseEvent) => {
        evt.stopPropagation();
        evt.preventDefault();
        setFile(null);
        onFileChange(null);
    };

    const getReportButtonClickHandler = () => {
        if (file) {
            onFileChange(file);
        } else {
            onFileChange(null);
        }
    };

    return (
        <div className="file-upload-button">
            <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />

            <Button variant="contained" onClick={handleClick}>
                Загрузить файл
            </Button>

            {file && (
                <div className="file-info">
                    <span>Выбран файл: {file.name}</span> <img src={CloseIcon} onClick={deleteFileHandler} />
                </div>
            )}

            {file && (
                <div className="get-report-button">
                    <Button variant="outlined" onClick={getReportButtonClickHandler}>
                        Сформировать отчет
                    </Button>
                </div>
            )}
        </div>
    );
}
