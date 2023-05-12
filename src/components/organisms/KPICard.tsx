import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import KhobleChart from '../atoms/KhobleChart';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Grid } from '@mui/material';

export default function KPICard({ language, size, chartType, data, title, color, dataKeys, metric, trendChangePercent }: any) {
    // Variables and constants:
    // Dynamic components:
    var IconComponent: any; 
    var IconComponentTag: any;

    // Colors:
    var componentColor = ""

    // Modify depending on chart type:
    switch (chartType) {
        case "percent":
            // Modify metric:
            metric = null // Null by default
            let dataKey = dataKeys[0]; // Only 1 data key for percentage chart
            let v1 = data[0][dataKey]; // Extract value from 1st data entry
            let v2 = data[1][dataKey]; // Extract value from 2nd data entry

            if (v1 != null && v2 != null) { // If v1 and v2 are defined
                let percent = Math.min(v1,v2)/Math.max(v1,v2) * 100; // Calculate the percent of the minimum to the maximum
                percent = Math.round(percent * 10) / 10 // Round to 1 decimal place
                metric = percent.toString()+'%' // Turn metric into a percent
            }
            break;
        default:
            // Any other chart type:
            metric = metric.toLocaleString() // format metric as number (commas, decimals, etc.)
    }

    // Create trending icon component depending on slope:
    if (trendChangePercent < 0) {
        IconComponentTag = SouthEastIcon;
        componentColor = "maroon";

    } else if (trendChangePercent > 0) {
        IconComponentTag = NorthEastIcon;
        componentColor = "green";
    } else { // If 0:
        IconComponentTag = HorizontalRuleIcon;
        componentColor = "orange";
    }

    IconComponent = <IconComponentTag {...{ sx: { fontSize: "medium", color: componentColor } }} />

    return (
        <Box sx={{ minWidth: 200 }}>
            <Card
                variant="outlined"
                sx={{ borderTop: "2px solid " + color }}
            >
                <CardContent sx={{ background: "linear-gradient(to bottom, " + color + "25" + " -5%, #00000000 80%)" }}>
                    {
                        <KhobleChart
                            size={size}
                            chartType={chartType}
                            color={color}
                            dataKeys={dataKeys}
                            data={data}
                        />
                    }
                    <Grid
                        container
                        alignItems={"center"}
                    >
                        <Grid
                            item xs={6}
                            alignItems={"center"}
                        >
                            <Typography gutterBottom variant="h6" component="div" color={color} sx={{ marginTop: 1 }}>
                                {metric}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Typography variant="body2" color="grey">
                                    {trendChangePercent + "%"}
                                </Typography>
                                {IconComponent}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="grey">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}