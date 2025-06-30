<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Dompdf\Dompdf;
use App\Http\Requests\EmployeRequest;
use App\Http\Resources\EmployeResource;
use App\Models\Career;
use App\Models\Client;
use App\Models\Divisi;
use App\Models\Employe;
use App\Models\Jabatan;
use App\Models\Kerjasama;
use App\Models\User;
use Dompdf\Options;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Crypt;

class EmployeController extends Controller
{
    public function index()
    {

        $employes = Employe::with(['client:id,name', 'user.jabatan:id,name_jabatan'])->latest()->get(['id', 'name', 'no_ktp', 'no_kk', 'ttl', 'img', 'client_id', 'initials', 'date_real', 'numbers']);
        $clients = Client::select('id', 'name')->get();
        $users = User::with('jabatan:id,name_jabatan')->get(['id', 'nama_lengkap', 'jabatan_id']);
        $jabatan = Jabatan::all();

        $employe = EmployeResource::collection($employes);

        // $users = User::with('jabatan')->whereIn('nama_lengkap', $employes->pluck('name'))->get();
        // Decrypt necessary fields for each employee if they are encrypted

        // dd($decryptedEmployes[0]);
        return Inertia::render('EmployePages/IndexEmploye', compact('employe', 'clients', 'users', 'jabatan'));
    }

    public function create()
    {
        // Fetch all employees
            $employe = Employe::all();

            // Get users whose 'nama_lengkap' is not in the list of employee names
            $users = User::whereNotIn('nama_lengkap', $employe->pluck('name'))->get();

            // Filter employees where 'numbers' is not null
            $emploGetNIK = $employe->filter(function ($emp) {
                return !is_null($emp->numbers);
            })->values();
            // dd($emploGetNIK);

        $clients = Client::all();
        return Inertia::render('EmployePages/CreateEmploye', compact('users', 'clients', 'emploGetNIK'));
    }

    public function store(EmployeRequest $request)
    {
        $employes = new Employe();

        // dd($request->all());
       $encrypt = !$request->from_temp;

        $employe = [
            'user_id' => $request->user_id,
            'name' => $request->name,
            'ttl' => $request->ttl,
            'nik' => $request->nik,
            'initials' => $request->initials,
            'numbers' => $request->numbers,
            'date_real' => $request->date_year,
            'no_kk' => $encrypt ? Crypt::encryptString($request->no_kk) : $request->no_kk,
            'no_ktp' => $encrypt ? Crypt::encryptString($request->no_ktp) : $request->no_ktp,
            'client_id' => $request->client_id,
            'jenis_bpjs' => $request->jenis_bpjs,
            'no_bpjs_kesehatan' => $request->no_bpjs_kesehatan,
            'no_bpjs_ketenaga' => $request->no_bpjs_ketenaga,
            'img' => $request->img,
            'img_ktp_dpn' => $request->img_ktp_dpn,
            'file_bpjs_kesehatan' => $request->file_bpjs_kesehatan,
            'file_bpjs_ketenaga' => $request->file_bpjs_ketenaga,
        ];

        if($employe)
        {
            if($request->hasFile('img'))
            {
                $employe['img'] = UploadImage($request, 'img');
            }

            if($request->hasFile('img_ktp_dpn'))
            {
                $employe['img_ktp_dpn'] = UploadImage($request, 'img_ktp_dpn');
            }

            if($request->hasFile('file_bpjs_kesehatan'))
            {
                $employe['file_bpjs_kesehatan'] = UploadBPJS($request, 'file_bpjs_kesehatan');
            }

            if($request->hasFile('file_bpjs_ketenaga'))
            {
                $employe['file_bpjs_ketenaga'] = UploadBPJS($request, 'file_bpjs_ketenaga');
            }
            try {
                $employes->create($employe);
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error($e);
                return $e;
            }
        }

        return redirect()->back();

    }
    public function edit($id)
    {
        $employe = Employe::with('user')->findOrFail($id);
        $no_kk = decryptField($employe->no_kk);
        $no_ktp = decryptField($employe->no_ktp);
        $emploGetNIK = Employe::all()->filter(function ($emp) {
            return !is_null($emp->numbers);
        })->values();
        // dd($emploGetNIK);
        $clients = Client::all();
        return Inertia::render('EmployePages/EditEmploye', compact('employe', 'clients', 'no_kk', 'no_ktp', 'emploGetNIK'));

    }

