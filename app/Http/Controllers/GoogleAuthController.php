<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->with(['prompt' => 'select_account'])->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::UpdateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]
            );

            Auth::login($user);
            
            // Redirect ke halaman books
                return redirect()->route('articles.index');
            } catch (\Exception $e) {
                // Jika ada kesalahan, redirect ke halaman login dengan pesan error
                return redirect('/')->with('error', 'Terjadi kesalahan saat login dengan Google.');
            }
    }
        
    
}
