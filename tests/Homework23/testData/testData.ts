export const wrongTestData = [
  {
    name: "&!$",
    lastName: "&!$",
    email: "&!$",
    password: "&!$",
    reEnterPassword: "54321Wwrt",
  },
];

export const wrongLengthTestData = [
  {
    name: "a",
    lastName: "b",
  },
];

export const validTestData = [
  {
    name: "Ana",
    lastName: "Pas",
    email: "pasichnyk.nas23+" + Math.floor(Math.random() * 200) + "@gmail.com",
    password: "ABCabc!+89"+Math.floor(Math.random() * 200),
    reEnterPassword: "ABCabc!+89",
  },
];
