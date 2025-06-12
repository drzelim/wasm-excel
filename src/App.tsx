import './App.css';
import { useState } from 'react';
import { process_excel_file } from './wasm';
import { loadFile } from './helpers';
import FileUploadButton from './components/FileButton/FileButton';

function App() {
    const [loading, setLoading] = useState(false);
    const [outputMsg, setOutputMsg] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onInputChange = async (file: File | null) => {
        setOutputMsg(null);
        setSuccessMessage(null);
        setLoading(true);

        if (!file) {
            setLoading(false);
            setOutputMsg('Файл не выбран');
            return;
        }

        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        try {
            const bytes: Uint8Array = await process_excel_file(uint8Array);

            if (!bytes) {
                setOutputMsg('Ошибка обработки файла');
                return;
            }

            if (!bytes.length) {
                setOutputMsg('Файл не содержит данных для отчета');
                return;
            }

            loadFile(bytes, file.name.replace(/\.[^/.]+$/, '') + '-output.xlsx');
            setSuccessMessage('Отчет успешно создан');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const clearMessages = () => {
        setOutputMsg(null);
        setSuccessMessage(null);
        setLoading(false);
    };

    return (
        <main className="container">
            <div className="content">
                <h1>Группировка данных</h1>
                <p>Выберите файл для создания отчета</p>

                <div className="row">
                    <label>
                        <FileUploadButton onFileChange={onInputChange} clearMessages={clearMessages} />
                    </label>
                </div>

                {loading && <div className="loading">Идет формирование отчета...</div>}

                {outputMsg && <div className="result error">{outputMsg}</div>}
                {successMessage && <div className="result">{successMessage}</div>}
            </div>
        </main>
    );
}

export default App;
