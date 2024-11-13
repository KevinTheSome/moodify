<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MusicController extends Controller
{
    public function fetchAccessToken()
    {
        $clientId = env('SPOTIFY_CLIENT_ID'); //todo change 
        $clientSecret = env('SPOTIFY_CLIENT_SECRET');

        $response = Http::asForm()->withHeaders([
            'Authorization' => 'Basic ' . base64_encode("$clientId:$clientSecret"),
            'Accept' => 'application/json',
        ])->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
        ]);

        $data = $response->json();
        return $data['access_token'] ?? null;
    }

    public function getEmotions($emotion)
    {
        $accessToken = $this->fetchAccessToken();

        if (!$accessToken) {
            return response()->json(['error' => 'Failed to fetch access token'], 500);
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $accessToken,
            'Accept' => 'application/json',
        ])->get('https://api.spotify.com/v1/search', [
            'q' => $emotion,
            'type' => 'playlist',
            'market' => 'LV',
            'limit' => 3,
            'offset' => 0,
        ]);

        return $response->json();
    }
}
