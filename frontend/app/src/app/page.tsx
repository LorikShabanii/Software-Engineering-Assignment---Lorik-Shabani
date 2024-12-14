import BookingsList from "@/components/BookingList";
import Link from "next/link";

async function getBookings() {
  const res = await fetch("http://host.docker.internal:5000/api/bookings", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div>
      <h1>Current booking count: {bookings.length}</h1>
      <Link
        href="/new-booking"
        className="mb-4 inline-block bg-green-500 text-white px-4 py-2 rounded"
      >
        Create New Booking
      </Link>
      <BookingsList bookings={bookings} />
    </div>
  );
};

export default Home;
