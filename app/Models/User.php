<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $connection = 'mysql2connection';
    protected $table = 'users';
    // protected $table = 'absensi.users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function Role()
    {
        return $this->belongsTo(Role::class);
    }
   
    public function Divisi()
    {
        return $this->setConnection('mysql2connection')->belongsTo(Divisi::class, 'devisi_id', 'id');
    }
    
    public function SlipGaji()
    {
        return $this->setConnection("mysql")->hasMany(SlipGaji::class);
    }

    // public function latestSlip()
    // {
    //     return $this->setConnection("mysql")->hasOne(SlipGaji::class)->latestOfMany();
    // }

    public function Jabatan()
    {
        return $this->setConnection("mysql2connection")->belongsTo(Jabatan::class);
    }

    public function Kerjasama()
    {
        return $this->setConnection("mysql2connection")->belongsTo(Kerjasama::class);
    }

    public function client()
    {
        return $this->hasOneThrough(
            Client::class,
            Kerjasama::class,
            'id',       // Foreign key on Kerjasama table
            'id',       // Foreign key on Client table
            'kerjasama_id', // Foreign key on User table
            'client_id'     // Foreign key on Kerjasama table
        );
    }


}
