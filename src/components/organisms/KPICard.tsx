import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import KhobleChart from '../molecules/KhobleChart';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { CardActions, Grid, IconButton } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { useState } from 'react';
import convertToRGBA from '../../utils/functions/convertToRGBA';

export default function KPICard({ 
    language, 
    size='l', 
    chartType="bar", 
    data, 
    title, 
    color="#FFFFFF", 
    xDataKey, 
    yDataKeys, 
    metric, 
    metricDescription, 
    trendChangePercent, 
    fixed=false, 
    componentColors 
}: any) {
    // Functions:
    // Returns expand icon depending on card size:
    function getExpandIcon() {
        var IconToReturnTag: any;

        switch (cardSize) {
            // Using fallthrough, both small and medium cards render the same icon
            case 's':
            case 'm':
                IconToReturnTag = OpenInFullIcon
                break;
            case 'l':
                IconToReturnTag = CloseFullscreenIcon
                break;
            default:
                return null;
        }

        return <IconToReturnTag fontSize={"small"} />
    }

    function updateExpandIcon() {
        switch (cardSize) {
            case 's':
                setChartSize('m');
                break;
            case 'm':
                setChartSize('l');
                break;
            case 'l':
                setChartSize('s');
                break;
        }
    }

    // Variables and constants:
    // Sizing:
    const [cardSize, setChartSize] = useState(size);

    // Dynamic components:
    var IconComponent: any;
    var IconComponentTag: any;

    // Colors:
    var iconComponentColor = "";
    const infoColor = "#808080"; // Color of text, chart configuration elements, etc.

    // Modify metric depending on chart type:
    switch (chartType) {
        case "percent":
            // Modify metric:
            metric = null // Null by default
            let dataKey = yDataKeys[0]; // Only 1 data key for percentage chart
            let v1 = data[0][dataKey]; // Extract value from 1st data entry
            let v2 = data[1][dataKey]; // Extract value from 2nd data entry

            if (v1 != null && v2 != null) { // Ensure no division by 0
                let percent = Math.min(v1, v2) / Math.max(v1, v2) * 100; // Calculate the percent of the minimum to the maximum
                percent = Math.round(percent * 10) / 10 // Round to 1 decimal place
                metric = percent.toString() + '%' // Turn metric into a percent
            }
            break;
        default:
            // Any other chart type:
            if (metric) metric = metric.toLocaleString() // format metric as number (commas, decimals, etc.)
    }

    // Create trending icon component depending on slope:
    if (trendChangePercent < 0) {
        IconComponentTag = SouthEastIcon;
        iconComponentColor = "maroon";

    } else if (trendChangePercent > 0) {
        IconComponentTag = NorthEastIcon;
        iconComponentColor = "green";
    } else { // If 0:
        IconComponentTag = HorizontalRuleIcon;
        iconComponentColor = "orange";
    }

    IconComponent = <IconComponentTag {...{ sx: { fontSize: "medium", color: iconComponentColor } }} />

    return (
        <Card
            variant="outlined"
            sx={{borderTop: `2px solid ${color}`}}
        >
            <CardContent sx={{
                background: `linear-gradient(to bottom, ${convertToRGBA(color, 0.25)} -5%, #00000000 80%)`,
                width: "400px",
                ...(cardSize !=='s' && {height: "230px"}), // displays nothing for small charts
            }}
            >
                {cardSize !== 's' &&
                    <KhobleChart
                        simplified={cardSize === 'm'}
                        chartType={chartType}
                        mainColor={color}
                        xDataKey={xDataKey}
                        yDataKeys={yDataKeys}
                        data={data}
                        configColor={infoColor}
                        componentColors={componentColors}
                    />
                }
                {/* Metric row */}
                {metric !== undefined && /* only renders if a metric was provided ('undefined' is used in validation because metric can take a value of 0) */
                    <Grid /* Item container */
                        container
                        alignItems={"center"}
                        justifyContent="space-between"
                    // sx={{ outline: '1px dashed white' }}
                    >
                        <Grid /* Metric item wrapper */
                            item /* (has to be item in order to be spaced) */
                        // sx={{ border: '1px solid wheat' }}
                        >
                            <Grid /* Metric container */
                                container
                                direction="column"
                                alignItems="flex-start"
                            >
                                <Typography
                                    variant="h6"
                                    color={color}

                                >
                                    {metric}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color={infoColor}
                                >
                                    {metricDescription}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid /* Metric item wrapper */
                            item /* (has to be item in order to be spaced) */
                        // sx={{ border: '1px solid wheat' }}
                        >
                            <Grid /* Percentage and trend icon container */
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Typography variant="body2" color={infoColor}>
                                    {trendChangePercent + "%"}
                                </Typography>
                                {IconComponent}
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </CardContent>
            <CardActions>
                {/* Bottom row */}
                <Grid /* Column container */
                    container
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent="space-between"
                // sx={{ outline: '1px dashed white' }}
                >
                    <Typography
                        marginTop={2}
                        variant="body1"
                        color={infoColor}
                    >
                        {title}
                    </Typography>
                    {!fixed &&
                        <IconButton
                            sx={{ color: infoColor }}
                            onClick={updateExpandIcon}
                        >
                            {getExpandIcon()}
                        </IconButton>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
}