<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TempUsers extends Model
{
    use HasFactory;
    protected $connection = 'mysql2connection';
    protected $casts = [
        'data' => 'array',
    ];

    protected $fillable = [
        'status',
    ];

    public function Client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function Devisi()
    {
        return $this->belongsTo(Divisi::class, 'devisi_id', 'id');
    }
}
