import numeral from "numeral";

function greetings() {
  const time = new Date().getUTCHours();
  if (time >= 0 && time < 12) {
    return "Good Morning";
  }
  if (time >= 12 && time < 17) {
    return "Good Afternoon";
  }
  return "Good Evening";
}

function money(n: any, d = 2) {
  return d === 2 ? numeral(n).format("0,0.00") : numeral(n).format("0,0.000");
}

export { greetings, money };
