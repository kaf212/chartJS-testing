// setup
const id742Value = []
const id735Value = []

fetch('./output.json')
    .then(response => response.json())
    .then(data => {
        data.ID742.data.forEach(item => {
            id742Value.push({ x: item.ts, y: item.value });
        })
        data.ID735.data.forEach(item => {
            id735Value.push({ x: item.ts, y: item.value });
        })

        myChart2.data.datasets[0].data = id742Value
        myChart2.data.datasets[1].data = id735Value
        myChart2.update();
    })
    .catch(error => console.error('Error fetching JSON:', error));


// Config for the chart
const data2 = {
    datasets: [{
        label: 'Zählerstand Verbrauch',
        data: [], // Initially empty; will be updated later
        backgroundColor: [
            'rgba(26,99,255,0.2)'
        ],
        borderColor: [
            'rgba(26,99,255, 1)',
        ],
        borderWidth: 1
    }, {
        label: 'Zählerstand Einspeisung',
        data: [], // Initially empty; will be updated later
        backgroundColor: [
            'rgba(26,221,255,0.2)'
        ],
        borderColor: [
            'rgba(26,221,255, 1)',
        ],
        borderWidth: 1
    }]
};

// config
const config2 = {
    type: 'line',
    data: data2,
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
                max: 100000
            }
        }
    }
};

// render init block
const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
);


// Assign Chart.js version
//chartVersion.innerText = Chart.version;
