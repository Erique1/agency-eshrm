<?php
/**
 * Blog API Endpoint
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

switch ($method) {
    case 'GET':
        try {
            $pdo = getDB();
            
            if ($id) {
                $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
                $stmt->execute([$id]);
                $post = $stmt->fetch();
                
                if (!$post) {
                    jsonResponse(['error' => 'Post not found'], 404);
                }
                
                jsonResponse(['post' => $post]);
            } else {
                $status = $_GET['status'] ?? null;
                
                if ($status) {
                    $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE status = ? ORDER BY published_at DESC");
                    $stmt->execute([$status]);
                } else {
                    $stmt = $pdo->query("SELECT * FROM blog_posts ORDER BY created_at DESC");
                }
                
                $posts = $stmt->fetchAll();
                jsonResponse(['posts' => $posts]);
            }
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to fetch posts'], 500);
        }
        break;

    case 'POST':
        $data = getRequestBody();
        
        $title = sanitize($data['title'] ?? '');
        $slug = sanitize($data['slug'] ?? '');
        $excerpt = sanitize($data['excerpt'] ?? '');
        $content = $data['content'] ?? '';
        $category = sanitize($data['category'] ?? '');
        $author = sanitize($data['author'] ?? '');
        $image = sanitize($data['image'] ?? '');
        $status = sanitize($data['status'] ?? 'draft');
        $metaTitle = sanitize($data['metaTitle'] ?? '');
        $metaDescription = sanitize($data['metaDescription'] ?? '');
        
        if (empty($title) || empty($content)) {
            jsonResponse(['error' => 'Title and content are required'], 400);
        }
        
        if (empty($slug)) {
            $slug = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $title));
        }
        
        try {
            $pdo = getDB();
            $publishedAt = $status === 'published' ? date('Y-m-d H:i:s') : null;
            
            $stmt = $pdo->prepare("
                INSERT INTO blog_posts (title, slug, excerpt, content, category, author, featured_image, status, meta_title, meta_description, published_at, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
            ");
            $stmt->execute([$title, $slug, $excerpt, $content, $category, $author, $image, $status, $metaTitle, $metaDescription, $publishedAt]);
            
            $id = $pdo->lastInsertId();
            jsonResponse(['success' => true, 'id' => $id], 201);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to create post'], 500);
        }
        break;

    case 'PUT':
        if (!$id) {
            jsonResponse(['error' => 'Post ID required'], 400);
        }
        
        $data = getRequestBody();
        
        try {
            $pdo = getDB();
            
            // Build dynamic update query
            $fields = [];
            $values = [];
            
            $allowedFields = ['title', 'slug', 'excerpt', 'content', 'category', 'author', 'featured_image', 'status', 'meta_title', 'meta_description'];
            
            foreach ($allowedFields as $field) {
                $camelField = lcfirst(str_replace('_', '', ucwords($field, '_')));
                if (isset($data[$camelField]) || isset($data[$field])) {
                    $fields[] = "$field = ?";
                    $values[] = $data[$camelField] ?? $data[$field];
                }
            }
            
            if (isset($data['status']) && $data['status'] === 'published') {
                $fields[] = "published_at = COALESCE(published_at, NOW())";
            }
            
            $fields[] = "updated_at = NOW()";
            $values[] = $id;
            
            $sql = "UPDATE blog_posts SET " . implode(', ', $fields) . " WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
            
            jsonResponse(['success' => true]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to update post'], 500);
        }
        break;

    case 'DELETE':
        if (!$id) {
            jsonResponse(['error' => 'Post ID required'], 400);
        }
        
        try {
            $pdo = getDB();
            $stmt = $pdo->prepare("DELETE FROM blog_posts WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(['success' => true]);
        } catch (Exception $e) {
            jsonResponse(['error' => 'Failed to delete post'], 500);
        }
        break;

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}
?>
