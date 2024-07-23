<?php

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('slip_gajis', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable();
            $table->string('karyawan');
            $table->string('formasi');
            $table->string('mk');
            $table->string('bulan_tahun');
            $table->string('status');
            $table->string('gaji_pokok')->nullable();
            $table->string('gaji_lembur')->nullable();
            $table->string('tj_jabatan')->nullable();
            $table->string('tj_kehadiran')->nullable();
            $table->string('tj_kinerja')->nullable();
            $table->string('tj_lain')->nullable();
            $table->string('bpjs')->nullable();
            $table->string('pinjaman')->nullable();
            $table->string('absen')->nullable();
            $table->string('lain_lain')->nullable();
            $table->string('total')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slip_gajis');
    }
};
