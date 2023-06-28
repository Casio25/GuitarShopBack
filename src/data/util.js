/* eslint-disable prettier/prettier */
export const shuffle = (a) => {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export const RandomNaturalNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}
export const RandomNaturalNumberStep = (min, max, step) => {
  return Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
};

export const RandomSymbols = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomNumber = () => Math.floor(Math.random() * 10);

  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const randomNumbers = [randomNumber(), randomNumber()];

  return `${randomLetter}${randomNumbers[0]}${randomNumbers[1]}`;
};

export const sortUp = (data) => {
  return data.sort((a, b) => a - b);
}

export const sortDown = (data) => {
  return data.sort((a, b) => b - a)
}