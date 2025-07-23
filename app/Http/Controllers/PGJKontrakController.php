<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeResource;
use App\Http\Resources\PGJKontrakResource;
use App\Models\Client;
use App\Models\Employe;
use App\Models\Jabatan;
use App\Models\PGJ_Kontrak as Contract;
use App\Models\User;
use Dompdf\Dompdf;
use Dompdf\Options;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class PGJKontrakController extends Controller
{
     // Display a listing of the resource
     public function index(Request $request)
     {
         $searchTerm = $request->input('search');
         $client = Client::all();
         $contracts = Contract::search($searchTerm)->latest()->get();
         $contract = PGJKontrakResource::collection($contracts);
         return Inertia::render('PGJ_Kontrak/IndexKontrak', compact('contract', 'client', 'searchTerm'));
     }
 
     // Show the form for creating a new resource
     public function create()
     {
        $employes = Employe::with(['client:id,name', 'user.jabatan:id,name_jabatan'])->latest()->get(['id', 'name', 'no_ktp', 'no_kk', 'ttl', 'img', 'client_id', 'initials', 'date_real', 'numbers']);
        $employe = EmployeResource::collection($employes);
        $users = User::with(['Jabatan', 'Kerjasama', 'Client'])->get();
        $jabatan = Jabatan::all();
        $client = Client::all();
        $query = Contract::query();
        $contracts = (clone $query)->latest()->first();
        $allContracts = $query->get();
        return Inertia::render('PGJ_Kontrak/CreateKontrak', compact('contracts', 'client', 'users', 'jabatan', 'employe', 'allContracts'));
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
             'kinerja' => 'nullable',
             'lain_lain' => 'nullable'
         ]);
 
         Contract::create($validated);
         return redirect()->back();
    }
 
     // Display the specified resource
     public function show(Contract $contract)
     {
        $kontrak = $contract;
        static $dompdfOptions = null;
        if (!$dompdfOptions) {
            $dompdfOptions = new Options();
            $dompdfOptions->set('isHtml5ParserEnabled', true);
            $dompdfOptions->set('isRemoteEnabled', false); // disable if not needed
            $dompdfOptions->set('defaultFont', 'Times New Roman');
            $dompdfOptions->set('isPhpEnabled', false); // security & speed
            $dompdfOptions->set('chroot', public_path()); // restrict file access
        }

        $pdf = new Dompdf($dompdfOptions);

        // ✅ Avoid unnecessary rendering logic
        $html = View::make('pdf.kontrak', compact('kontrak'))->render();
        $pdf->loadHtml($html);

        $pdf->setPaper('Letter', 'portrait');

        // ✅ Optimize rendering
        $pdf->render();

        // ✅ Reduce memory usage on large PDFs
        $output = $pdf->output(['compress' => 1]);

        $filename = strtoupper('Kontrak ' . $kontrak->nama_pk_kda . ' Dibuat Pada ' .
            Carbon::createFromFormat('Y-m-d', $kontrak->tgl_dibuat)->translatedFormat('j F Y')) . '.pdf';

        return Response::make($output, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="'.$filename.'"',
            'Content-Length' => strlen($output),
            'Cache-Control' => 'private, max-age=0, must-revalidate',
            'Pragma' => 'public',
        ]);
        // dd($pdf);
        // return $pdf->stream('kontrak_'.$kontrak->id.'.pdf');
     }
 
     // Show the form for editing the specified resource
     public function edit(Contract $contract)
     {
        $employes = Employe::with(['client:id,name', 'user.jabatan:id,name_jabatan'])->latest()->get(['id', 'name', 'no_ktp', 'no_kk', 'ttl', 'img', 'client_id', 'initials', 'date_real', 'numbers']);
        $employe = EmployeResource::collection($employes);
        $users = User::with(['Jabatan', 'Kerjasama', 'Client'])->get();
        $jabatan = Jabatan::all();
        $client = Client::all();
        return Inertia::render('PGJ_Kontrak/EditKontrak', compact('contract', 'client', 'users', 'jabatan', 'employe'));
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
             'kinerja' => 'nullable',
             'lain_lain' => 'nullable'
         ]);
 
         $contract->update($validated);
     }
 
     // Remove the specified resource from storage
     public function destroy(Contract $contract)
     {
         $contract->delete();
         return redirect()->route('contracts.index')->with('success', 'Contract deleted successfully.');
     }

     public function sendToOperator(Request $request)
     {
        $contract = Contract::find($request->id);

        if (!$contract) {
            return redirect()->back()->with('error', 'Kontrak tidak ditemukan');
        }

        if (!$contract->send_to_operator && !$contract->ttd) {
            $contract->update([
                'send_to_operator' => 1,
            ]);
            return redirect()->back()->with('success', 'Kontrak berhasil dikirim ke operator');
        } else {
            return redirect()->back()->with('error', 'Kontrak sudah dikirim ke operator');
        }

     }
}
