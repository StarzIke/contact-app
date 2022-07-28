export const users = [
  {
    id: 1,
    email: "toluandfemi@gmail.com",
    passwordHash:
      "$2b$10$5zfCRVKUOWZ1OCDq5Cu.C.RHm84cMP4ArATkZNU/ka8Wot4ysctai",
  },
];

export function uservalue(email) {
  return users.find((item) => item.email === email);
}

export function userExists(email) {
  return users.some(function (el) {
    return el.email === email;
  });
}
