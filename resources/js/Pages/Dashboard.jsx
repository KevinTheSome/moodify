import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Webcam from "react-webcam";
// import PlayListCard from "@/Components/PlayListCard"; // Import the PlayListCard component

export default function Dashboard() {
    const [mood, setMood] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imigeBase64, setImigeBase64] = useState(null);

    const [filename, setFilename] = useState("");
    const [fileImige, setFileImige] = useState(null);

    function resetFile() {
        setFileImige(null);
        setFilename("");
        setMood("");
    }

    const handleFileChange = (e) => {
        setFilename(e.target.files[0].name);
        setFileImige(e.target.files[0]);
    };

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    useEffect(() => {
        if (!fileImige) return;
        const formData = new FormData();

        formData.append("file", fileImige);

        fetch("http://127.0.0.1:6969/predict", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setMood(data.result);
            });
    }, [fileImige]);

    useEffect(() => {
        if (!imigeBase64) return;
        const formData = new FormData();
        var imigeData = imigeBase64.replace(/^data:image\/\w+;base64,/, "");
        var byteCharacters = atob(imigeData); // Decode Base64 string
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var file = new Blob([new Uint8Array(byteNumbers)], {
            type: "image/jpeg",
        });

        formData.append("file", file);

        fetch("http://127.0.0.1:6969/predict", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setMood(data.result);
            });
    }, [imigeBase64]);

    //vai šis ir trolls?

    // useEffect(() => {
    //     // Apply overflow-hidden to body
    //     document.body.style.overflow = "hidden";

    //     return () => {
    //         document.body.style.overflow = "";
    //     };
    // }, []);

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
                        setImigeBase64(imageSrc);
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
            setPlaylists(data || []); // Assuming the playlists are returned here
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
                                <div className="flex items-center justify-center w-full p-4 bg-black border border-gray-800 rounded-lg shadow-md">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="file-input"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="file-input"
                                        className="cursor-pointer"
                                    >
                                        <span className="text-gray-600 font-medium">
                                            Select a file
                                        </span>
                                        <svg
                                            className="w-4 h-4 text-gray-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2m0-1V9a2 2 0 002-2h4m-6 0h4"
                                            />
                                        </svg>
                                    </label>
                                    <span className="text-gray-400 font-medium ml-2">
                                        {filename}
                                    </span>
                                    <button
                                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                                        onClick={resetFile}
                                    >
                                        Reset
                                    </button>
                                </div>
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
                                    <a href={playlist.external_urls.spotify}>
                                        <div
                                            key={playlist.id}
                                            className="bg-gray-800 p-4 rounded-lg shadow-lg"
                                        >
                                            <img
                                                src={playlist.images[0]?.url}
                                                alt={playlist.name}
                                                className="rounded-lg mb-4"
                                            />
                                            <h2 className="text-xl font-semibold text-white">
                                                {playlist.name}
                                            </h2>
                                        </div>
                                    </a>
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
