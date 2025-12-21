<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = Auth::user();

        // Redirect admin to dashboard, member to homepage
        if ($user && $user->role === 'admin') {
            return redirect()->intended('/dashboard');
        }

        return redirect()->intended('/');
    }
}
