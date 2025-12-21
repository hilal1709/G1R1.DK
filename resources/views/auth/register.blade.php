<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
</head>
<body>

<h2>Register</h2>

<form method="POST" action="{{ route('register') }}">
    @csrf

    <div>
        <label>Full Name</label>
        <input type="text" name="name" required>
    </div>

    <div>
        <label>Username</label>
        <input type="text" name="username" required>
    </div>

    <div>
        <label>Email</label>
        <input type="email" name="email" required>
    </div>

    <div>
        <label>Password</label>
        <input type="password" name="password" required>
    </div>

    <div>
        <label>Confirm Password</label>
        <input type="password" name="password_confirmation" required>
    </div>

    <button type="submit">Register</button>
</form>

<p>Sudah punya akun? <a href="{{ route('login') }}">Login</a></p>

</body>
</html>
