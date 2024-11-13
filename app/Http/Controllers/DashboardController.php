<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{
    public function dashboard() {
        return Inertia::render('Dashboard');
    }
}