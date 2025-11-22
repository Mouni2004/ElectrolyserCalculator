<!-- script.js -->
const Electrolyser_Technology = document.getElementById('Electrolyser_Technology');
const Electrolyser_Capacity_Value = document.getElementById('Electrolyser_Capacity_Value');
const Electrolyser_Capacity_Unit = document.getElementById('Electrolyser_Capacity_Unit');
const Specific_Power_Consumption = document.getElementById('Specific_Power_Consumption');
const Electrolyser_Operating_Time = document.getElementById('Electrolyser_Operating_Time');

// Fixed values (hidden)
const lowerHeatingValueOfHydrogen = 33.322;
const hydrogenDensity = 0.08988;
const oxygenDensity = 1.429;

// OUTPUT elements
const Electrolyser_Efficiency = document.getElementById('Electrolyser_Efficiency');
const Hydrogen_Production_Rate_Per_Hour_Nm3 = document.getElementById('Hydrogen_Production_Rate_Per_Hour_Nm3');
const Hydrogen_Production_Rate_Per_Hour_Kg = document.getElementById('Hydrogen_Production_Rate_Per_Hour_Kg');
const Oxygen_Production_Rate_Per_Hour_Nm3 = document.getElementById('Oxygen_Production_Rate_Per_Hour_Nm3');
const Oxygen_Production_Rate_Per_Hour_Kg = document.getElementById('Oxygen_Production_Rate_Per_Hour_Kg');
const Water_Consumed_by_Stack_Per_Hour_Kg = document.getElementById('Water_Consumed_by_Stack_Per_Hour_Kg');
const Hydrogen_Production_Rate_Per_Day_Nm3 = document.getElementById('Hydrogen_Production_Rate_Per_Day_Nm3');
const Hydrogen_Production_Rate_Per_Day_Kg = document.getElementById('Hydrogen_Production_Rate_Per_Day_Kg');
const Oxygen_Production_Rate_Per_Day_Nm3 = document.getElementById('Oxygen_Production_Rate_Per_Day_Nm3');
const Oxygen_Production_Rate_Per_Day_Kg = document.getElementById('Oxygen_Production_Rate_Per_Day_Kg');
const Water_Consumed_by_Stack_Per_Day_Kg = document.getElementById('Water_Consumed_by_Stack_Per_Day_Kg');

function formatNumber(number, decimals = 3) {
    if (!isFinite(number)) return '--';
    return Number(number.toFixed(decimals)).toLocaleString();
}

function performCalculations() {
    const capacityValue = parseFloat(Electrolyser_Capacity_Value.value) || 0;
    const capacityUnit = Electrolyser_Capacity_Unit.value;
    const specificPowerConsumption = parseFloat(Specific_Power_Consumption.value) || 0;
    const operatingTime = parseFloat(Electrolyser_Operating_Time.value) || 0;

    const capacityKW = (capacityUnit === 'MW') ? capacityValue * 1000 : capacityValue;

    // Efficiency
    const efficiency = (lowerHeatingValueOfHydrogen / specificPowerConsumption) * 100;
    Electrolyser_Efficiency.textContent = formatNumber(efficiency, 3);

    // 1 kg H2 = 11.126 Nm³
    const h2Nm3PerKg = 11.126;

    const h2KgHr = capacityKW / specificPowerConsumption;
    const h2Nm3Hr = h2KgHr * h2Nm3PerKg;

    const o2Nm3Hr = h2Nm3Hr / 2;
    const o2KgHr = o2Nm3Hr * oxygenDensity;

    const waterKgHr = h2Nm3Hr;

    Hydrogen_Production_Rate_Per_Hour_Kg.textContent = formatNumber(h2KgHr);
    Hydrogen_Production_Rate_Per_Hour_Nm3.textContent = formatNumber(h2Nm3Hr);

    Oxygen_Production_Rate_Per_Hour_Nm3.textContent = formatNumber(o2Nm3Hr);
    Oxygen_Production_Rate_Per_Hour_Kg.textContent = formatNumber(o2KgHr);

    Water_Consumed_by_Stack_Per_Hour_Kg.textContent = formatNumber(waterKgHr);

    Hydrogen_Production_Rate_Per_Day_Kg.textContent = formatNumber(h2KgHr * operatingTime);
    Hydrogen_Production_Rate_Per_Day_Nm3.textContent = formatNumber(h2Nm3Hr * operatingTime);

    Oxygen_Production_Rate_Per_Day_Nm3.textContent = formatNumber(o2Nm3Hr * operatingTime);
    Oxygen_Production_Rate_Per_Day_Kg.textContent = formatNumber(o2KgHr * operatingTime);

    Water_Consumed_by_Stack_Per_Day_Kg.textContent = formatNumber(waterKgHr * operatingTime);
}

// Event listeners
[
    Electrolyser_Technology,
    Electrolyser_Capacity_Value,
    Electrolyser_Capacity_Unit,
    Specific_Power_Consumption,
    Electrolyser_Operating_Time
].forEach(el => el.addEventListener('input', performCalculations));

window.addEventListener('load', performCalculations);