    public function emploAPI($client_id)
    {
        
      if(Auth::user()->role_id == 2){
        $emploGetNIK = Employe::where('client_id', $client_id)
                      ->whereNotNull('numbers')
                      ->orderByRaw('CAST(numbers AS UNSIGNED) DESC')  // Order by numbers as integers
                      ->first(); // Get the employee with the highest number
        return response()->json($emploGetNIK, 200);
      }else{
        return abort(404);
      }
    }

    public function apiEdit($client_id)
    {
            try {
                // Fetch the employee data based on client_id where numbers is not null
                if(Auth::user()->role_id == 2) {
                    $emploGetNIK = Employe::where('client_id', $client_id)
                                    ->whereNotNull('numbers')
                                    ->get(); // Get all matching employees
            
                    // If the query succeeds, return the data as JSON response with status 200
                    return response()->json($emploGetNIK, 200);
                }else{
                    return abort(404);
                }
        
            } catch (\Exception $e) {
                // Catch any exception that occurs during the query process
                return response()->json([
                    'error' => 'Failed to retrieve employee data',
                    'message' => $e->getMessage()
                ], 500); // Return an error response with status 500
            }
    }

    public function update(Request $request, $id)
    {
        $employes = Employe::findOrFail($id);
        $employe = [
            'user_id' => $request->user_id,
            'name' => $request->name,
            'ttl' => $request->ttl,
            'nik' => $request->nik,
            'initials' => $request->initials,
            'numbers' => $request->numbers,
            'date_real' => $request->date_year,
            'no_kk' => Crypt::encryptString($request->no_kk),
            'no_ktp' => Crypt::encryptString($request->no_ktp),
            'client_id' => $request->client_id,
            'img' => $request->img,
            'img_ktp_dpn' => $request->img_ktp_dpn,
            'jenis_bpjs' => $request->jenis_bpjs,
            'no_bpjs_kesehatan' => $request->no_bpjs_kesehatan,
            'file_bpjs_kesehatan' => $request->file_bpjs_kesehatan,
            'no_bpjs_ketenaga' => $request->no_bpjs_ketenaga,
            'file_bpjs_ketenaga' => $request->file_bpjs_ketenaga,
        ];
        if($employe)
        {

            if($request->hasFile('img'))
            {
                if($request->oldimage)
                {
                    Storage::disk('public')->delete('images/' . $request->oldimage);
                }
                $employe['img'] = UploadImage($request, 'img');
            }else{
                $employe['img'] = $request->oldimage;
            }

            if($request->hasFile('img_ktp_dpn'))
            {
                if($request->oldktp)
                {
                    Storage::disk('public')->delete('images/' . $request->oldktp);
                }
                $employe['img_ktp_dpn'] = UploadImage($request, 'img_ktp_dpn');
            }else{
                $employe['img_ktp_dpn'] = $request->oldktp;
            }

            if($request->hasFile('file_bpjs_kesehatan'))
            {
                if($request->oldFileBpjs)
                {
                    Storage::disk('public')->delete('bpjs/' . $request->oldFileBpjs);
                }
                $employe['file_bpjs_kesehatan'] = UploadBPJS($request, 'file_bpjs_kesehatan');
            }else{
                $employe['file_bpjs_kesehatan'] = $request->oldFileBpjs;
            }

            if($request->hasFile('file_bpjs_ketenaga'))
            {
                if($request->oldKetenaga)
                {
                    Storage::disk('public')->delete('bpjs/' . $request->oldKetenaga);
                }
                $employe['file_bpjs_ketenaga'] = UploadBPJS($request, 'file_bpjs_ketenaga');
            }else{
               $employe['file_bpjs_ketenaga'] = $request->oldKetenaga;
            }

            try {
                $employes->update($employe);
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error($e);
                return $e;
            }
        }
    }

