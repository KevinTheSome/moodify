import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import qs from "qs";

export default function Dashboard() {
    const [playLists, setPlayLists] = useState([]);
    const [user, setUser] = useState([]);
    const [sapi, setSapi] = useState();
    const [emotions, setEmotions] = useState("");
    const Client_id = usePage().props.CLIENT_ID;
    const Client_secret = usePage().props.CLIENT_SECRET;

    const fetchAccessToken = async () => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: Client_id,
                password: Client_secret,
            },
        };

        const data = {
            grant_type: "client_credentials",
        };

        try {
            const response = await axios.post(
                "https://accounts.spotify.com/api/token",
                qs.stringify(data),
                headers
            );
            setSapi(response.data.access_token); //where we get the token
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAccessToken();
    }, []);

    function getEmotions() {
        try {
            fetch(
                "https://api.spotify.com/v1/search?q=" +
                    emotions +
                    "&type=playlist&market=LV&limit=3&offset=0",
                {
                    headers: {
                        Authorization: "Bearer " + sapi,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => console.log(data));
            // .then(() => console.log(playLists));
        } catch (error) {
            console.log(error);
        }
    }

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
                            <div>!</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
