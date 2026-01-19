import { query, queryOne } from "@/lib/db"
import type { Booking } from "@/lib/types"

export async function getAllBookings(): Promise<Booking[]> {
  return query<Booking[]>("SELECT * FROM bookings ORDER BY booking_date DESC, booking_time DESC")
}

export async function getBookingById(id: number): Promise<Booking | null> {
  return queryOne<Booking>("SELECT * FROM bookings WHERE id = ?", [id])
}

export async function getBookingsByStatus(status: Booking["status"]): Promise<Booking[]> {
  return query<Booking[]>("SELECT * FROM bookings WHERE status = ? ORDER BY booking_date DESC", [status])
}

export async function getUpcomingBookings(): Promise<Booking[]> {
  return query<Booking[]>(
    "SELECT * FROM bookings WHERE booking_date >= CURDATE() AND status IN ('pending', 'confirmed') ORDER BY booking_date ASC, booking_time ASC",
  )
}

export async function createBooking(
  data: Omit<Booking, "id" | "created_at" | "updated_at" | "status">,
): Promise<Booking> {
  const result = await query<any>(
    `INSERT INTO bookings (name, email, company, phone, service, booking_date, booking_time, consultation_type, message, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [
      data.name,
      data.email,
      data.company,
      data.phone,
      data.service,
      data.booking_date,
      data.booking_time,
      data.consultation_type,
      data.message,
    ],
  )
  const booking = await getBookingById(result.insertId)
  return booking!
}

export async function updateBookingStatus(id: number, status: Booking["status"]): Promise<Booking | null> {
  await query("UPDATE bookings SET status = ? WHERE id = ?", [status, id])
  return getBookingById(id)
}

export async function deleteBooking(id: number): Promise<boolean> {
  const result = await query<any>("DELETE FROM bookings WHERE id = ?", [id])
  return result.affectedRows > 0
}

export async function getBookingStats(): Promise<{
  pending: number
  confirmed: number
  completed: number
  cancelled: number
  total: number
}> {
  const results = await query<Array<{ status: string; count: number }>>(
    "SELECT status, COUNT(*) as count FROM bookings GROUP BY status",
  )
  const stats = { pending: 0, confirmed: 0, completed: 0, cancelled: 0, total: 0 }
  results.forEach((row) => {
    stats[row.status as keyof typeof stats] = row.count
    stats.total += row.count
  })
  return stats
}
