import Link from "next/link";

interface Booking {
  id: number;
  date: string;
  start_time: string;
}

interface BookingsListProps {
  bookings: Booking[];
}

export default function BookingsList({ bookings }: BookingsListProps) {
  return (
    <ul className="space-y-4">
      {bookings.map((booking) => (
        <li key={booking.id} className="border p-4 rounded-md">
          <Link
            href={`/booking/${booking.id}`}
            className="text-blue-600 hover:underline"
          >
            A Booking on {booking.date} starting at {booking.start_time}
          </Link>
        </li>
      ))}
    </ul>
  );
}
