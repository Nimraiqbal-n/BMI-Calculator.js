let bmiChart;

function createInitialChart() {
    const ctx = document.getElementById('bmiChart').getContext('2d');

    bmiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Underweight', 'Normal', 'Overweight', 'Obese'],
            datasets: [{
                label: 'BMI',
                data: [0, 0, 0, 0], // Start with zero values
                backgroundColor: ['#E0E0E0', '#E0E0E0', '#E0E0E0', '#E0E0E0'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50
                }
            }
        }
    });
}

function calculateBMI() {
    const gender = document.getElementById("gender").value;
    const weight = document.getElementById("weight").value;
    const heightCm = document.getElementById("height").value;
    
    if (weight && heightCm) {
        const heightM = heightCm / 100; // Convert height to meters
        const bmi = (weight / (heightM * heightM)).toFixed(2);
        const bmiPrime = (bmi / 25).toFixed(2);
        const ponderalIndex = (weight / (heightM ** 3)).toFixed(2);
        const minHealthyWeightKg = (18.5 * (heightM * heightM)).toFixed(2);
        const maxHealthyWeightKg = (25 * (heightM * heightM)).toFixed(2);
        const minHealthyWeightLbs = (minHealthyWeightKg * 2.20462).toFixed(1);
        const maxHealthyWeightLbs = (maxHealthyWeightKg * 2.20462).toFixed(1);

        let bmiMessage = "";

        if (bmi < 18.5) {
            bmiMessage = `Your BMI is ${bmi} (Underweight)`;
        } else if (bmi >= 18.5 && bmi < 24.9) {
            bmiMessage = `Your BMI is ${bmi} (Normal weight)`;
        } else if (bmi >= 25 && bmi < 29.9) {
            bmiMessage = `Your BMI is ${bmi} (Overweight)`;
        } else {
            bmiMessage = `Your BMI is ${bmi} (Obese)`;
        }

        document.getElementById("result").innerHTML = bmiMessage;

        document.getElementById("additional-info").innerHTML = `
            <p>Healthy BMI range: 18.5 - 25 kg/m²</p>
            <p>Healthy weight for the height: ${minHealthyWeightLbs} lbs - ${maxHealthyWeightLbs} lbs</p>
            <p>BMI Prime: ${bmiPrime}</p>
            <p>Ponderal Index: ${ponderalIndex} kg/m³</p>
        `;

        // Update the chart with the new BMI value
        updateChart(bmi);
    } else {
        document.getElementById("result").innerHTML = "Please enter valid values.";
        document.getElementById("additional-info").innerHTML = "";
    }
}

function updateChart(bmi) {
    bmiChart.data.datasets[0].data = [18.4, 24.9, 29.9, 40]; // Max limits of each category
    bmiChart.data.datasets[0].backgroundColor = [
        bmi < 18.5 ? '#FF6384' : '#E0E0E0',
        bmi >= 18.5 && bmi < 24.9 ? '#36A2EB' : '#E0E0E0',
        bmi >= 25 && bmi < 29.9 ? '#FFCE56' : '#E0E0E0',
        bmi >= 30 ? '#FF6384' : '#E0E0E0'
    ];
    bmiChart.update();
}


// Initialize the chart when the page loads
window.onload = createInitialChart;


