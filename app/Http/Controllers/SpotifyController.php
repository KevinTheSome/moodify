<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SpotifyController extends Controller
{
    //

    public function getToken()
    {
        $client_id = config('services.spotify.client_id');
        $client_secret = config('services.spotify.client_secret');

        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . base64_encode("$client_id:$client_secret"),
        ])->asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
        ]);

        return $response->json();
    }
}
