import React from 'react'
import { Bar } from "react-chartjs-2"

const Chart = ({ features }) => {
    const audioFeatures = [
        `${features.acousticness}`,
        `${features.danceability}`,
        `${features.energy}`,
        `${features.instrumentalness}`,
        `${features.liveness}`,
        `${features.speechiness}`,
        `${features.valence}`,
    ]
    const audioFeatureLabels = [
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "speechiness",
        "valence"
    ]
    const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ]
    const borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ]

    const data = {
        labels: audioFeatureLabels,
        datasets: [
            {
                label: ``,
                data: audioFeatures,
                fill: false,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ],
            xAxes: [
                {
                    gridLines: {
                        color: "red",
                    },
                    ticks: {
                        beginAtZero: true
                    },

                }
            ]
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Audio Features',
                color: 'rgba(255, 255, 255)',
                font: {
                    size: 24
                }
            }
        }

    }

    return (
        <div>
            <Bar height={200} width={300} data={data} options={options} />
        </div>
    )
}

export default Chart
