<?php
require('../model/database.php');
require('../model/login_db.php');

//Session Action If student or instructor already logged in
$action = filter_input(INPUT_POST, 'action');

if (isset($_COOKIE['email']) && $_COOKIE['email'] != ''){
   $email = $_COOKIE['email'];
   $action = 'display_student';
}
else if ($action  == NULL ){
   $action = 'login_page';
}

//Default Login Page
if ($action == 'login_page') {
   include('../login/login.php');
}

//Student Login Page
else if ($action == 'login_form'){
   $email  = filter_input(INPUT_POST, 'email');
   $password  = filter_input(INPUT_POST, 'pass');
   if ($email == NULL || $password == NULL ){
      $error = "STUDENT LOGIN Invalid email and Password, Check all fields and try again.";
      include('../errors/error.php');
   }
   else{
      $student = student_login($email,$password);
      setcookie('email',$email,time() +3000 , '../');    
      setcookie('type','student',time() +3000 , '../');
      $student = get_student_id($email);
      include('../login/student.php');
   }
}

else if ( $action == 'display_student'){
   if ($email == NULL || $email == ''){
      $error = "Empty email";
      include('../errors/error.php');
   }
   $student = get_student_email($email);
   if ($student == NULL){
      $error = $email . "password didn't match, Check all fields and try again.";
      include('../errors/error.php');
   }
   else{
      include('../login/student.php');
   }
}

else if ( $action == 'logout'){
   setcookie('email','',time() -3000 , '../');    
   setcookie('type','',time() -3000 ,  '../');
   include('../login/login.php');
} 
?>
