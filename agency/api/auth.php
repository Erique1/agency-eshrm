<?php
/**
 * Authentication API Endpoint
 */

require_once 'config.php';

session_start();

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        if ($method !== 'POST') {
            jsonResponse(['error' => 'Method not allowed'], 405);
        }
        
        $data = getRequestBody();
        $email = sanitize($data['email'] ?? '');
        $password = $data['password'] ?? '';
        
        if (empty($email) || empty($password)) {
            jsonResponse(['error' => 'Email and password are required'], 400);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE email = ? AND is_active = 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if (!$user || !password_verify($password, $user['password_hash'])) {
                jsonResponse(['error' => 'Invalid email or password'], 401);
            }
            
            // Create session
            $token = generateToken();
            $expires = date('Y-m-d H:i:s', time() + SESSION_LIFETIME);
            
            $stmt = $pdo->prepare("
                INSERT INTO sessions (user_id, token, expires_at, created_at)
                VALUES (?, ?, ?, NOW())
            ");
            $stmt->execute([$user['id'], $token, $expires]);
            
            // Update last login
            $stmt = $pdo->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
            $stmt->execute([$user['id']]);
            
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['token'] = $token;
            
            jsonResponse([
                'success' => true,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'name' => $user['name'],
                    'role' => $user['role']
                ],
                'token' => $token
            ]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Login failed'], 500);
        }
        break;

    case 'logout':
        if ($method !== 'POST') {
            jsonResponse(['error' => 'Method not allowed'], 405);
        }
        
        $token = $_SESSION['token'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        
        if ($token) {
            try {
                $pdo = getDB();
                $stmt = $pdo->prepare("DELETE FROM sessions WHERE token = ?");
                $stmt->execute([$token]);
            } catch (Exception $e) {
                // Ignore errors
            }
        }
        
        session_destroy();
        jsonResponse(['success' => true]);
        break;

    case 'check':
        $token = $_SESSION['token'] ?? $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        
        if (empty($token)) {
            jsonResponse(['authenticated' => false], 401);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("
                SELECT u.* FROM admin_users u
                JOIN sessions s ON u.id = s.user_id
                WHERE s.token = ? AND s.expires_at > NOW() AND u.is_active = 1
            ");
            $stmt->execute([$token]);
            $user = $stmt->fetch();
            
            if (!$user) {
                jsonResponse(['authenticated' => false], 401);
            }
            
            jsonResponse([
                'authenticated' => true,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'name' => $user['name'],
                    'role' => $user['role']
                ]
            ]);
        } catch (Exception $e) {
            jsonResponse(['authenticated' => false], 401);
        }
        break;

    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}
?>
