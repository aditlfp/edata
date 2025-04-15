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
            $table->string('ttd_atasan')->after('send_to_atasan')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('p_g_j__kontraks', function (Blueprint $table) {
            $table->dropColumn('ttd_atasan');
        });
    }
};
