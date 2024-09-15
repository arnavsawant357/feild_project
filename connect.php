<?php
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];



$conn = new mysqli('localhost', 'root','', 'signup');
if($conn->connect_error){
    die('Connection Failed'. $conn->connect_error);
}else{
    $stmt = $conn->prepare("insert into login(firstName, lastName, email, password)
        values(?, ?, ?, ?)");
    $stmt->bind_param('ssss', $firstName, $lastName, $email, $password);
    $stmt->execute();
    echo'registration successfull';
    $stmt->close();
    $conn->close();

}
?>