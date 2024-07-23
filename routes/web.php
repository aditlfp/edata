<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SlipGajiController;
use App\Models\Employe;
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

Route::get('/', [AuthenticatedSessionController::class, 'create']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth','role_check', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/export-employe/{data}', function(Employe $employe) {
        return Inertia::render('EmployePages/PrintEmploye', $employe);
    })->name('employe.export');
    Route::resource('/employes', EmployeController::class);
    Route::resource('/careers', CareerController::class)->only(['index', 'show', 'edit', 'update', 'destroy']);
    Route::get('/create-career/{id}', [CareerController::class, 'createCareer'])->name('create.career');
    Route::post('/store-career', [CareerController::class, 'storeCareer'])->name('store.career');
    Route::get('/admin-dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::resource('/slip-gaji', SlipGajiController::class);
    Route::get('/slip-gaji/create/{id}', [SlipGajiController::class, 'createSlip'])->name('createSlip');
    Route::get('/slip-gaji/ubah/{id}', [SlipGajiController::class, 'editSlip'])->name('editSlip');
    Route::get('/employe/download', [EmployeController::class, 'download'])->name('download.employe');
    Route::post('/slipgaji/import', [SlipGajiController::class, 'import'])->name('importe.slipe');
    Route::get('/slipgaji/download-template', [SlipGajiController::class, 'downloadTemplate'])->name('download.template');
});


require __DIR__.'/auth.php';
