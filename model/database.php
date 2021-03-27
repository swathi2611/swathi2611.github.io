<?php
    $dsn = 'mysql:host=localhost;dbname=aumdb';
    $username = 'aumuser';
    $password = 'Pass5Word';

    try {
        $db = new PDO($dsn, $username, $password);
    } catch (PDOException $e) {
        $error_message = $e->getMessage();
        include('../errors/database_error.php');
        exit();
    }
?>
