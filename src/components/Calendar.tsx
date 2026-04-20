import { useEffect, useState } from "react";
import getCalendar, { GoogleEvent } from "@/lib/getCalendar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Calendar({ selectEvent }) {
  const [sortedDay, setSortedDay] = useState();
  const [groupedByDay, setGroupedByDay] = useState();
  const [inViewArray, setInViewArray] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getAvailability = async () => {
    const events = await getCalendar();
    if (!events) return;

    const grouped = events.reduce((acc, event) => {
      if (!event.start) return acc;

      const date = new Date(event.start);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" }); // "Wednesday"
      const day = date.getDate().toString().padStart(2, "0"); // "17"
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // "09"
      const year = date.getFullYear().toString().slice(-2); // "25"

      // Only the string of the day is changed
      const dateKey = `${dayOfWeek}-${day}/${month}/${year}`;

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);

      return acc;
    }, {} as Record<string, GoogleEvent[]>);

    setGroupedByDay(grouped);

    const sortedByDay = Object.keys(grouped); // leave sorting as it was
    setSortedDay(sortedByDay);

    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getAvailability();
  }, []);
  useEffect(() => {
    if (!sortedDay) return;
    setInViewArray(sortedDay.slice(page, page + 5));
  }, [sortedDay, page]);

  return (
    <>
      {loading && (
        <div>
          <p>...Loading</p>
        </div>
      )}
      {}
      <div className="">
        {sortedDay && (
          <Swiper
            className="w-[60vw] bg-red-100 rounded "
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={1}
            slidesPerView={5}
            navigation={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {sortedDay.map((day, idx) => (
              <SwiperSlide key={idx}>
                <div className="m-2 p-2  rounded bg-white">
                  <div>
                    <h3>{day.split("-")[0]}</h3> <p>{day.split("-")[1]}</p>
                  </div>
                  <div className="flex flex-col">
                    {groupedByDay[day].map((event) => (
                      <div
                        key={event.id}
                        className=" bg-red-200 hover:bg-violet-200  rounded m-2 p-2 ml-0 flex justify-center"
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
      </div>
    </>
  );
}
