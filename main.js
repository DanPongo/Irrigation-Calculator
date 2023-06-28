document.getElementById('irrigation-form').addEventListener('submit', function(event){
    event.preventDefault(); // Prevents the form from submitting and reloading the page
    
    // Get user inputs
    const fieldArea = document.getElementById('fieldArea').value;
    const geographicArea = document.getElementById('geographicArea').value;
  
    // Calculate water consumption per year
    let annualWaterConsumption = 1000 / 1000 * fieldArea; // water needed for 1 year
  
    // Increase water consumption based on geographic area
    if (geographicArea === "Central") {
      annualWaterConsumption *= 1.10; // Increase by 10%
    } else if (geographicArea === "South") {
      annualWaterConsumption *= 1.20; // Increase by 20%
    }
  
    // Define the names of the months
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Create a map for the increase in water consumption for each month
    const monthIncrease = {
      "April": 0.20,
      "May": 0.20,
      "June": 0.80,
      "July": 0.80,
      "August": 0.65,
      "September": 0.65,
      "October": 0.30
    };
  
    // Calculate the cost per cubic meter
    const waterPrice = 9.059;
  
    // Populate the table
    const resultTable = document.getElementById('resultTable');
    
    // Clear any existing rows in the table
    resultTable.innerHTML = '';
  
    // Create table header row
    let headerRow = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    th1.innerText = "Month";
    th2.innerText = "Total Cubic Water (in cubic meters)";
    th3.innerText = "Price (in ILS)";
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    headerRow.appendChild(th3);
    resultTable.appendChild(headerRow);
    
    // Create table data for each month
    for(let i = 0; i < months.length; i++){
      let monthlyWaterConsumption = annualWaterConsumption / 12;
  
      // Increase water consumption based on the month
      if (months[i] in monthIncrease) {
        monthlyWaterConsumption *= (1 + monthIncrease[months[i]]);
      }
      
      // Calculate the cost per month
      const monthlyCost = monthlyWaterConsumption * waterPrice;
  
      let row = document.createElement('tr'); // create a new row
      let td1 = document.createElement('td'); // create the first column
      let td2 = document.createElement('td'); // create the second column
      let td3 = document.createElement('td'); // create the third column
  
      td1.innerText = months[i]; // first column is the name of the month
      td2.innerText = monthlyWaterConsumption.toFixed(2); // second column is the water consumption
      td3.innerText = monthlyCost.toFixed(2); // third column is the cost
      
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
  
      resultTable.appendChild(row);
    }
  });
  