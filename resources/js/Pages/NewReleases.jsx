import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function NewReleases() {
    const { props } = usePage();
    const { CLIENT_ID, CLIENT_SECRET } = props; // Access passed data from Laravel
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewReleases = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch("/spotify/new-releases", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch new releases");
                }

                const data = await response.json();
                setAlbums(data.albums?.items || []);
            } catch (err) {
                console.error("Error fetching new releases:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNewReleases();
    }, [CLIENT_ID, CLIENT_SECRET]);

    return (
        <AuthenticatedLayout
            header={
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold leading-tight text-white pt-8 pl-6">
                        New Releases
                    </h2>
                </div>
            }
        >
            <Head title="New Releases" />

            <div
                className="relative py-12 bg-cover bg-center min-h-screen"
                style={{ backgroundImage: 'url(/images/hoe11.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
                    <div className="bg-[#191414] bg-opacity-45 p-12 rounded-lg shadow-lg text-center">
                        <h3 className="text-4xl font-semibold text-white">
                            Explore New Album Releases!
                        </h3>

                        {/* Loading State */}
                        {loading && <p className="text-white mt-4">Loading albums...</p>}

                        {/* Error State */}
                        {error && <p className="text-red-500 mt-4">{error}</p>}

                        {/* Display Albums */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {albums.length > 0 ? (
                                albums.map((album) => (
                                    <div
                                        key={album.id}
                                        className="bg-gray-800 p-4 rounded-lg shadow-lg"
                                    >
                                        <img
                                            src={album.images[0]?.url}
                                            alt={album.name}
                                            className="rounded-lg mb-4"
                                        />
                                        <h2 className="text-xl font-semibold text-white">
                                            {album.name}
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            {album.artists
                                                .map((artist) => artist.name)
                                                .join(", ")}
                                        </p>
                                        <button className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-full transition duration-300">
                                            Listen
                                        </button>
                                    </div>
                                ))
                            ) : !loading && !error ? (
                                <p className="text-white">No new releases found.</p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
