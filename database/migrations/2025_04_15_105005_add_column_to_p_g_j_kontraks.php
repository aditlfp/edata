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
        Schema::table('p_g_j__kontraks', function (Blueprint $table) {
            $table->string('send_to_operator')->after('no_srt')->nullable()->default(0);
            $table->string('send_to_atasan')->after('send_to_operator')->nullable()->default(0);
            $table->string('ttd')->after('kinerja')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('p_g_j__kontraks', function (Blueprint $table) {
            $table->dropColumn('send_to_operator');
            $table->dropColumn('send_to_atasan');
            $table->dropColumn('ttd');
        });
    }
};
