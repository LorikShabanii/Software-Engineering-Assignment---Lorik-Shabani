import Link from "next/link";

async function getBooking(id: string) {
  const res = await fetch(
    `http://host.docker.internal:5000/api/bookings/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch booking");
  }
  return res.json();
}

export default async function BookingDetail({
  params,
}: {
  params: { id: string };
}) {
  const booking = await getBooking(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <p>This Booking is with {booking.doctor_name}</p>
      <p>For {booking.service}</p>
      <p>It ends on {booking.end_time}</p>
      <Link
        href="/"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
}
