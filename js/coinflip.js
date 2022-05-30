document.querySelector("#clickMe").addEventListener("click", makeReq);

async function makeReq() {
  const playerChoice = document.querySelector("#playerChoice").value;
  console.log(`playerChoice: ${playerChoice}`);
  const res = await fetch(`/cf?choice=${playerChoice}`);
  const data = await res.json();

  console.log(data);
  document.querySelector("#computerChoice").textContent = data.computerChoice;
  let textResult = data.result === "lose" ? "YOU DIED" : "COMPUTER SLAIN";
  document.querySelector("#result").textContent = textResult;
}
