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

const percentData = [
    {
        name: "matches",
        value: 359
    },
    {
        name: "applications",
        value: 407
    }
]

// Dummy data for the hired KPI:
const hiredData = [
    { timestamp: "2023-01-01 00:00:00", hired: 338 },
    { timestamp: "2023-01-01 12:00:00", hired: 559 },
    { timestamp: "2023-01-02 00:00:00", hired: 644 },
    { timestamp: "2023-01-02 12:00:00", hired: 821 },
    { timestamp: "2023-01-03 00:00:00", hired: 834 },
    { timestamp: "2023-01-03 12:00:00", hired: 1185 },
    { timestamp: "2023-01-04 00:00:00", hired: 1300 },
    { timestamp: "2023-01-04 12:00:00", hired: 1362 },
    { timestamp: "2023-01-05 00:00:00", hired: 1440 },
    { timestamp: "2023-01-05 12:00:00", hired: 1536 },
    { timestamp: "2023-01-06 00:00:00", hired: 1573 },
    { timestamp: "2023-01-06 12:00:00", hired: 1662 },
    { timestamp: "2023-01-07 00:00:00", hired: 1736 },
    { timestamp: "2023-01-07 12:00:00", hired: 1837 },
    { timestamp: "2023-01-08 00:00:00", hired: 1969 },
    { timestamp: "2023-01-08 12:00:00", hired: 2019 },
    { timestamp: "2023-01-09 00:00:00", hired: 2062 },
    { timestamp: "2023-01-09 12:00:00", hired: 2186 },
    { timestamp: "2023-01-10 00:00:00", hired: 2208 },
    { timestamp: "2023-01-10 12:00:00", hired: 2276 },
    { timestamp: "2023-01-11 00:00:00", hired: 2317 },
    { timestamp: "2023-01-11 12:00:00", hired: 2389 },
    { timestamp: "2023-01-12 00:00:00", hired: 2500 },
    { timestamp: "2023-01-12 12:00:00", hired: 2657 },
    { timestamp: "2023-01-13 00:00:00", hired: 2733 },
    { timestamp: "2023-01-13 12:00:00", hired: 2791 },
    { timestamp: "2023-01-14 00:00:00", hired: 2823 }
]

// Functions:
// Get latest value of a data set given a key
function getLatestValue(data: any, key: any){
    let object = data[data.length-1];
    let value = object[key]
    
    return value;
}

export default function GeneralKPIs({ language }: any) {
    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item>
                <KPICard
                    language={language}
                    size={'l'}
                    chartType={"percent"}
                    data={percentData}
                    title={
                        language === "english" ?
                            "Matched " :
                            language === "español" ?
                                "Pareados" :
                                ""
                    }
                    color={"#d884ce"}
                    xDataKey={"name"}
                    yDataKeys={["value"]}
                    trendChangePercent={5.7}
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'l'}
                    chartType={"line"}
                    data={hiredData}
                    title={
                        language === "english" ?
                            "Hired " :
                            language === "español" ?
                                "Contratados" :
                                ""
                    }
                    color={"#d88484"}
                    xDataKey={"timestamp"}
                    yDataKeys={["hired"]}
                    metric={getLatestValue(hiredData, "hired")}
                    trendChangePercent={14.8}
                />
            </Grid>
        </Grid>
    )
}