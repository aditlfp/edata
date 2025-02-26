<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SlipGaji extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function User()
    {
        return $this->belongsTo(User::class)->latest();
    }
    public function Employe()
    {
        return $this->belongsTo(Employe::class, 'karyawan', 'name');
    }
}

