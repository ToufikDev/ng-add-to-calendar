/**
 * Downloads the given ics. Meant to be used only for Safari.
 */
export const safariFileSave = (data: string, fileName: string) => {
  const anchor = document.createElement("a");
  const encodedData = encodeURIComponent(data);

  anchor.setAttribute(
    "href",
    `data:text/calendar;charset=utf-8,${encodedData}`
  );
  anchor.setAttribute("download", fileName);

  if (document.createEvent) {
    const event = document.createEvent("MouseEvents");

    event.initEvent("click", true, true);
    anchor.dispatchEvent(event);
  } else {
    anchor.click();
  }
};
