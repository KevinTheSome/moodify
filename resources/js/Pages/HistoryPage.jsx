import React, { useEffect, useState } from 'react';

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the listening history from the API
        fetch('/api/listening-history')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch history');
                return response.json();
            })
            .then(data => {
                setHistory(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-black min-h-screen p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Listening History</h1>

            {/* Loading and error states */}
            {loading ? (
                <p className="text-gray-400" aria-live="polite">Loading listening history...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <ul className="space-y-4">
                    {history.length > 0 ? (
                        history.map(entry => (
                            <li key={entry.id} className="p-4 bg-gray-800 rounded-lg transition hover:bg-gray-700">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-semibold">{entry.music.title}</h2>
                                        <p className="text-gray-400">
                                            {new Date(entry.listened_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-400">No recent listening history available.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default HistoryPage;
