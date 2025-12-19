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
            // Pass file back to parent waiting 1s for "processing" effect
            setTimeout(() => onImageSelected(file, reader.result), 800);
        };
        reader.readAsDataURL(file);
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <h2>Step 1: Digitalize Your Library</h2>
                <p>Upload a clear photo of your bookshelf to begin the curation process.</p>
            </div>

            <div className="split-layout">
                {/* Main Upload Area */}
                <div>
                    <div
                        className={`card ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            borderStyle: 'dashed',
                            borderWidth: '2px',
                            borderColor: dragActive ? 'var(--accent-color)' : 'var(--border-color)',
                            backgroundColor: dragActive ? 'var(--surface-color)' : 'var(--bg-color)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
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
                            <div>
                                <div className="spinner" style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>↻</div>
                                <p style={{ marginTop: '1rem', fontWeight: 600 }}>Processing image...</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.5 }}>☁️</div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                                    Drag & Drop your library photo
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                    Supports JPG, PNG, HEIC up to 10MB
                                </p>
                                <button className="btn-secondary">Browse Files</button>
                            </>
                        )}
                    </div>
                </div>

                {/* Sidebar Context */}
                <div>
                    <div className="sidebar-panel">
                        <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Pre-Flight Checklist</h4>
                        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                            For best results, ensure your photo meets these criteria:
                        </p>
                        <ul className="checklist">
                            <li>Good lighting (avoid glare on shiny spines)</li>
                            <li>High resolution (titles clearly readable)</li>
                            <li>Straight angle (head-on shot preferred)</li>
                            <li>One shelf section at a time</li>
                        </ul>

                        <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />

                        <div className="info-badge badge-gray" style={{ marginBottom: '0.5rem' }}>
                            🔒 Secure Processing
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            Images are processed in real-time and are discarded immediately after analysis. We do not store your personal photos.
                        </p>
                    </div>
                </div>
            </div>
            <style>{`
            @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
        </div>
    );
}

export default UploadSection;
