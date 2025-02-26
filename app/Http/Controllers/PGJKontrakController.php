<?php

namespace App\Http\Controllers;

use App\Http\Resources\PGJKontrakResource;
use App\Models\PGJ_Kontrak as Contract;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PGJKontrakController extends Controller
{
     // Display a listing of the resource
     public function index(Request $request)
     {
        $searchTerm = $request->input('search');
         $contracts = Contract::search($searchTerm)->latest()->get();
         $contract = PGJKontrakResource::collection($contracts);
         return Inertia::render('PGJ_Kontrak/IndexKontrak', compact('contract'));
     }
 
     // Show the form for creating a new resource
     public function create()
     {
        $contracts = Contract::latest()->first();
         return Inertia::render('PGJ_Kontrak/CreateKontrak', compact('contracts'));
     }
 
     // Store a newly created resource in storage
     public function store(Request $request)
     {
         $validated = $request->validate([
             'no_srt' => 'required|string|max:255',
             'tgl_dibuat' => 'required|date',
             'nama_pk_ptm' => 'required|string|max:255',
             'alamat_pk_ptm' => 'required|string',
             'jabatan_pk_ptm' => 'required|string|max:255',
             'nama_pk_kda' => 'required|string|max:255',
             'tempat_lahir_pk_kda' => 'required|string|max:255',
             'tgl_lahir_pk_kda' => 'required|date',
             'nik_pk_kda' => 'required|string|max:255',
             'alamat_pk_kda' => 'required|string',
             'jabatan_pk_kda' => 'required|string|max:255',
             'status_pk_kda' => 'required|string|max:255',
             'unit_pk_kda' => 'required|string|max:255',
             'tgl_mulai_kontrak' => 'required|date',
             'tgl_selesai_kontrak' => 'required|date',
             'g_pok' => 'nullable',
             'tj_hadir' => 'nullable',
             'kinerja' => 'nullable'
         ]);
 
         Contract::create($validated);
         return redirect()->back();
    }
 
     // Display the specified resource
     public function show(Contract $contract)
     {
        
        $day = Carbon::parse($contract->tgl_dibuat, 'Asia/Jakarta')->translatedFormat('l') . " tanggal " . Carbon::parse($contract->tgl_dibuat, 'Asia/Jakarta')->translatedFormat('d') . " Bulan " . Carbon::parse($contract->tgl_dibuat, 'Asia/Jakarta')->translatedFormat('F') . " Tahun " . Carbon::parse($contract->tgl_dibuat, 'Asia/Jakarta')->translatedFormat('Y');
        // Sabtu tanggal 1 Bulan Juni Tahun 2024
        // tanggal 1 Juni 2024 dan berakhir tanggal 31 Mei 2025
        $day_contract = "tanggal " . Carbon::parse($contract->tgl_dibuat, 'Asia/Jakarta')->translatedFormat('d F Y') . " dan berakhir tanggal " . Carbon::parse($contract->tgl_selesai_kontrak, 'Asia/Jakarta')->translatedFormat('d F Y');
        // dd($day_contract);
        return Inertia::render('PGJ_Kontrak/ShowKontrak', compact('contract', 'day', 'day_contract'));
     }
 
     // Show the form for editing the specified resource
     public function edit(Contract $contract)
     {
         return Inertia::render('PGJ_Kontrak/EditKontrak', compact('contract'));
     }
 
     // Update the specified resource in storage
     public function update(Request $request, Contract $contract)
     {
         $validated = $request->validate([
             'no_srt' => 'required|string|max:255',
             'nama_pk_ptm' => 'required|string|max:255',
             'alamat_pk_ptm' => 'required|string',
             'jabatan_pk_ptm' => 'required|string|max:255',
             'nama_pk_kda' => 'required|string|max:255',
             'tempat_lahir_pk_kda' => 'required|string|max:255',
             'tgl_lahir_pk_kda' => 'required|date',
             'nik_pk_kda' => 'required|string|max:255',
             'alamat_pk_kda' => 'required|string',
             'jabatan_pk_kda' => 'required|string|max:255',
             'status_pk_kda' => 'required|string|max:255',
             'unit_pk_kda' => 'required|string|max:255',
             'tgl_mulai_kontrak' => 'required|date',
             'tgl_selesai_kontrak' => 'required|date',
             'g_pok' => 'nullable',
             'tj_hadir' => 'nullable',
             'kinerja' => 'nullable'
         ]);
 
         $contract->update($validated);
     }
 
     // Remove the specified resource from storage
     public function destroy(Contract $contract)
     {
         $contract->delete();
         return redirect()->route('contracts.index')->with('success', 'Contract deleted successfully.');
     }
}
