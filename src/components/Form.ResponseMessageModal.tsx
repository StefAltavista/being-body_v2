import Modal from "./Modal";

export default function ResponseMessageModal({
  setDone,
  result,
  close,
}: {
  result: { success: boolean; message: string };
  close: () => void;
  setDone: (x: boolean) => void;
}) {
  return (
    <Modal close={close} color={"white"}>
      <div className="w-full h-full flex items-center justify-center p-6">
        <div
          className={`w-full max-w-[520px] rounded-3xl border shadow-xl p-8 text-center ${
            result.success
              ? "bg-white border-emerald-200"
              : "bg-white border-rose-200"
          }`}
        >
          <div className="flex justify-center mb-5">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${
                result.success
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-rose-100 text-rose-500"
              }`}
            >
              {result.success ? "✓" : ":/"}
            </div>
          </div>

          <h2
            className={`text-2xl font-semibold mb-3 ${
              result.success ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {result.success ? "Thank you" : "Something went wrong"}
          </h2>

          <p className="text-base leading-7 text-slate-700 mb-6">
            {result.success
              ? "Your message has been sent successfully. Thank you for reaching out — I will get back to you as soon as possible."
              : "Sorry, your message could not be sent right now. Please try again in a moment, or contact me directly if the problem continues."}
          </p>

          <div
            className={`rounded-2xl px-4 py-3 mb-6 text-sm ${
              result.success
                ? "bg-emerald-50 text-emerald-800"
                : "bg-rose-50 text-rose-800"
            }`}
          >
            {result.message}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={close}
              className={`cursor-pointer rounded-xl px-5 py-3 font-medium transition ${
                result.success
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-rose-500 text-white hover:bg-rose-600"
              }`}
            >
              {result.success ? "Done" : "Close"}
            </button>

            {!result.success && (
              <button
                type="button"
                onClick={() => setDone(false)}
                className="cursor-pointer rounded-xl px-5 py-3 font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
