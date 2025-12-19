function UploadSection() {
    return (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'var(--primary-color)', background: 'rgba(99, 102, 241, 0.05)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Upload Your Bookshelf</h3>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                Drag and drop your shelf photo here, or click to browse.
            </p>
            <button
                style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem'
                }}
            >
                Choose Image
            </button>
        </div>
    )
}

export default UploadSection
