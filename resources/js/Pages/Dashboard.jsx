import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import SpotifyWebApi from "spotify-web-api-node";

export default function Dashboard() {
    const Client_ID = usePage().props.Client_ID;
    const Client_Secret = usePage().props.Client_Secret;
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    console.log(Client_ID, Client_Secret);

    const spotifyApi = new SpotifyWebApi({
        clientId: Client_ID,
        clientSecret: Client_Secret,
    });

    useEffect(() => {
        if (searchQuery) {
            handleSearch();
        }
    }, [searchQuery]);
    const handleSearch = async () => {
        try {
            const results = await spotifyApi.searchTracks(searchQuery);
            setSearchResults(results.body.tracks.items);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                            <div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search for tracks"
                                />
                                <button onClick={handleSearch}>Search</button>
                                <ul>
                                    {searchResults.map((track) => (
                                        <li key={track.id}>
                                            {track.name} by{" "}
                                            {track.artists[0].name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
