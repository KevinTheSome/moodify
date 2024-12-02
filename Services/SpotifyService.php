<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SpotifyService
{
    protected $clientId;
    protected $clientSecret;

    public function __construct()
    {
        $this->clientId = env('SPOTIFY_CLIENT_ID');
        $this->clientSecret = env('SPOTIFY_CLIENT_SECRET');
    }

    public function getAccessToken()
{
    // Check if there's a cached token
    $token = cache('spotify_access_token');
    if (!$token) {
        $response = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
        ]);

        $token = $response->json()['access_token'];

        // Cache the token for 1 hour
        cache(['spotify_access_token' => $token], now()->addHour());
    }

    return $token;
}

}
