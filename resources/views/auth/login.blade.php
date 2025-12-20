<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>

<h2>Login</h2>

<form method="POST" action="{{ route('login') }}">
    @csrf

    <div>
        <label>Username</label>
        <input type="text" name="username" required autofocus>
    </div>

    <div>
        <label>Password</label>
        <input type="password" name="password" required>
    </div>

    <button type="submit">Login</button>
</form>

<p>Belum punya akun? <a href="{{ route('register') }}">Register</a></p>

</body>
</html>