    public function show($id)
    {
        $employe = Employe::with('user')->findOrFail($id);
        // $employe = EmployeResource::collection($employes);
        $no_kk = decryptField($employe->no_kk);
        $no_ktp = decryptField($employe->no_ktp);
        $users = User::with('jabatan')->where('nama_lengkap', $employe->name)->first();
        // dd($users);
        $career = Career::where('employe_id', $employe->id)->first();

        return Inertia::render('EmployePages/ShowEmploye', compact('employe', 'career', 'users', 'no_kk', 'no_ktp'));
    }

    public function destroy($id)
    {
        $employe = Employe::findOrFail($id);
        $employe->delete();
        return redirect()->back()->with(['messege' => 'Berhasil Hapus Data !']);
    }

    public function download(Request $request)
    {
        if($request->name != 'All')
        {
            if( !in_array('All', $request->jbt_str)){
                $client = Client::on('mysql2connection')->where('name', $request->name)->first();
                $employes = Employe::with('client')
                            ->where('client_id', $client->id)
                            ->orderBy('numbers', 'asc')
                            ->orderBy('date_real', 'asc')
                            ->get();
                $jabatanId = Jabatan::whereIn('name_jabatan', array_unique($request->jbt_str))->get();  // Get the jabatan_id based on the jabatan_name
                // dd($jabatanId);

                $users = User::with('jabatan')->whereIn('nama_lengkap', $employes->pluck('name'))
                    ->whereIn('jabatan_id', $jabatanId->pluck('id'))
                    ->get();
                    // dd($users);

                $oke = '';
            }else{
                $client = Client::on('mysql2connection')->where('name', $request->name)->first();
                $employes = Employe::with('client')
                            ->where('client_id', $client->id)
                            ->orderBy('numbers', 'asc')
                            ->orderBy('date_real', 'asc')
                            ->get();
                $users = User::with('jabatan')->whereIn('nama_lengkap', $employes->pluck('name'))
                    ->get();
                $oke = '';
            }
        }
        else{
            if(in_array('Data NotFound In Absensi', $request->jbt_str)) {
                $users = User::all();
                $employes = Employe::with('client')
                            ->whereNotIn('name', $users->pluck('nama_lengkap'))
                            ->orderBy('numbers', 'asc')
                            ->orderBy('date_real', 'asc')
                            ->get();

                $oke = $request->jbt_str[0];
            }else if(!in_array('All', $request->jbt_str)){
                $employes = Employe::with('client')
                        ->orderBy('numbers', 'asc')
                        ->orderBy('date_real', 'asc')
                        ->get();
                $jabatanId = Jabatan::whereIn('name_jabatan', array_unique($request->jbt_str))->get();  // Get the jabatan_id based on the jabatan_name
                // dd($jabatanId);

                $users = User::with('jabatan')->whereIn('nama_lengkap', $employes->pluck('name'))
                    ->whereIn('jabatan_id', $jabatanId->pluck('id'))
                    ->get();
                    // dd($users);

                $oke = '';
            }else{
                $employes = Employe::with('client')
                ->orderBy('numbers', 'asc')
                ->orderBy('date_real', 'asc')
                ->get();
                $users = User::with('jabatan')->whereIn('nama_lengkap', $employes->pluck('name'))
                    ->get();
                $oke = '';
            }

        }
            $employe = EmployeResource::collection($employes);
            // dd($employe);


        return Inertia::render('EmployePages/PrintEmploye', compact('employe', 'users', 'oke'));

    }
}
