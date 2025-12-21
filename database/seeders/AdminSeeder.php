<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@damarkurung.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        echo "Admin user created successfully!\n";
        echo "Email: admin@damarkurung.com\n";
        echo "Password: admin123\n";
    }
}
