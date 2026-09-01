<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('employes', 'numbers')) {
            Schema::table('employes', function (Blueprint $table) {
                $table->string('numbers')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('employes', 'numbers')) {
            Schema::table('employes', function (Blueprint $table) {
                $table->dropColumn('numbers');
            });
        }
    }
};
