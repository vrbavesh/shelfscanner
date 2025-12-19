import React, { useState } from 'react';

const GENRE_OPTIONS = [
    "Sci-Fi", "Fantasy", "Mystery", "Imaginative",
    "History", "Productivity", "Finance", "Classic"
];

const MOOD_OPTIONS = [
    { value: "adventurous", label: "Adventurous" },
    { value: "relaxed", label: "Relaxed / Cozy" },
    { value: "learning", label: "Intellectual / Learning" },
    { value: "dark", label: "Dark / Mysterious" },
    { value: "emotional", label: "Emotional" }
];

function PreferencesForm({ onSubmit }) {
    const [genres, setGenres] = useState([]);
    const [mood, setMood] = useState("");
    const [authorInfo, setAuthorInfo] = useState("");

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
        onSubmit({ genres, mood, authorInfo });
    };

    return (
        <div className="card fade-in" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Reading Preferences</h3>

            <div style={{ display: 'grid', gap: '2rem' }}>

                {/* Genre Chips */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600' }}>
                        Broad Genres You Like
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {GENRE_OPTIONS.map(genre => (
                            <button
                                key={genre}
                                onClick={() => toggleGenre(genre)}
                                style={{
                                    padding: '0.5rem 1rem',
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
                <div>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600' }}>
                        Current Mood
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
                <div>
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
                    Find My Match
                </button>
            </div>
        </div>
    );
}

export default PreferencesForm;
