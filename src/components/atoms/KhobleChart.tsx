import { Box } from '@mui/material';
import React from 'react';
import { LineChart, Line, Bar, BarChart, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

export default function KhobleChart({ size, chartType, color, dataKeys, data }: any) {
    // Constants and variables:
    // Dynamic components:
    // Labels:
    var L1ComponentLabel: any; // Parent chart component label
    var L2ComponentLabel: any; // 1st-order child chart component label

    // Arrays:
    var configurationComponents: JSX.Element[] = []; // Used to store and render all those recharts components that modify the chart configuration
    var L2Components: JSX.Element[] = [] // Used to store and render L2 components
    var L3Components: JSX.Element[] = []; // 2nd-order child component (pie charts)

    // Component props:
    var L1ComponentProps = chartType === "percent"? {} : { data: data }; // Every L1 component has to have a data property (except pie charts)
    var L2ComponentProps = {};

    // Sizing variables
    // Values for medium cards:
    var L1ComponentWidth = 275;
    var L1ComponentHeight = 80;
    var scalingRatio; // How much the chart dimensions will grow

    // Configuration by size:
    switch (size) {
        case 's':
            return null; // Render nothing for small cards

        case 'm':
            scalingRatio = 1;
            break;
        case 'l':
            scalingRatio = 3.2;
            break;
        default:
            return null;
    }

    L1ComponentProps = { ...L1ComponentProps, ...{ height: L1ComponentHeight * scalingRatio, width: L1ComponentWidth * scalingRatio } } // creation of parent component props

    // Configuration by chart type:
    // Common procedures:
    switch (chartType) {
        // Using fallthrough):
        case "bar":
        case "line":
            // Shared props:
            L2ComponentProps = {
                ...L2ComponentProps, ...{
                    stroke: color,
                    strokeWidth: 1
                }
            }
            break;
    }

    // Unique procedures:
    switch (chartType) {
        case "bar":
            // Dynamic components:
            L1ComponentLabel = BarChart;
            L2ComponentLabel = Bar;

            // Unique props:
            L2ComponentProps = {
                ...L2ComponentProps, ...{
                    fill: "#ffffff00" // tranparent bar background
                }
            }
            break;
        case "line":
            // Dynamic components:
            L1ComponentLabel = LineChart;
            L2ComponentLabel = Line

            // Unique props:
            L2ComponentProps = {
                ...L2ComponentProps, ...{
                    dot: false,
                    type: "monotone"
                }
            }
            break;
        case "percent":
            // Dynamic components:
            L1ComponentLabel = PieChart;
            L2ComponentLabel = Pie;

            // Adjust data:
            let dataKey = dataKeys[0]; // Only 1 data key for percentage chart
            let v1 = data[0][dataKey]; // Extract value from 1st data entry
            let v2 = data[1][dataKey]; // Extract value from 2nd data entry
            let vMin = Math.min(v1,v2);
            let vMax = Math.max(v1,v2);
            var adjustedData = data; // Create a copy of the data
            adjustedData[0][dataKey] = vMax - vMin; // Make the data entries complementary to the max value
            adjustedData[1][dataKey] = vMin;

            // Unique props:
            L2ComponentProps = {
                ...L2ComponentProps, ...{
                    data: adjustedData,
                    cx: "50%",
                    cy: "100%",
                    startAngle: 180,
                    endAngle: 0,
                    innerRadius: 72 * scalingRatio,
                    outerRadius: 74 * scalingRatio,
                    paddingAngle: 0,
                }
            }

            // Child component creation:
            data.forEach(function (dataEntry: any, index: number) {
                // Create an L3 component for every data entry provided:
                L3Components.push(
                    <Cell {...{
                        key: `cell-${index}`, // Add a key for rendering performance
                        stroke: "none",
                        style: {outline: "none"}, // suppress selection border on click
                        fill: !index? color : "grey" // Apply color to 1st cell and grey to 2nd 
                    }}
                    />
                );
            });

            break;
        default:
            return null;
    }

    // Creation of L2 components:
    dataKeys.forEach(function (dataKey: any, index: number) {
        // Create an L2 component for every data key provided:
        L2Components.push(
            <L2ComponentLabel {...{
                ...L2ComponentProps, ...{
                    key: `${L2ComponentLabel}-${index}`, // Add a key for rendering performance
                    dataKey: dataKey // Assign current data key
                }
            }}
            >
                {L3Components /* Renders components only when applicable */}
            </L2ComponentLabel>
        );
    });

    return (
        <L1ComponentLabel {...L1ComponentProps}>
            {configurationComponents}
            {L2Components}
        </L1ComponentLabel>
    );
}