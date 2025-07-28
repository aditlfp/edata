<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Divisi;
use App\Models\TempUsers;
use App\Models\User;
use App\Notifications\AccEmploye;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class TempUsersController extends Controller
{
    public function index()
    {
        $allDatas = []; // collect all
        $tempUsers = TempUsers::with(['Client', 'Devisi'])->latest()->get();
        $clients = Client::query();
        $devisis = Divisi::query();
        $key = base64_decode((str_replace('base64:', '', config('app.previous_keys')))); // OR hardcode it here for testing
        $cipher = 'AES-256-CBC';

        $encrypter = new Encrypter($key, $cipher);

        foreach ($tempUsers as $tempUser) {
            $allDatas[] = [
                'id'         => $tempUser->id,
                'nama_lengkap' => $tempUser->data['nama_lengkap'] ?? '',
                'pw' => $tempUser->data['pw'] ?? '',
                'no_hp'     => $tempUser->data['no_hp'] ?? '',
                'email'     => $tempUser->data['email'] ?? '',
                'image'     => $tempUser->data['image'] ?? '',
                'img_ktp_dpn' => $tempUser->data['img_ktp_dpn'] ?? '',
                'ttl'       => $tempUser->data['ttl'] ?? '',
                'nik'       => $encrypter->decryptString($tempUser->data['nik']) ?? '',
                'client'  => $clients->where('id', $tempUser->data['client_id'])->first(),
                'devisi'  => $devisis->where('id', $tempUser->data['devisi_id'])->first(),
                'status'    => $tempUser->status,
                'created_at' => $tempUser->created_at ? $tempUser->created_at->format('d-m-Y') : 'Tidak Tersedia',
            ];
        }

        return Inertia::render('Admin/TempUsers/IndexTempUsers', 
            [
                'tempUsers' => $allDatas,
                'paginate' => 0,
            ]
        );
    }

    public function update(Request $request, $id)
    {
        $tempUser = TempUsers::findOrFail($id);
        $user = User::firstWhere('nama_lengkap',$tempUser->data['nama_lengkap']);

        // dd($user);
        
        try {
            $tempUser->update([
                'status' => $request->status,
            ]);
            if($user) {
                $user->update([
                    'status_id' => null,
                ]);
            }
            Notification::route('mail', 'syafimq00@gmail.com')
            ->notify(new AccEmploye($tempUser->data['username'] ?? '', $tempUser->data['pw'] ?? ''));
            
        } catch (\Exception $th) {
            throw $th;
        }

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function destroy($id)
    {
        $tempUser = TempUsers::findOrFail($id);
        $tempUser->delete();

        return redirect()->back()->with('success', 'Temporary user deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);

        if (empty($ids)) {
            return redirect()->back()->with('error', 'No IDs provided for deletion.');
        }
        try {
            TempUsers::whereIn('id', $ids)->delete();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Invalid IDs provided.');
        }

        return response()->json('ok', 200);
    }
}
