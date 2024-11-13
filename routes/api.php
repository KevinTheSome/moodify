<?php
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\MusicController;
use Illuminate\Support\Facades\Route;

// Define the route to get new releases

Route::get('/spotify-token', [MusicController::class, 'getSpotifyToken']);
Route::get('/new-releases', [MusicController::class, 'showNewReleases']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/listening-history', [HistoryController::class, 'store']);
    Route::get('/listening-history', [HistoryController::class, 'index']); // Use index() here
});