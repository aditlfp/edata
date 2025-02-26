<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function index()
    {
        $authUser = Auth::user()->id;
        $user = User::on('mysql2connection')->where('id', $authUser)->firstOrFail();
        $employeesByMonth = Employe::select(
            DB::raw('MONTH(created_at) as month'),  // Extract the month from the 'created_at' field
            DB::raw('COUNT(*) as employee_count')  // Count how many employees in each month
        )
        ->whereYear('created_at', date('Y'))  // Filter the data for the current year (or you can specify any year)
        ->whereBetween(DB::raw('MONTH(created_at)'), [1, 12]) // Get only records from January to December
        ->groupBy(DB::raw('MONTH(created_at)'))  // Group by the month
        ->orderBy(DB::raw('MONTH(created_at)'))  // Order the results by month (optional)
        ->get();

        return Inertia::render('Admin/Dashboard/Index', compact('user', 'employeesByMonth'));
    }

}
