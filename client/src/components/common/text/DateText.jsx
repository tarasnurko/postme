import React from "react";
import { formatDate } from "../../../utils/formatDate";

const DateText = ({ date }) => {
  return <p className="text-xs text-zinc-400">{formatDate(date)}</p>;
};

export default DateText;
