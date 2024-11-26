import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Webcam from "react-webcam";
// import PlayListCard from "@/Components/PlayListCard"; // Import the PlayListCard component

export default function Dashboard() {
    const [mood, setMood] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imigeBlob, setImageBlob] = useState(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    useEffect(() => {
        const formData = new FormData();
        formData.append("file", imigeBlob);
        fetch("http://127.0.0.1:6969/predict", {
            method: "POST",
            body: formData,
        }).then((response) => response.json());
    }, [imigeBlob]);

    useEffect(() => {
        // Apply overflow-hidden to body
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const WebcamCapture = () => (
        <Webcam
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
        >
            {({ getScreenshot }) => (
                <button
                    onClick={() => {
                        const imageSrc = getScreenshot();
                        setImageBlob(imageSrc);
                    }}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Capture photo
                </button>
            )}
        </Webcam>
    );

    const handleMoodChange = (e) => {
        setMood(e.target.value);
    };

    const fetchPlaylists = async () => {
        if (!mood) return;
        setLoading(true);
        try {
            const response = await fetch(`/spotify/emotions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ emotion: mood }),
            });
            const data = await response.json();
            setPlaylists(data.playlists || []); // Assuming the playlists are returned here
            console.log(data);
        } catch (error) {
            console.error("Error fetching playlists:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold leading-tight text-white pt-8 pl-6">
                        Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div
                className="relative py-12 bg-cover bg-center min-h-screen"
                style={{
                    backgroundImage: "url(/images/hoe11.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
                    <div className="bg-[#191414] bg-opacity-45 p-12 rounded-lg shadow-lg text-center">
                        <h3 className="text-4xl font-semibold text-white">
                            Welcome to Your Mood Generated Playlist maker!
                        </h3>

                        <div className="mt-8">
                            <div>
                                <WebcamCapture />
                                <input type="file" name="" id="" />
                            </div>
                            <input
                                type="text"
                                value={mood}
                                onChange={handleMoodChange}
                                placeholder="Enter your mood"
                                className="px-4 py-2 bg-white text-black rounded-md"
                            />
                            <button
                                onClick={fetchPlaylists}
                                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Get Playlists
                            </button>
                        </div>

                        {/* Display loading state */}
                        {loading && (
                            <p className="text-white mt-4">
                                Loading playlists...
                            </p>
                        )}

                        {/* Display playlist cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {playlists.length > 0 ? (
                                playlists.map((playlist) => (
                                    // <PlayListCard
                                    //     key={playlist.id}
                                    //     name={playlist.name}
                                    //     images={playlist.images[0]}
                                    //     external_links={playlist.external_urls}
                                    // />
                                    <p>ello o/</p>
                                ))
                            ) : (
                                <p className="text-white">
                                    No playlists found for this mood.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
