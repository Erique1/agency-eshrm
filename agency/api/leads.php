<?php
/**
 * Leads API Endpoint
 * Handles contact form submissions
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all leads (admin only)
        try {
            $pdo = getDB();
            $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC");
            $leads = $stmt->fetchAll();
            jsonResponse(['leads' => $leads]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to fetch leads'], 500);
        }
        break;

    case 'POST':
        // Create new lead (contact form submission)
        $data = getRequestBody();
        
        $name = sanitize($data['name'] ?? '');
        $email = sanitize($data['email'] ?? '');
        $phone = sanitize($data['phone'] ?? '');
        $company = sanitize($data['company'] ?? '');
        $service = sanitize($data['service'] ?? '');
        $message = sanitize($data['message'] ?? '');
        
        if (empty($name) || empty($email) || empty($message)) {
            jsonResponse(['error' => 'Name, email, and message are required'], 400);
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            jsonResponse(['error' => 'Invalid email address'], 400);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("
                INSERT INTO leads (name, email, phone, company, service_interest, message, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, 'new', NOW())
            ");
            $stmt->execute([$name, $email, $phone, $company, $service, $message]);
            
            $id = $pdo->lastInsertId();
            jsonResponse(['success' => true, 'id' => $id, 'message' => 'Thank you for contacting us!'], 201);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to submit form'], 500);
        }
        break;

    case 'PUT':
        // Update lead status
        $data = getRequestBody();
        $id = intval($data['id'] ?? 0);
        $status = sanitize($data['status'] ?? '');
        
        if (!$id || !in_array($status, ['new', 'contacted', 'qualified', 'converted', 'lost'])) {
            jsonResponse(['error' => 'Invalid request'], 400);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("UPDATE leads SET status = ?, updated_at = NOW() WHERE id = ?");
            $stmt->execute([$status, $id]);
            jsonResponse(['success' => true]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to update lead'], 500);
        }
        break;

    case 'DELETE':
        // Delete lead
        $id = intval($_GET['id'] ?? 0);
        
        if (!$id) {
            jsonResponse(['error' => 'Lead ID required'], 400);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(['success' => true]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to delete lead'], 500);
        }
        break;

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}
?>
