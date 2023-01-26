import moment from "moment";

export const formatDate = (date) => {
  const now = moment(new Date());
  const then = moment(date);
  return then.from(now);
};
