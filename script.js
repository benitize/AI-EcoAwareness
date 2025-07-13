function estimateImpact(promptText) {
  const tokenCount = Math.ceil(promptText.length / 4); // Rough estimate
  const energyPerTokenWh = 0.0005;
  const waterPerKWh = 1.8;
  const co2PerKWh = 400;

  const energyUsed = tokenCount * energyPerTokenWh;
  const waterUsed = (energyUsed / 1000) * waterPerKWh;
  const co2Emitted = (energyUsed / 1000) * co2PerKWh;

  return { energyUsed, waterUsed, co2Emitted, tokenCount };
}

function handlePrompt() {
  const promptText = document.getElementById("promptInput").value;
  const ecoEnabled = document.getElementById("ecoToggle").checked;

  if (ecoEnabled) {
    const { energyUsed, waterUsed, co2Emitted } = estimateImpact(promptText);

    const stats = `
      🌍 <strong>Eco Impact of Your Query:</strong><br>
      • Energy Used: ${energyUsed.toFixed(3)} Wh<br>
      • Water Used: ${waterUsed.toFixed(3)} L<br>
      • CO₂ Emitted: ${co2Emitted.toFixed(2)} g
    `;

    const ecoStatsDiv = document.getElementById("ecoStats");
    ecoStatsDiv.innerHTML = stats;
    ecoStatsDiv.style.display = "block";

    // Ask for confirmation
    setTimeout(() => {
      const confirmSubmit = confirm("Do you want to submit this prompt?");
      if (confirmSubmit) {
        alert("Prompt submitted!");
      } else {
        alert("Submission canceled.");
      }
    }, 200);
  } else {
    alert("Eco-awareness mode is off. Prompt submitted without impact check.");
  }
}
