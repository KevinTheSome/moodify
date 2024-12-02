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
            'limit' => 5,
            'offset' => rand(0, 50),
        ]);

        // return $response->json()['playlists']['items'];

        $finalArray = [];
        $response->json()['playlists']['items'];

        foreach ($response->json()['playlists']['items'] as $playlist) {
            if($playlist != null){
                array_push($finalArray, $playlist);
            }
        }

        return $finalArray;
    }
    public function getNewReleases()
    {
        $accessToken = $this->getToken();

        $response = Http::withToken($accessToken)->get('https://api.spotify.com/v1/browse/new-releases', [
            'country' => 'LV',
            'limit' => 10,
        ]);

        return $response->json();
    }
}
