<?php

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
Route::get('/NewReleases', function () {
    return Inertia::render('NewReleases',['CLIENT_ID'=>env('CLIENT_ID'),'CLIENT_SECRET'=>env('CLIENT_SECRET')]);
})->middleware(['auth', 'verified'])->name('NewReleases');


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
