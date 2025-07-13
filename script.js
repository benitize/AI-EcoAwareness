function estimateImpact(promptText) {
  const tokenCount = Math.ceil(promptText.length / 4); // ~4 chars per token

  const energyPerTokenWh = 0.0005; // 0.5 mWh = 0.0005 Wh
  const energyUsedWh = tokenCount * energyPerTokenWh;

  const energyUsedkWh = energyUsedWh / 1000; // Convert to kWh
  const waterUsedLiters = energyUsedkWh * 1.8;
  const co2EmittedGrams = energyUsedkWh * 400;

  return {
    tokenCount,
    energyUsedWh: energyUsedWh * 1000, // Convert to milliWh for display
    waterUsedLiters,
    co2EmittedGrams
  };
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
