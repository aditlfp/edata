<?php

namespace App\Http\Resources;

use App\Models\Client;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

class EmployeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $authUser = auth()->user()->id;
        $user = User::on('mysql2connection')->where('id', $authUser)->firstOrFail();
        if($user->role->name == 'admin')
        {
            return [
                'id' => $this->id,
                'user_id' => $this->user_id,
                'name' => $this->name,
                'ttl' => $this->ttl,
                'nik' => $this->nik,
                'no_kk' => decryptField($this->no_kk),
                'no_ktp' => decryptField($this->no_ktp),
                'client_id' => $this->client_id,
                'initials' => $this->initials,
                'numbers' => $this->numbers,
                'date_real' => $this->date_real
                ? Carbon::createFromFormat('Y-m', $this->date_real)->format('m-Y')
                : null, // Or provide a default value like 'N/A'

                'img' => $this->img,
                'img_ktp_dpn' => $this->img_ktp_dpn,
                'jenis_bpjs' => $this->jenis_bpjs,
                'no_bpjs_kesehatan' => $this->no_bpjs_kesehatan,
                'file_bpjs_kesehatan' => $this->file_bpjs_kesehatan,
                'no_bpjs_ketenaga' => $this->no_bpjs_ketenaga,
                'file_bpjs_ketenaga' => $this->file_bpjs_ketenaga,
                'user' => User::on('mysql2connection')->where('nama_lengkap', $this->name)->first(),
                'client' => Client::on('mysql2connection')->where('id', $this->client_id)->first(),
                'created_at' => $this->created_at
            ];

        }
    }

}
