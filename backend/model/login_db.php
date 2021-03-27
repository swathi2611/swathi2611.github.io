<?php

function login($email,$password) {
    global $db;
    try{
        $query = 'SELECT * FROM students 
                WHERE email = :email';
        $statement = $db->prepare($query);
        $statement->bindValue(':email', $email);
        $statement->execute();
        $student = $statement->fetch();
        $statement->closeCursor();
        if ($student != NULL && $student['password'] == $password)
          return $student;
        else
         return Null; 
    }catch (PDOException $e) {
        $error_message = $e->getMessage();
        include('../errors/database_error.php');
        exit();
    }
}

function get_student_email($email) {
    global $db;
    try{
        $query = 'SELECT * FROM students 
                WHERE email = :email';
        $statement = $db->prepare($query);
        $statement->bindValue(':email', $email);
        $statement->execute();
        $student = $statement->fetch();
        $statement->closeCursor();
        return $student;
    }catch (PDOException $e) {
        $error_message = $e->getMessage();
        include('../errors/database_error.php');
        exit();
    }
}

function get_student_id($id) {
    global $db;
    try{
        $query = 'SELECT * FROM students 
                WHERE id = :id'; 
        $statement = $db->prepare($query);
        $statement->bindValue(':id', $id);
        $statement->execute();
        $student = $statement->fetch();
        $statement->closeCursor();
        return $student;
    }catch (PDOException $e) {
        $error_message = $e->getMessage();
        include('../errors/database_error.php');
        exit();
    }
}
?>
