// setup
const id742Usage = [];

fetch('./output.json')
    .then(response => response.json())
    .then(data => {
        data.ID742.data.forEach(item => {
            id742Usage.push({ x: item.ts, y: item.usage });
        });

        // Now that the data is fetched, update the chart
        myChart.data.datasets[0].data = id742Usage;
        myChart.update(); // Update the chart to reflect new data
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Config for the chart
const data = {
    datasets: [{
        label: 'Verbrauch',
        data: [], // Initially empty; will be updated later
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
    },{
        label: "Einspeisung",
        data: [],
        backgroundColor: [
            "rgba(0, 255, 0, 0.2)"
        ],
        borderColor: [
            'rgba(0, 255, 0, 1)',

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
                    unit: "year"
                }
            },
            y: {
                min: 0,
                max: 350
            }
        }
    }
};

// render init block
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

function getNewestDate() {
    let newest = undefined
    id742Usage.forEach(item => {
        const currentDate = new Date(item.x)
        if (newest === undefined || new Date(item.x) > newest) {
            newest = currentDate
        }
    });
    return newest
}

function dateFilter(unit) {
    const newestDate = getNewestDate()
    if (unit === "hour") {
// Create a copy of newestDate before modifying it
        const prevHour = new Date(newestDate.getTime())
        prevHour.setHours(prevHour.getHours() - 1)
        myChart.config.options.scales.x.time.unit = "minute"
        myChart.config.options.scales.x.min = prevHour
        myChart.config.options.scales.x.max = newestDate
        myChart.update();
    } else if (unit === "day") {
        const yesterday = new Date(newestDate.getTime())
        yesterday.setDate(yesterday.getDate() - 1)
        myChart.config.options.scales.x.time.unit = "hour"
        myChart.config.options.scales.x.min = yesterday
        myChart.config.options.scales.x.max = newestDate
    } else if (unit === "month") {
        const lastMonth = new Date(newestDate.getTime())
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        myChart.config.options.scales.x.time.unit = "day"
        console.log(lastMonth)
        console.log(newestDate)
        myChart.config.options.scales.x.min = lastMonth
        myChart.config.options.scales.x.max = newestDate
    } else if (unit === "year") {
        const lastYear = new Date(newestDate.getTime())
        lastYear.setFullYear(lastYear.getFullYear() - 1)
        myChart.config.options.scales.x.time.unit = "year"
        myChart.config.options.scales.x.min = lastYear
        myChart.config.options.scales.x.max = newestDate
    }
    else if (unit === "max") {
        myChart.config.options.scales.x.time.unit = "year"
        myChart.config.options.scales.x.min = undefined
        myChart.config.options.scales.x.max = undefined
    }
    myChart.update()
}

// Assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
//chartVersion.innerText = Chart.version;
