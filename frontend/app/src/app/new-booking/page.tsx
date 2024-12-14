import BookingForm from "@/components/BookingForm";

export default function NewBooking() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Booking</h1>
      <BookingForm />
    </div>
  );
}
