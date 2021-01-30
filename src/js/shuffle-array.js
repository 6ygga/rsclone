export default function shuffleArray(array) {
  const newArray = array;

  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    const arrayJ = newArray[j];
    const arrayI = newArray[i];

    newArray[i] = arrayJ;
    newArray[j] = arrayI;
  }

  return newArray;
}
