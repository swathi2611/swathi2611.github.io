<?php include '../view/header.php'; ?>
<main id="aligned">
    <h1>Student Login Page </h1>

    <form action="../login/" method="post" id="login_form">
        <input type="hidden" name="action" value="login_form">
        
        <label>Email:</label>
        <input type="input" name="email"> <br>
        
        <label>Password:</label>
        <input type="input" name="pass"> <br>

        <input type="submit" value="Login">
        <br>
    </form>
</main>
<?php include '../view/footer.php'; ?>
