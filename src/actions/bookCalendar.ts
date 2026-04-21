"use server";
export default async function bookCalendar(event_id: string) {
  await fetch("http://localhost:3000/api/calendar/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_id,
      name: "Alice",
      email: "alice@example.com",
      notes: "Haircut, long",
    }),
  });
}
