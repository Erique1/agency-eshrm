<?php
/**
 * Bookings API Endpoint
 * Handles consultation booking submissions
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all bookings
        try {
            $pdo = getDB();
            $stmt = $pdo->query("SELECT * FROM bookings ORDER BY booking_date DESC, booking_time DESC");
            $bookings = $stmt->fetchAll();
            jsonResponse(['bookings' => $bookings]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to fetch bookings'], 500);
        }
        break;

    case 'POST':
        // Create new booking
        $data = getRequestBody();
        
        $name = sanitize($data['name'] ?? '');
        $email = sanitize($data['email'] ?? '');
        $phone = sanitize($data['phone'] ?? '');
        $company = sanitize($data['company'] ?? '');
        $service = sanitize($data['service'] ?? '');
        $date = sanitize($data['date'] ?? '');
        $time = sanitize($data['time'] ?? '');
        $type = sanitize($data['consultationType'] ?? 'video');
        $notes = sanitize($data['notes'] ?? '');
        
        if (empty($name) || empty($email) || empty($date) || empty($time)) {
            jsonResponse(['error' => 'Name, email, date, and time are required'], 400);
        }
        
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            jsonResponse(['error' => 'Invalid email address'], 400);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("
                INSERT INTO bookings (name, email, phone, company, service_interest, booking_date, booking_time, consultation_type, notes, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
            ");
            $stmt->execute([$name, $email, $phone, $company, $service, $date, $time, $type, $notes]);
            
            $id = $pdo->lastInsertId();
            jsonResponse(['success' => true, 'id' => $id, 'message' => 'Booking submitted successfully!'], 201);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to submit booking'], 500);
        }
        break;

    case 'PUT':
        // Update booking status
        $data = getRequestBody();
        $id = intval($data['id'] ?? 0);
        $status = sanitize($data['status'] ?? '');
        
        if (!$id || !in_array($status, ['pending', 'confirmed', 'completed', 'cancelled'])) {
            jsonResponse(['error' => 'Invalid request'], 400);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("UPDATE bookings SET status = ?, updated_at = NOW() WHERE id = ?");
            $stmt->execute([$status, $id]);
            jsonResponse(['success' => true]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to update booking'], 500);
        }
        break;

    case 'DELETE':
        // Delete booking
        $id = intval($_GET['id'] ?? 0);
        
        if (!$id) {
            jsonResponse(['error' => 'Booking ID required'], 400);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("DELETE FROM bookings WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(['success' => true]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to delete booking'], 500);
        }
        break;

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}
?>
