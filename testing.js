const parkingData = [
  [true, true, true],
  [true, true, false],
  [false, true, false],
  [true, true, false],
];

function generateAlphabet() {
  const alphabet = [];
  for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  return alphabet;
}

for (let index = 0; index < parkingData.length; index++) {
  const element = parkingData[index];
  col(generateAlphabet()[index], element);
}

function col(letter, data) {
  //letter = "A"
  //data = [true,false,true]
  // console.log(letter);
  for (let index = 0; index < data.length; index++) {
    const number = index < 10 ? `0${index}` : `${index}`;
    console.log(`${letter}${number} - ${data[index]}`);
  }
}
