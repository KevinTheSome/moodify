import React, { useEffect, useState } from 'react';

export default function NewReleases() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        // Fetch data from Laravel API
        fetch('/api/new-releases')
            .then(response => response.json())
            .then(data => {
                setAlbums(data.albums.items);
            })
            .catch(error => console.error('Error fetching new releases:', error));
    }, []);

    return (
        <div className="bg-gray-900 text-white p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-pink-500">New Releases</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map(album => (
                    <div key={album.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <img
                            src={album.images[0]?.url}
                            alt={album.name}
                            className="rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold">{album.name}</h2>
                        <p className="text-sm text-gray-400">
                            {album.artists.map(artist => artist.name).join(', ')}
                        </p>
                        <button className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-full transition duration-300">
                            Listen
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
