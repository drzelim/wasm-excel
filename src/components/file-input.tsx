export const FileInput: React.FC<{
    onFileChange: (file: File | null) => void;
}> = ({ onFileChange }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            onFileChange(event.target.files[0]);
        } else {
            onFileChange(null);
        }
    };

    return <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />;
};
