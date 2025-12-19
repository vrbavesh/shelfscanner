import React, { useState, useRef } from 'react';

function UploadSection({ onImageSelected }) {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file) => {
        // Basic validation
        if (!file.type.startsWith('image/')) {
            alert("Please upload an image file (JPEG, PNG).");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            // Pass file back to parent
            onImageSelected(file, reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div className="fade-in">
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Upload Your Bookshelf</h2>

            <div
                className={`card ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{
                    textAlign: 'center',
                    padding: '3rem',
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                    borderColor: dragActive ? 'var(--accent-color)' : 'var(--border-color)',
                    backgroundColor: dragActive ? 'var(--surface-color)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                onClick={onButtonClick}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="visually-hidden"
                />

                {preview ? (
                    <div style={{ position: 'relative' }}>
                        <img
                            src={preview}
                            alt="Shelf Preview"
                            style={{ maxHeight: '300px', maxWidth: '100%', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}
                        />
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Click or drag to replace image</p>
                    </div>
                ) : (
                    <>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>📸</div>
                        <p style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                            Drag & Drop your shelf photo
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            or click to browse
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default UploadSection;
