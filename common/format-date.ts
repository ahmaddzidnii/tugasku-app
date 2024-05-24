import moment from "moment";
import "moment/locale/id";

interface Options {
  showTime?: boolean;
  date: Date;
  showYear?: boolean;
  locale?: "id" | "en";
}
export const formatDate = ({
  showTime = true,
  date = new Date(),
  showYear = true,
  locale = "en",
}: Options) => {
  if (!showTime) {
    return moment(date)
      .locale(locale)
      .format(`ddd, DD MMM ${showYear ? "YYYY" : ""}`);
  }

  return moment(date)
    .locale(locale)
    .format(`ddd, DD MMMM ${showYear ? "YYYY" : ""}, h:mm a`);
};
