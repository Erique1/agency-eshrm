<?php
/**
 * Dashboard Stats API Endpoint
 */

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

try {
    $pdo = getDB();
    
    // Total leads
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM leads");
    $totalLeads = $stmt->fetch()['count'];
    
    // New leads (last 7 days)
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM leads WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
    $newLeads = $stmt->fetch()['count'];
    
    // Total bookings
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM bookings");
    $totalBookings = $stmt->fetch()['count'];
    
    // Pending bookings
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'");
    $pendingBookings = $stmt->fetch()['count'];
    
    // Published blog posts
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM blog_posts WHERE status = 'published'");
    $publishedPosts = $stmt->fetch()['count'];
    
    // Active testimonials
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM testimonials WHERE is_active = 1");
    $activeTestimonials = $stmt->fetch()['count'];
    
    // Recent leads
    $stmt = $pdo->query("SELECT id, name, email, service_interest, status, created_at FROM leads ORDER BY created_at DESC LIMIT 5");
    $recentLeads = $stmt->fetchAll();
    
    // Upcoming bookings
    $stmt = $pdo->query("SELECT id, name, email, booking_date, booking_time, status FROM bookings WHERE booking_date >= CURDATE() ORDER BY booking_date ASC, booking_time ASC LIMIT 5");
    $upcomingBookings = $stmt->fetchAll();
    
    jsonResponse([
        'stats' => [
            'totalLeads' => $totalLeads,
            'newLeads' => $newLeads,
            'totalBookings' => $totalBookings,
            'pendingBookings' => $pendingBookings,
            'publishedPosts' => $publishedPosts,
            'activeTestimonials' => $activeTestimonials
        ],
        'recentLeads' => $recentLeads,
        'upcomingBookings' => $upcomingBookings
    ]);
} catch (Exception $e) {
    jsonResponse(['error' => 'Failed to fetch stats'], 500);
}
?>
