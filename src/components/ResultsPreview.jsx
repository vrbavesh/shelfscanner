function ResultsPreview() {
    // Mock data for UI 
    const books = [
        { title: "Dune", author: "Frank Herbert", relevance: 98 },
        { title: "Foundation", author: "Isaac Asimov", relevance: 85 },
        { title: "Project Hail Mary", author: "Andy Weir", relevance: 72 },
    ]

    return (
        <div className="glass-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>
                Top Recommendations From Your Shelf
            </h3>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {books.map((book, i) => (
                    <div
                        key={i}
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            padding: '1rem',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderLeft: `4px solid ${i === 0 ? 'var(--accent-color)' : 'var(--glass-border)'}`
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{book.title}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Match Score: {book.relevance}%</div>
                        </div>
                        {i === 0 && <span style={{ background: 'var(--accent-color)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Top Pick</span>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResultsPreview
