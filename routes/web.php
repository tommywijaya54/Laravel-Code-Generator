<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\RegistrationController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('user', UserController::class, [
        'only' => ['index', 'edit']
    ]);

    Route::resource('user_test', User_testController::class, [
        'only' => ['index', 'create', 'store', 'edit', 'update', 'delete']
    ]);

    Route::resource('schedule', ScheduleController::class, [
        'only' => ['index', 'create', 'store', 'edit', 'update', 'delete']
    ]);

    Route::resource('student', StudentController::class, [
        'only' => ['index', 'create', 'store', 'edit', 'update', 'delete']
    ]);

    Route::resource('branch', BranchController::class, [
        'only' => ['index', 'create', 'store', 'edit', 'update', 'delete']
    ]);

    Route::resource('registration', RegistrationController::class, [
        'only' => ['index', 'create', 'store', 'edit', 'update', 'delete']
    ]);
});

require __DIR__ . '/auth.php';
