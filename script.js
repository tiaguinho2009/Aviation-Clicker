let gameData = {
    money: 0,
    moneyPerClick: 1,
    upgrades: baseGameData.upgrades.map((upgrade) => ({ ...upgrade, level: 0 })), // Adiciona o nível inicial de cada upgrade
};

// Elementos do DOM
const moneyDisplay = document.getElementById("money-display");
const clickButton = document.getElementById("click-button");
const upgradeList = document.getElementById("upgrade-list");
const clickPowerDisplay = document.createElement("p");
clickPowerDisplay.id = "click-power-display";
clickButton.insertAdjacentElement("afterend", clickPowerDisplay);

// Atualizar o dinheiro mostrado
function updateMoneyDisplay() {
    moneyDisplay.textContent = Math.floor(gameData.money); // Arredondar para o inteiro mais próximo
}

// Atualizar o poder de clique mostrado
function updateClickPowerDisplay() {
    clickPowerDisplay.textContent = `Money per click: €${gameData.moneyPerClick}`;
}

// Função para clicar no botão principal
clickButton.addEventListener("click", () => {
    gameData.money += gameData.moneyPerClick;
    updateMoneyDisplay();
});

// Renderizar a lista de upgrades
function renderUpgrades() {
    upgradeList.innerHTML = ""; // Limpar lista de upgrades
    gameData.upgrades.forEach((upgrade, index) => {
        // Mostrar apenas upgrades que o usuário pode comprar ou já comprou
        //if (upgrade.level >= 1 || gameData.money >= Math.floor(upgrade.cost)) {
            const upgradeDiv = document.createElement("div");
            upgradeDiv.className = "upgrade";
            upgradeDiv.innerHTML = `
                <h3>${upgrade.name}</h3>
                <p>Cost: €<span id="cost-${index}">${Math.floor(upgrade.cost)}</span></p>
                <p>Effect: +${upgrade.effect} money per click</p>
                <p>Level: <span id="level-${index}">${upgrade.level}</span></p>
                <button onclick="buyUpgrade(${index})" ${gameData.money < Math.floor(upgrade.cost)}>Buy</button>
            `;
            upgradeList.appendChild(upgradeDiv);
        //}
    });
}

// Comprar um upgrade
function buyUpgrade(index) {
    const upgrade = gameData.upgrades[index];
    if (gameData.money >= Math.floor(upgrade.cost)) {
        gameData.money -= Math.floor(upgrade.cost);
        gameData.moneyPerClick += upgrade.effect;
        upgrade.cost *= upgrade.costMultiplier;
        upgrade.level++; // Incrementar o nível
        updateMoneyDisplay();
        updateClickPowerDisplay();
        renderUpgrades();
    } else {
        alert("Not enough money!");
    }
}

// Inicializar
renderUpgrades();
updateMoneyDisplay();
updateClickPowerDisplay();