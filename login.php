<?php
// Start session to keep track of the user
session_start();

// Database connection settings
$servername = "localhost";
$username = "root";
$password = ""; // Replace with your MySQL password if different
$dbname = "field_project"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the submitted form data
    $email = $conn->real_escape_string($_POST['email']);
    $password = $conn->real_escape_string($_POST['password']);

    // Query the database for the user with the entered email
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    // Check if a user was found with that email
    if ($result->num_rows > 0) {
        // Fetch the user data
        $user = $result->fetch_assoc();
        $hashedPassword = $user['password']; // The hashed password from the database

        // Verify the entered password with the hashed password
        if (password_verify($password, $hashedPassword)) {
            // Password is correct, so start a session and store user info
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['first_name'] = $user['first_name'];
            $_SESSION['last_name'] = $user['last_name'];
            $_SESSION['email'] = $user['email'];

            // Redirect to a welcome page or dashboard
            header("Location: home.html");
            exit();
        } else {
            // Password is incorrect
            echo "Invalid password. Please try again.";
        }
    } else {
        // No user found with the entered email
        echo "No account found with that email. Please sign up.";
    }
}

// Close the connection
$conn->close();
?>
