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

function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/;
  return regex.test(email) && email.trim().length > 0;
}

function validatePassword(password: string): boolean {
  return password.length >= 8 && password.trim().length > 0;
}

function validateMatchPassword(
  password: string,
  confirmPassword: string
): boolean {
  return password.trim() === confirmPassword.trim();
}

export {
  greetings,
  money,
  validateEmail,
  validatePassword,
  validateMatchPassword,
};
