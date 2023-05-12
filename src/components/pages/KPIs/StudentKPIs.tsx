import KPICard from "../../organisms/KPICard";
import { Grid } from '@mui/material';

// Dummy data for x-y charts:
const linearData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
]; //todo: api call

export default function StudentKPIs({language}: any) {
    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item>
                <KPICard
                    language={language}
                    size={'m'}
                    chartType={"bar"}
                    data={linearData}
                    title={"KPI #1"}
                    color={"#82ca9d"}
                    xDataKey={"name"}
                    yDataKeys={["pv"]}
                    metric={910225}
                    trendChangePercent={0}
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'m'}
                    chartType={"line"}
                    data={linearData}
                    title={"KPI #2"}
                    color={"#8884d8"}
                    xDataKey={"name"}
                    yDataKeys={["amt"]}
                    metric={20913}
                    trendChangePercent={-3.6} />
            </Grid>
        </Grid>
    )
}