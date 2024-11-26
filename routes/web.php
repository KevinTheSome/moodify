<?php
use App\Http\Controllers\MusicController;
use App\Http\Controllers\SpotifyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HistoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard',['CLIENT_ID'=>env('CLIENT_ID'),'CLIENT_SECRET'=>env('CLIENT_SECRET')]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/NewReleases', function () {
        return Inertia::render('NewReleases');
    })->name('NewReleases');

    Route::post('/spotify/new-releases', [SpotifyController::class, 'getNewReleases']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/listening-history', [HistoryController::class, 'store']);
    Route::get('/listening-history', [HistoryController::class, 'index']); // Use index() here
});
// Route::post('/spotify/new-releases', [MusicController::class, 'newReleases']);
Route::post('/spotify/emotions', [SpotifyController::class, 'getEmotions']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    

    Route::post('/history', [HistoryController::class, 'store'])->name('history');;
    Route::get('/history', [HistoryController::class, 'index'])->name('history');;
    
    Route::get('/history', function () {
        return Inertia::render('HistoryPage');
    })->name('history');

    Route::post('/spotify/token', [SpotifyController::class, 'getToken']);

});

require __DIR__.'/auth.php';
