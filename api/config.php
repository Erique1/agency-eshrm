<?php
/**
 * ESHRM API Configuration
 * Update these values with your cPanel MySQL credentials
 */

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'YOUR_CPANEL_USERNAME_eshrm');
define('DB_USER', 'YOUR_CPANEL_USERNAME_eshrm');
define('DB_PASS', 'YOUR_DATABASE_PASSWORD');
define('DB_CHARSET', 'utf8mb4');

// Site Configuration
define('SITE_URL', 'https://eshrm.africa');
define('ADMIN_EMAIL', 'admin@eshrm.africa');

// Session Configuration
define('SESSION_LIFETIME', 86400); // 24 hours

// Security
define('BCRYPT_COST', 10);

// CORS Headers
header('Access-Control-Allow-Origin: ' . SITE_URL);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
function getDB() {
    static $pdo = null;
    
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database connection failed']);
            exit();
        }
    }
    
    return $pdo;
}

// Helper Functions
function jsonResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit();
}

function getRequestBody() {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

function sanitize($value) {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

function generateToken($length = 32) {
    return bin2hex(random_bytes($length));
}
?>
