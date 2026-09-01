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
        if (! Schema::hasColumn('employes', 'date_real')) {
            Schema::table('employes', function (Blueprint $table) {
                $table->string('date_real')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('employes', 'date_real')) {
            Schema::table('employes', function (Blueprint $table) {
                $table->dropColumn('date_real');
            });
        }
    }
};
