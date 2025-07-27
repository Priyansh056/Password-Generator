// --- Start of existing Password Generator code ---
const passwordDisplay = document.getElementById('passwordDisplay');
const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function generatePassword() {
    let characterPool = '';
    if (uppercaseCheckbox.checked) characterPool += uppercaseChars;
    if (lowercaseCheckbox.checked) characterPool += lowercaseChars;
    if (numbersCheckbox.checked) characterPool += numberChars;
    if (symbolsCheckbox.checked) characterPool += symbolChars;

    if (characterPool === '') {
        alert('Please select at least one character type.');
        return;
    }

    let password = '';
    const length = parseInt(lengthInput.value, 10);
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }
    passwordDisplay.value = password;
}

function copyPassword() {
    if (passwordDisplay.value === '') {
        alert('Nothing to copy. Please generate a password first.');
        return;
    }
    navigator.clipboard.writeText(passwordDisplay.value).then(() => {
        alert('Password copied to clipboard!');
    });
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
// --- End of existing Password Generator code ---


// --- New Battery Status Code ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if the Battery Status API is supported
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const batteryLevel = document.getElementById('battery-level');
            const batteryPercentage = document.getElementById('battery-percentage');

            function updateBatteryUI() {
                // Update percentage text
                const level = Math.floor(battery.level * 100);
                batteryPercentage.textContent = `${level}%`;

                // Update the width of the battery level bar
                batteryLevel.style.width = `${level}%`;

                // Update color based on level and charging status
                batteryLevel.classList.remove('high', 'medium', 'low', 'charging');

                if (battery.charging) {
                    batteryLevel.classList.add('charging');
                } else if (level > 50) {
                    batteryLevel.classList.add('high');
                } else if (level > 20) {
                    batteryLevel.classList.add('medium');
                } else {
                    batteryLevel.classList.add('low');
                }
            }

            // Initial update
            updateBatteryUI();

            // Add event listeners for changes
            battery.addEventListener('levelchange', updateBatteryUI);
            battery.addEventListener('chargingchange', updateBatteryUI);
        });
    } else {
        // Hide the battery indicator if the API is not supported
        const batteryIndicator = document.getElementById('battery-indicator');
        if (batteryIndicator) {
            batteryIndicator.style.display = 'none';
        }
        console.log("Battery Status API is not supported in this browser.");
    }
});
