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
    const api = usePage().props.api;
    console.log(api)

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
