<?php include '../view/header.php'; ?>
<main id="aligned">
    <label>Name : </label>
    <p><?php echo $student['name']; ?></p>
    <br>

    <label>Id : </label>
    <p><?php echo $student['id']; ?></p>
    <br>

    <label>Email: </label>
    <p><?php echo $student['email']; ?></p>
    <br>

    <label>Password: </label>
    <p><?php echo $student['password']; ?></p>
    <br>
 
    <label>Address: </label>
    <p><?php echo $student['address']; ?></p>
    <br>
    
    <label>Password: </label>
    <p><?php echo "*********"; ?></p>
    <br>

</main>
<?php include '../view/footer.php'; ?>
