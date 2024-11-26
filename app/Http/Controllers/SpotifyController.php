<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SpotifyController extends Controller
{

    public function getToken()
    {
        $client_id = env('SPOTIFY_CLIENT_ID');
        $client_secret = env('SPOTIFY_CLIENT_SECRET');

        $response = Http::withHeaders([
            'Accept' => "application/json",
        ])->withBasicAuth($client_id,$client_secret)->asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
        ]);

        return $response->json()['access_token'];
    }

    public function getEmotions(Request $request)
    {
        $request->validate([
            'emotion' => 'required|string',
        ]);
        $emotion = $request->input('emotion');
        $accessToken = $this->getToken();
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
    
        $playlists = $response->json()['playlists']['items'];
    
        // Format the data to be used in the frontend
        $formattedPlaylists = array_map(function ($playlist) {
            return [
                'id' => $playlist['id'],
                'name' => $playlist['name'],
                'images' => $playlist['images'][0] ?? null,
                'external_urls' => $playlist['external_urls']['spotify'],
            ];
        }, $playlists);
    
        return response()->json(['playlists' => $formattedPlaylists]);
    }

}
