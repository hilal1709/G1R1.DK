<h2>Login</h2>

@if ($errors->any())
    <p style="color:red">{{ $errors->first() }}</p>
@endif

<form action="/login-admin" method="POST">
    @csrf
    <input type="email" name="email" placeholder="Email" required><br>
    <input type="password" name="password" placeholder="Password" required><br>
    <button type="submit">Login</button>
</form>
