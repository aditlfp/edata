<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('slip_gajis', function (Blueprint $table) {
            $table->unique(['user_id', 'bulan_tahun'], 'slip_gajis_user_month_unique');
        });
    }

    public function down(): void
    {
        Schema::table('slip_gajis', function (Blueprint $table) {
            $table->dropUnique('slip_gajis_user_month_unique');
        });
    }
};
