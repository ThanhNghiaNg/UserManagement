export const serverURL = "http://localhost:8000";

export const cvtStrToDate = (str) => {
  const [time, date] = str.split(" ");
  return new Date(date.split("/").reverse().join("-") + " " + time);
};
