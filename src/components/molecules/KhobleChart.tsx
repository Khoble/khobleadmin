import { LineChart, Line, Bar, BarChart, CartesianGrid, PieChart, Pie, Cell, Tooltip, YAxis, XAxis, Brush } from 'recharts';
import KhobleChartTooltip from '../atoms/KhobleChartTooltip';
import { useEffect, useRef, useState } from 'react';
import KhobleChartAxisTick from '../atoms/KhobleChartXAxisTick';

export default function KhobleChart({ size, chartType, color, xDataKey, yDataKeys, data, configColor }: any) {
    // Constants and variables:

    // Dynamic components:
    // Labels:
    var L1ComponentLabel: any; // Parent chart component label
    var L2ComponentLabel: any; // 1st-order child chart component label

    // Arrays:
    var configurationComponents: JSX.Element[] = []; // Used to store and render all those recharts components that modify the chart configuration
    var L2Components: JSX.Element[] = [] // Used to store and render L2 components
    var L3Components: JSX.Element[] = []; // 2nd-order child component

    // Component props:
    var L1ComponentProps = chartType === "percent" ? {} : { data: data }; // Every L1 component has to have a data property (except percent charts)
    var L2ComponentProps = {};

    // Values used to manage changes in the chart brush:
    const defaultNumberOfXAxisTicks = 12; 
    const [brushStartIndex, setBrushStartIndex] = useState(0); // where the leftmost end of the brush will start (0 by default)
    const [brushEndIndex, setBrushEndIndex] = useState( //  where the leftmost end of the brush will end
        data.length < defaultNumberOfXAxisTicks? // if there are less data points than default number of x-axis ticks to show
            data.length-1 : // the last index of the data array
            defaultNumberOfXAxisTicks - 1
    ); // Brush end-index falls on the last data element of the default range (numerOfDefaultXAxisTcks)

    // Sizing variables:
    var L1ComponentWidth = 275;
    var L1ComponentHeight = 80;
    var scaleFactor; // How much the chart dimensions should grow
    const componentWidthRef = useRef<any>(null); // Reference used to used to extract a component's current width
    const [currentTickWidth, setCurrentTickWidth] = useState(0); // The value of the width of the x-axis labels (ticks) used to prevent text overlapping
    const updateXAxisTickWidth = () => { // Triggered whenever resizing ocurrs or the brush changes
        var newTickWidth = 0;

        if (componentWidthRef.current) {
            let brushDistance = brushEndIndex - brushStartIndex + 1;
            newTickWidth = Math.floor(componentWidthRef.current.props.width / brushDistance); // Divide by the amount of L2 components that are displayed, in order to find how wide the x-axis ticks will be
        }

        setCurrentTickWidth(newTickWidth);
    };

    // When all components have been rendered:
    useEffect(() => {
        // Trigger right after components have been rendered:
        updateXAxisTickWidth(); // This makes sure that the x-axis ticks are rendered with actual text initially

        // Set a resize listener to trigger the function that updates x-axis tick width
        window.addEventListener('resize', updateXAxisTickWidth);

        // Remove the event listener when the components have to be unmounted:
        return () => {
            window.removeEventListener('resize', updateXAxisTickWidth);
        };

    });

    // Configuration by size:
    switch (size) {
        case 's':
            return null; // Render nothing for small cards

        case 'm':
            // Sizing:
            scaleFactor = 1;
            break;
        case 'l':
            // Sizing:
            scaleFactor = 3.2;

            // Props:
            L2ComponentProps = {
                ...L2ComponentProps, ...{
                    ref: componentWidthRef // Add reference to be able to extract it's current width
                }
            }

            // Chart configuration:
            configurationComponents.push(
                // Add tooltip:
                // <Tooltip 
                //     content={<KhobleChartTooltip />} 
                //     key={"tooltip"}
                //     cursor={{ fill: configColor }} 
                // />,

                <CartesianGrid
                    key={"cartesianGrid"}
                    strokeDasharray='3 3'
                    stroke={configColor + 25} // 25% opacity on top
                />,

                // Add y-axis:
                <YAxis
                    key={"y-axis"}
                    stroke={configColor}
                />,

                // Add x-axis:
                <XAxis
                    key={"x-axis"}
                    dataKey={xDataKey}
                    interval={0} // Will not remove x-axis ticks that don't fit
                    tick={
                        <KhobleChartAxisTick
                            textColor={configColor}
                            tickWidth={currentTickWidth}
                        />
                    }
                />
            );

            // Add brush if data has more than 1 data point:
            if (data.length > 1) {
                // console.log("["+brushStartIndex+","+brushEndIndex+"]");
                configurationComponents.push(
                    <Brush
                        key={"brush"}
                        dataKey={xDataKey}
                        height={30}
                        stroke={color}
                        fill='transparent' // No background
                        tickFormatter={() => ("")} // No text labels on the horizontal ends
                        startIndex={brushStartIndex}
                        endIndex={brushEndIndex}
                        onChange={(brush) => {
                            // Update brush start and end indices:
                            if (brush.startIndex != undefined && brush.endIndex != undefined) {
                                setBrushStartIndex(brush.startIndex);
                                setBrushEndIndex(brush.endIndex);
                                // The previous 2 lines will trigger x-axis tick text adjustment, since such props are used in the 'updateXAxisTickWidth' function
                            }
                        }}
                    />
                );
            }

            break;
        default:
            return null;
    }

    // Creation of parent component props:
    L1ComponentProps = {
        ...L1ComponentProps, ...{
            height: L1ComponentHeight * scaleFactor,
            width: L1ComponentWidth * scaleFactor
        }
    }

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
            let dataKey = yDataKeys[0]; // Only 1 data key for percentage chart
            let dataCopy = Array.from(data, obj => JSON.parse(JSON.stringify(obj))); // create a deep copy of original data so that it is not modified 
            let v1 = dataCopy[0][dataKey]; // Extract value from 1st data entry
            let v2 = dataCopy[1][dataKey]; // Extract value from 2nd data entr
            let vMin = Math.min(v1, v2);
            let vMax = Math.max(v1, v2);
            dataCopy[0][dataKey] = vMin;
            dataCopy[1][dataKey] = vMax - vMin; // will ensure the second slice of the pie chart is the complement to vMax

            // Unique props:
            L2ComponentProps = {
                ...L2ComponentProps, ...{
                    data: dataCopy,
                    cx: "50%",
                    cy: "100%",
                    startAngle: 180,
                    endAngle: 0,
                    innerRadius: 72 * scaleFactor,
                    outerRadius: 74 * scaleFactor,
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
                        style: { outline: "none" }, // suppress selection border on click
                        fill: !index ? color : configColor // Apply color to 1st cell and grey to 2nd 
                    }}
                    />
                );
            });

            // Chart configuration:
            configurationComponents = [] // erase chart configuration elements

            break;
        default:
            return null;
    }

    // Creation of L2 components:
    yDataKeys.forEach(function (dataKey: any, index: number) {
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