import React, { useState } from 'react';

const GENRE_OPTIONS = [
    "Sci-Fi", "Fantasy", "Mystery", "Imaginative",
    "History", "Productivity", "Finance", "Classic",
    "Biography", "Technology", "Philosophy"
];

const MOOD_OPTIONS = [
    { value: "adventurous", label: "Adventurous / Bold" },
    { value: "relaxed", label: "Relaxed / Cozy" },
    { value: "learning", label: "Intellectual / Learning" },
    { value: "dark", label: "Dark / Mysterious" },
    { value: "emotional", label: "Emotional / Deep" },
    { value: "funny", label: "Lighthearted / Funny" }
];

function PreferencesForm({ onSubmit }) {
    const [genres, setGenres] = useState([]);
    const [mood, setMood] = useState("");
    const [authorInfo, setAuthorInfo] = useState("");
    const [persona, setPersona] = useState("general");

    const toggleGenre = (genre) => {
        if (genres.includes(genre)) {
            setGenres(genres.filter(g => g !== genre));
        } else {
            setGenres([...genres, genre]);
        }
    };

    const handleSubmit = () => {
        if (genres.length === 0 || !mood) {
            alert("Please select at least one genre and a mood.");
            return;
        }
        onSubmit({ genres, mood, authorInfo, persona });
    };

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <h2>Step 2: Calibrate Recommendations</h2>
                <p>Tell us a bit about what you're looking for so we can filter your library effectively.</p>
            </div>

            <div className="split-layout">
                {/* Main Form */}
                <div className="card">

                    {/* Persona Selector */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600' }}>
                            Reader Persona <span className="info-badge badge-blue">New</span>
                        </label>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {['General Reader', 'Academic', 'Casual'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPersona(p)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: persona === p ? 'var(--accent-color)' : 'var(--border-color)',
                                        background: persona === p ? 'var(--bg-color)' : 'transparent',
                                        fontWeight: persona === p ? '600' : '400',
                                        color: persona === p ? 'var(--text-primary)' : 'var(--text-secondary)'
                                    }}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                            Adjusts the complexity and tone of recommendations.
                        </p>
                    </div>

                    {/* Genre Chips */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600' }}>
                            Content Filters (Genres)
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {GENRE_OPTIONS.map(genre => (
                                <button
                                    key={genre}
                                    onClick={() => toggleGenre(genre)}
                                    style={{
                                        padding: '0.4rem 1rem',
                                        borderRadius: '20px',
                                        border: '1px solid',
                                        borderColor: genres.includes(genre) ? 'var(--accent-color)' : 'var(--border-color)',
                                        background: genres.includes(genre) ? 'var(--accent-color)' : 'transparent',
                                        color: genres.includes(genre) ? 'white' : 'var(--text-secondary)',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mood Select */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600' }}>
                            Current Vibe / Mood
                        </label>
                        <select
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className="input-field"
                        >
                            <option value="">Select a mood...</option>
                            {MOOD_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Optional Author */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600' }}>
                            Favorite Authors (Optional)
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Isaac Asimov, Malcolm Gladwell..."
                            value={authorInfo}
                            onChange={(e) => setAuthorInfo(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="btn-primary"
                        style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
                    >
                        Start Analysis →
                    </button>
                </div>

                {/* Live Context Sidebar */}
                <div>
                    <div className="sidebar-panel" style={{ position: 'sticky', top: '2rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Search Config</h4>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Selected Genres
                            </p>
                            <div style={{ minHeight: '1.5rem' }}>
                                {genres.length > 0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                        {genres.map(g => <span key={g} style={{ fontSize: '0.85rem' }}>• {g}</span>)}
                                    </div>
                                ) : (
                                    <em style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>None selected</em>
                                )}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                Target Mood
                            </p>
                            <div style={{ fontWeight: '500' }}>
                                {mood ? MOOD_OPTIONS.find(m => m.value === mood)?.label : <em style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pending input...</em>}
                            </div>
                        </div>

                        <div className="info-badge badge-green" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                            ⚡ AI Ready
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreferencesForm;
