document.addEventListener('DOMContentLoaded', () => {
    const generateGraphsButton = document.getElementById('generate-graphs');
    const currentBalanceElement = document.getElementById('current-balance');

    generateGraphsButton.addEventListener('click', () => {
        const monthsForms = document.querySelectorAll('.month-form');
        const monthsData = [];

        // Loop through each month form to collect data
        monthsForms.forEach(monthForm => {
            const descriptionIncome = monthForm.querySelector('.description.income').value;
            const amountIncome = parseFloat(monthForm.querySelector('.amount.income').value);
            const estimatedIncome = parseFloat(monthForm.querySelector('.estimated-income').value);

            const descriptionExpense = monthForm.querySelector('.description.expense').value;
            const amountExpense = parseFloat(monthForm.querySelector('.amount.expense').value);
            const estimatedExpense = parseFloat(monthForm.querySelector('.estimated-expense').value);

            // Calculating balance for the month
            const balance = amountIncome - amountExpense;

            // Push data for the month into monthsData array
            monthsData.push({
                descriptionIncome,
                amountIncome,
                estimatedIncome,
                descriptionExpense,
                amountExpense,
                estimatedExpense,
                balance
            });
        });

        // Extracting data for each category (income, expense, balance) from monthsData
        const incomes = monthsData.map(month => month.amountIncome);
        const expenses = monthsData.map(month => month.amountExpense);
        const balances = monthsData.map(month => month.balance);
        
        // Calculating the total balance (saldo atual)
        const totalBalance = balances.reduce((acc, curr) => acc + curr, 0);

        // Update the current balance display
        currentBalanceElement.textContent = `R$ ${totalBalance.toFixed(2)}`;

        // Call a function to generate the charts with the collected data
        generateCharts(incomes, expenses, balances);
    });

    function generateCharts(incomes, expenses, balances) {
        const labels = ['Mês 1', 'Mês 2', 'Mês 3']; // Labels for x-axis

        // Creating bar chart for incomes
        const incomeChartCtx = document.getElementById('revenue-chart').getContext('2d');
        new Chart(incomeChartCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Receitas',
                    data: incomes,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        // Creating bar chart for expenses
        const expenseChartCtx = document.getElementById('expense-chart').getContext('2d');
        new Chart(expenseChartCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Despesas',
                    data: expenses,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red color
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        // Creating line chart for balances
        const balanceChartCtx = document.getElementById('balance-chart').getContext('2d');
        new Chart(balanceChartCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Saldo Mensal',
                    data: balances,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)', // Green color
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
});
