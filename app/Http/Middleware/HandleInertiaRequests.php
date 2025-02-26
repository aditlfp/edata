<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if (Auth::user()) {
            $authUser = Auth::user()->id;
            $user = User::where('id', $authUser)->firstOrFail();
        }else{
            $user = $request->user();
        }
        return [
            ...parent::share($request),
            'auth' => [
                // $authUser = Auth::user() ? Auth::user()->id : "",
                'user' => $user,
            ],
            'api_key' => config('app.private_api_key'),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
             'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ];
    }
}
