<?php

namespace App\Http\Controllers;

use App\Exports\DataSlipGajiExport;
use App\Models\SlipGaji;
use App\Http\Controllers\Controller;
use App\Http\Requests\SlipGajiRequest;
use App\Models\Absensi;
use App\Models\Client;
use App\Models\Divisi;
use App\Models\Employe;
use App\Models\Kerjasama;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Imports\SlipGajiImport;
use App\Exports\SlipGajiExport;
use Dompdf\Dompdf;
use Dompdf\Options;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;

class SlipGajiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $employe = Employe::all();
        $currentMonth = date('Y-m');
        $employe = Employe::with(['user', 'user.divisi', 'SlipGaji'])->get();
        // dd($employe[0]->user);
        $mitra = Kerjasama::on('mysql2connection')->with('client')->get();
        $divisi = Divisi::on('mysql2connection')->get();
        return Inertia::render('SlipGajiPages/IndexSlip', compact('currentMonth', 'employe', 'mitra', 'divisi'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $mitra = $request->mitra;
        $bulan = $request->bulan;
        $bulanFormat = Carbon::createFromFormat('Y-m', $request->bulan);
        $client = Kerjasama::on('mysql2connection')->with('client')->where('id', $mitra)->first();
        $employe = Employe::query();
        $divisi = Divisi::on('mysql2connection')->get();
        $user = User::all();
        $slip = SlipGaji::where('bulan_tahun', $bulan)->get();

        $users = $employe->with(['user', 'user.divisi'])->where('client_id', $client->id)
                    ->whereIn('name', $user->pluck('nama_lengkap')->toArray())
                    ->orderBy("numbers", 'asc')
                    ->orderBy("date_real", 'asc')
                    ->whereNotIn('name', $slip->pluck('karyawan')->toArray())
                    ->get();
                //         $userd = User::on('mysql2connection')
                // ->with('divisi')
                // ->where('kerjasama_id', $client->id)
                // ->orderBy('kerjasama_id', 'asc')
                // ->whereIn('nama_lengkap', $employe->pluck('name')->toArray())
                // ->whereNotIn('id', $slip->pluck('user_id')->toArray())
                // ->get();
        // dd($userd[0]);

        $absensi = Absensi::on('mysql2connection')->where('kerjasama_id', $mitra)->whereYear('tanggal_absen', $bulanFormat->year)->whereMonth('tanggal_absen', $bulanFormat->month)->get();
        
        return Inertia::render('SlipGajiPages/CreateSlip', compact('users', 'bulan', 'divisi', 'absensi', 'mitra', 'client', 'slip'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        foreach ($request->users as $userData) {
            // Process each user's data and save it accordingly
            // dd($userData);
            if ($userData['gaji_pokok'] != null) {
                SlipGaji::create([
                    'user_id' => $userData['user_id'],
                    'bulan_tahun' => $userData['bulan_tahun'],
                    'karyawan' => $userData['nama_lengkap'],
                    'formasi' => $userData['formasi'],
                    'status' => 'true',
                    'gaji_pokok' => $userData['gaji_pokok'],
                    'gaji_lembur' => $userData['gaji_lembur'],
                    'tj_jabatan' => $userData['tj_jabatan'],
                    'tj_kehadiran' => $userData['tj_kehadiran'],
                    'tj_kinerja' => $userData['tj_kinerja'],
                    'tj_lain' => $userData['tj_lain'],
                    'bpjs' => $userData['bpjs'],
                    'pinjaman' => $userData['pinjaman'],
                    'absen' => $userData['absen'],
                    'mk' => $userData['mk'],
                    'lain_lain' => $userData['lain_lain'],
                ]);
            }
        }

        // dd($request->all(), $slip);
        return redirect()->route('slip-gaji.index')->with('success', 'Data saved successfully!');
    }

    
    public function editSlip(Request $request, $id)
    {
        // dd("oke", $id);
        $mitra = $request->mitra;
        $bulan = $request->bulan;

        // dd($bulan);
        $bulanFormat = Carbon::createFromFormat('Y-m', $bulan);
        $client = Kerjasama::on('mysql2connection')->with('client')->where('id', $id)->first();
        $employe = Employe::all();
        $divisi = Divisi::on('mysql2connection')->get();
        $user = User::on('mysql2connection')->with(['divisi', 'kerjasama', 'slipGaji'])->where('kerjasama_id', $client->id)->orderBy('kerjasama_id', 'asc')->wherein('nama_lengkap', $employe->pluck('name'))->get();
        // dd($user[4]->slipGaji);

        $absensi = Absensi::on('mysql2connection')->where('kerjasama_id', $mitra)->whereYear('tanggal_absen', $bulanFormat->year)->whereMonth('tanggal_absen', $bulanFormat->month)->get();
        $slip = SlipGaji::with(['user'])->where('bulan_tahun', $bulan)->wherein('karyawan', $user->pluck('nama_lengkap'))->get();
        // dd($slip);
        
        return Inertia::render('SlipGajiPages/EditSlip', compact('employe', 'user', 'bulan', 'divisi', 'absensi', 'mitra', 'client', 'slip'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        foreach ($request->users as $userData) {
            // Process each user's data and save it accordingly
            if ($userData['gaji_pokok'] != null) {
                $slip = [
                    'user_id' => $userData['user_id'],
                    'bulan_tahun' => $userData['bulan_tahun'],
                    'karyawan' => $userData['nama_lengkap'],
                    'formasi' => $userData['formasi'],
                    'status' => 'true',
                    'gaji_pokok' => $userData['gaji_pokok'],
                    'gaji_lembur' => $userData['gaji_lembur'],
                    'tj_jabatan' => $userData['tj_jabatan'],
                    'tj_kehadiran' => $userData['tj_kehadiran'],
                    'tj_kinerja' => $userData['tj_kinerja'],
                    'tj_lain' => $userData['tj_lain'],
                    'bpjs' => $userData['bpjs'],
                    'pinjaman' => $userData['pinjaman'],
                    'absen' => $userData['absen'],
                    'mk' => $userData['mk'],
                    'lain_lain' => $userData['lain_lain'],
                ];
                SlipGaji::findOrFail($userData['id'])->update($slip);
            }
        }
        return redirect()->back();
    }

    public function import(Request $request)
    {

        $request->validate([
            'file' => 'required|mimes:xls,xlsx,csv',
        ]);

        // dd($request->file('file'));
        $file = $request->file('file');

    
        if($request->hasFile('file'))
        {
            Excel::import(new SlipGajiImport, $file);
            
        }else{
            dd("ERROR");
        }

        return redirect()->back()->with('messege', 'Successfully To Import Slip Gaji From Excell !');

    }

    public function downloadTemplate(Request $request)
    {
        $mitra = $request->mitra;
        $bulan = $request->bulan;
        $bulanFormat = Carbon::createFromFormat('Y-m', $bulan);
        $slip = SlipGaji::where('bulan_tahun', $bulan)->get();
        $client = Kerjasama::on('mysql2connection')->with('client')->where('id', $mitra)->first();
        // $employe = Employe::pluck('name');
        $user = User::all();
        // dd($request->all());
        return Excel::download(
            (new SlipGajiExport)
                ->forWithUser('user')
                ->forDevUser('user.divisi')
                ->forKerjasama($client->id)
                ->forWhereIn($user->pluck('nama_lengkap')->toArray())
                ->forOrder('asc')
                ->forWhereNotIn($slip->pluck('karyawan')->toArray())
                ->withAdditionalParams($bulan),
            'slip.xlsx'
        );
       
    }

    public function destroy($id)
    {
        SlipGaji::findOrFail($id)->delete();
        return redirect()->back()->with(['messege' => 'Berhasil Hapus Data !']);
    }

    public function data_download(Request $request)
    {
        $mitra = $request->mitra;
        $bulan = $request->bulan;
        // dd($bulan);
        if ($mitra && $bulan) {
            $getAll = [];
            $slip = SlipGaji::with(['user', 'user.divisi', 'employe'])
                    ->join('employes', 'slip_gajis.karyawan', '=', 'employes.name') // Adjust 'user_id' and 'id' as needed
                     ->select('slip_gajis.*')
                    ->get();
            foreach ($slip as $value) {
                if (($value->user?->kerjasama_id == $mitra) && ($value->bulan_tahun == $bulan)) {
                    $getAll[] = $value;
                }
            }

            $isAll = wrapArray($getAll);
            // dd($isAll->all());
            // dd($isAll);
            return Excel::download(
                (new DataSlipGajiExport)
                    ->forData($isAll)
                    ->forOrder('asc'),
                'slip2.xlsx'
            );
        }        
    }

    public function slipUserDownload(Request $request)
    {
        $path = 'logo/desain_slip.png';
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

        $id = $request->id;
        
        $slip = SlipGaji::with('employe', 'employe.client')->find($id);
        $formatedMonth = Carbon::createFromFormat('Y-m', $slip->bulan_tahun)->isoFormat('M Y');
        return Inertia::render('SlipGajiPages/ExportSlip', compact('slip', 'base64'));
    }

}
