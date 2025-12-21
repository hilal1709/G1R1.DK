<h2>Login</h2>

<?php if($errors->any()): ?>
    <p style="color:red"><?php echo e($errors->first()); ?></p>
<?php endif; ?>

<form action="/login-admin" method="POST">
    <?php echo csrf_field(); ?>
    <input type="email" name="email" placeholder="Email" required><br>
    <input type="password" name="password" placeholder="Password" required><br>
    <button type="submit">Login</button>
</form>
<?php /**PATH D:\me\kuliah\smt V\mpti\G1R1.DK\resources\views/login.blade.php ENDPATH**/ ?>