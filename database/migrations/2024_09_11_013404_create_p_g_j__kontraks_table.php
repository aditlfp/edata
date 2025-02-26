<?php

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
        Schema::create('p_g_j__kontraks', function (Blueprint $table) {
            $table->id();
            $table->string('no_srt');
            $table->date('tgl_dibuat');

            $table->string('nama_pk_ptm');
            $table->string('alamat_pk_ptm');
            $table->string('jabatan_pk_ptm');

            $table->string('nama_pk_kda');
            $table->string('tempat_lahir_pk_kda');
            $table->date('tgl_lahir_pk_kda');
            $table->string('nik_pk_kda');
            $table->string('alamat_pk_kda');

            $table->string('jabatan_pk_kda');
            $table->string('status_pk_kda');
            $table->string('unit_pk_kda');

            $table->date('tgl_mulai_kontrak');
            $table->date('tgl_selesai_kontrak');
            
            $table->string('g_pok')->default(0);
            $table->string('tj_hadir')->default(0);
            $table->string('kinerja')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('p_g_j__kontraks');
    }
};
