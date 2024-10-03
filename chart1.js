// setup
const id742Usage = []
const id735Usage = []

fetch('./output.json')
    .then(response => response.json())
    .then(data => {
        data.ID742.data.forEach(item => {
            id742Usage.push({ x: item.ts, y: item.usage });
        })
        data.ID735.data.forEach(item => {
            id735Usage.push({ x: item.ts, y: item.usage });
        })

        myChart.data.datasets[0].data = id742Usage
        myChart.data.datasets[1].data = id735Usage

        dateFilter("month", 1)

        myChart.update();
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Config for the chart
const data = {
    datasets: [{
        label: 'Verbrauch',
        data: [], // Initially empty; will be updated later
        backgroundColor: [
            'rgba(255, 26, 104, 0.2)'
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

function dateFilter(unit, targetChart) {
    const newestDate = getNewestDate()
    let target = myChart
    if (targetChart === 2) {target = myChart2}
    if (unit === "hour") {
// Create a copy of newestDate before modifying it
        const prevHour = new Date(newestDate.getTime())
        prevHour.setHours(prevHour.getHours() - 1)
        target.config.options.scales.x.time.unit = "minute"
        target.config.options.scales.x.min = prevHour
        target.config.options.scales.x.max = newestDate
        target.update();
    } else if (unit === "day") {
        const yesterday = new Date(newestDate.getTime())
        yesterday.setDate(yesterday.getDate() - 1)
        target.config.options.scales.x.time.unit = "hour"
        target.config.options.scales.x.min = yesterday
        target.config.options.scales.x.max = newestDate
    } else if (unit === "month") {
        const lastMonth = new Date(newestDate.getTime())
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        target.config.options.scales.x.time.unit = "day"
        console.log(lastMonth)
        console.log(newestDate)
        target.config.options.scales.x.min = lastMonth
        target.config.options.scales.x.max = newestDate
    } else if (unit === "year") {
        const lastYear = new Date(newestDate.getTime())
        lastYear.setFullYear(lastYear.getFullYear() - 1)
        target.config.options.scales.x.time.unit = "year"
        target.config.options.scales.x.min = lastYear
        target.config.options.scales.x.max = newestDate
    }
    else if (unit === "max") {
        target.config.options.scales.x.time.unit = "year"
        target.config.options.scales.x.min = undefined
        target.config.options.scales.x.max = undefined
    }
    target.update()
}

