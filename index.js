// setup
const testData = [];
const startDate = new Date("2022-01-01T00:00:00");
const endDate = new Date(); // Today's date

for (let dt = startDate; dt <= endDate; dt.setMinutes(dt.getMinutes() + 15)) {
    testData.push({ x: new Date(dt), y: Math.floor(Math.random() * 10) + 1 });
}

const data = {
    datasets: [{
        label: 'Weekly Sales',
        data: testData,
        backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
            'rgba(255, 26, 104, 1)',
        ],
        borderWidth: 1
    }]
};

// config
const config = {
    type: 'line',
    data,
    options: {
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day"
                }
            },
            y: {
                min: 0,
                max: 20
            }
        }
    }
};

// render init block
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

function dateFilter(unit) {
    myChart.config.options.scales.x.time.unit = unit
    if (unit === "hour") {
        const prevHour = new Date(new Date().setHours(new Date().getHours() - 1));
        myChart.config.options.scales.x.time.unit = "minute"
        myChart.config.options.scales.x.min = prevHour
        myChart.config.options.scales.x.max = new Date()
        myChart.update()
    }
    else if (unit === "day") {
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        myChart.config.options.scales.x.time.unit = "hour"
        myChart.config.options.scales.x.min = yesterday
        myChart.config.options.scales.x.max = new Date()
        myChart.update()
    }
    else if (unit === "month") {
        const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1));
        myChart.config.options.scales.x.time.unit = "day"
        myChart.config.options.scales.x.min = lastMonth
        myChart.config.options.scales.x.max = new Date()
        myChart.update()
    }
    else if (unit === "year") {
        const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        myChart.config.options.scales.x.time.unit = "year"
        myChart.config.options.scales.x.min = lastYear
        myChart.config.options.scales.x.max = new Date()
        myChart.update()
    }
    myChart.update()
}

// Instantly assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
//chartVersion.innerText = Chart.version;