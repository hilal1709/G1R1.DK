<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function loginAdmin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($request->only('email','password'))) {
            $request->session()->regenerate(); // session aman
            return redirect()->route('videos.index');
        }

        return back()->withErrors(['email' => 'Credentials salah']);
    }

    public function registerAdmin(Request $request)
    {
        $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|confirmed|min:6',
        ]);

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'role'=>'admin', // optional
        ]);

        Auth::login($user); // langsung login
        return redirect('/admin/dashboard');
    }


    // Tampilkan form login
    public function showLoginForm()
    {
        return view('login');
    }

    // Tampilkan form register
    public function showRegisterForm()
    {
        return view('auth.register');
    }
}
