<?php

namespace App\Http\Controllers;

use App\Services\SpotifyService;
use Illuminate\Support\Facades\Http;
class MusicController extends Controller
{
    protected $spotifyService;

    public function __construct(SpotifyService $spotifyService)
    {
        $this->spotifyService = $spotifyService;
    }
    public function getSpotifyToken() 
{
    $clientId = config('services.spotify.client_id');
    $clientSecret = config('services.spotify.client_secret');

    $response = Http::withHeaders([
        'Content-Type' => 'application/x-www-form-urlencoded',
    ])->asForm()->post('https://accounts.spotify.com/api/token', [
        'grant_type' => 'client_credentials',
        'client_id' => $clientId,
        'client_secret' => $clientSecret,
    ]);

    if ($response->successful()) {
        return response()->json($response->json());
    }

    return response()->json(['error' => 'Failed to fetch Spotify token'], 500);
}
    public function NewReleases()
    {
        $newReleases = $this->spotifyService->getNewReleases();
        
        return response()->json($newReleases);
    }

}
