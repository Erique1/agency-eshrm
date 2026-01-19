<?php
/**
 * Testimonials API Endpoint
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

switch ($method) {
    case 'GET':
        try {
            $pdo = getDB();
            
            if ($id) {
                $stmt = $pdo->prepare("SELECT * FROM testimonials WHERE id = ?");
                $stmt->execute([$id]);
                $testimonial = $stmt->fetch();
                
                if (!$testimonial) {
                    jsonResponse(['error' => 'Testimonial not found'], 404);
                }
                
                jsonResponse(['testimonial' => $testimonial]);
            } else {
                $activeOnly = isset($_GET['active']) && $_GET['active'] === 'true';
                
                if ($activeOnly) {
                    $stmt = $pdo->query("SELECT * FROM testimonials WHERE is_active = 1 ORDER BY display_order ASC");
                } else {
                    $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY display_order ASC");
                }
                
                $testimonials = $stmt->fetchAll();
                jsonResponse(['testimonials' => $testimonials]);
            }
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to fetch testimonials'], 500);
        }
        break;

    case 'POST':
        $data = getRequestBody();
        
        $name = sanitize($data['name'] ?? '');
        $position = sanitize($data['position'] ?? '');
        $company = sanitize($data['company'] ?? '');
        $content = sanitize($data['content'] ?? '');
        $image = sanitize($data['image'] ?? '');
        $rating = intval($data['rating'] ?? 5);
        $isActive = isset($data['isActive']) ? ($data['isActive'] ? 1 : 0) : 1;
        
        if (empty($name) || empty($content)) {
            jsonResponse(['error' => 'Name and content are required'], 400);
        }
        
        try {
            $pdo = getDB();
            
            // Get next display order
            $stmt = $pdo->query("SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM testimonials");
            $nextOrder = $stmt->fetch()['next_order'];
            
            $stmt = $pdo->prepare("
                INSERT INTO testimonials (name, position, company, content, image, rating, is_active, display_order, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
            ");
            $stmt->execute([$name, $position, $company, $content, $image, $rating, $isActive, $nextOrder]);
            
            $id = $pdo->lastInsertId();
            jsonResponse(['success' => true, 'id' => $id], 201);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to create testimonial'], 500);
        }
        break;

    case 'PUT':
        if (!$id) {
            jsonResponse(['error' => 'Testimonial ID required'], 400);
        }
        
        $data = getRequestBody();
        
        try {
            $pdo = getDB();
            
            $stmt = $pdo->prepare("
                UPDATE testimonials SET
                    name = COALESCE(?, name),
                    position = COALESCE(?, position),
                    company = COALESCE(?, company),
                    content = COALESCE(?, content),
                    image = COALESCE(?, image),
                    rating = COALESCE(?, rating),
                    is_active = COALESCE(?, is_active),
                    updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([
                $data['name'] ?? null,
                $data['position'] ?? null,
                $data['company'] ?? null,
                $data['content'] ?? null,
                $data['image'] ?? null,
                isset($data['rating']) ? intval($data['rating']) : null,
                isset($data['isActive']) ? ($data['isActive'] ? 1 : 0) : null,
                $id
            ]);
            
            jsonResponse(['success' => true]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to update testimonial'], 500);
        }
        break;

    case 'DELETE':
        if (!$id) {
            jsonResponse(['error' => 'Testimonial ID required'], 400);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(['success' => true]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to delete testimonial'], 500);
        }
        break;

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}
?>
