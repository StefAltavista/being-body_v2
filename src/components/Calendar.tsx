import { useEffect, useState } from "react";
import getCalendar, { GoogleEvent } from "@/lib/getCalendar";
import { Grid, Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";

export const getDate = (event: GoogleEvent) => {
  const date = new Date(event.start!);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" }); // "Wednesday"
  const day = date.getDate().toString().padStart(2, "0"); // "17"
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // "09"
  const year = date.getFullYear().toString().slice(-2); // "25"

  // Only the string of the day is changed
  return `${dayOfWeek}-${day}/${month}/${year}`;
};

export default function Calendar({
  selectEvent,
}: {
  selectEvent: (x: GoogleEvent) => void;
}) {
  const [sortedDay, setSortedDay] = useState<string[]>();
  const [groupedByDay, setGroupedByDay] =
    useState<Record<string, GoogleEvent[]>>();
  const [loading, setLoading] = useState(false);

  const getAvailability = async () => {
    const events = await getCalendar();
    if (!events) return;

    const grouped = events.reduce(
      (acc, event) => {
        if (!event.start) return acc;

        const dateKey = getDate(event);

        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(event);

        return acc;
      },
      {} as Record<string, GoogleEvent[]>,
    );

    setGroupedByDay(grouped);

    const sortedByDay = Object.keys(grouped); // leave sorting as it was
    setSortedDay(sortedByDay);

    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getAvailability();
  }, []);

  return (
    <>
      {loading && (
        <div>
          <p>...Loading Availabilities</p>
        </div>
      )}
      {}
      <div className="w-full ">
        <h3>Heres my next availabilities for Massage sessions </h3>

        {sortedDay && (
          <Swiper
            className="w-[100%] bg-red-100 rounded "
            modules={[Grid, Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={1}
            slidesPerView={3}
            slidesPerGroup={3}
            grid={{
              rows: 3,
              fill: "row",
            }}
            navigation={true}
          >
            {sortedDay.map((day, idx) => (
              <SwiperSlide key={idx}>
                <div className="m-2 p-2  rounded bg-white">
                  <div>
                    <h3>{day.split("-")[0]}</h3>
                    <p>{day.split("-")[1]}</p>
                  </div>
                  <div className="flex flex-col">
                    {groupedByDay &&
                      groupedByDay[day].map((event) => (
                        <div
                          key={event.id}
                          className=" cursor-pointer bg-red-200 hover:bg-violet-200  rounded m-2 p-2 ml-0 flex justify-center"
                          onClick={() => selectEvent(event)}
                        >
                          <p>{event.start?.split("T")[1].slice(0, 5)}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <p>
          Feel free to chose what works best for you, if you need to adjust
          timings you can send me a message during reservation process
        </p>
      </div>
    </>
  );
}
