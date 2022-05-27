document.querySelector("#clickMe").addEventListener("click", makeReq);

async function makeReq() {
  const playerChoice = document.querySelector("#rpsChoice").value;
  const res = await fetch(`/rps?choice=${playerChoice}`);
  const data = await res.json();

  console.log(data);
  document.querySelector("#computerChoice").textContent = data.computerChoice;
  document.querySelector("#result").textContent = data.result;
}
