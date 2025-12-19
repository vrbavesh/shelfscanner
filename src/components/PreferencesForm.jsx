function PreferencesForm() {
    return (
        <div className="glass-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                Reading Preferences
            </h3>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Broad Genres You Like
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Sci-Fi, History, Thriller..."
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(0,0,0,0.2)',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Current Mood
                    </label>
                    <select
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--glass-border)',
                            background: 'rgba(0,0,0,0.2)',
                            color: 'white',
                            fontSize: '1rem'
                        }}
                    >
                        <option value="">Select a mood...</option>
                        <option value="adventurous">Adventurous</option>
                        <option value="relaxed">Relaxed / Cozy</option>
                        <option value="learning">Intellectual / Learning</option>
                        <option value="dark">Dark / Mysterious</option>
                        <option value="emotional">Emotional</option>
                    </select>
                </div>

                <button
                    style={{
                        background: 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
                        color: 'white',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        marginTop: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    Find My Match
                </button>
            </div>
        </div>
    )
}

export default PreferencesForm
