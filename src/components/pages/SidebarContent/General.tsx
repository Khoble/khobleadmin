import { useEffect, useState } from "react";
import KPICard from "../../organisms/KPICard";
import { Grid } from '@mui/material';
import khobleAPI from "../../../api/khobleAPI";
import getLatestValue from "../../../utils/functions/getLatestValue";

const colors = {
    red: "#d88484",
    orange: "#d89f84",
    yellow: "#d8d184",
    green: "#9fd884",
    turquoise: "#84d8bc",
    lile: "#8c84d8",
    magenta: "#d884ce",
}

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
];
const dummyPercentData = [
    {
        name: "matches",
        value: 1
    },
    {
        name: "applications",
        value: 2
    }
]
// Dummy data for the hired KPI:
const dummyHiredData = [
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

export default function General({ language }: any) {
    // Constants and variables:
    // KPI data:
    const [hiredData, setHiredData] = useState<any>(null);
    const [matchedData, setMatchedData] = useState<any>(null);
    const timestampKeyName = "timestamp"; // the name of the key that has to do with timestamps in the objects from the API responses

    const [isLoading, setIsLoading] = useState(true) // true by default to display the wrapper until the API calls are done

    // API calls:
    useEffect(() => {
        // // Fetch all data:
        const fetchAllData = async () => {
            try {
                const response = await khobleAPI.get("/dashboard/general"); // make API call
                const rawData = await response.data; // extract data
                if (rawData) { // if property was found
                    // Handle hired data:
                    setHiredData(rawData.proposals);

                    // Handle matched data:
                    setMatchedData(
                        [
                            {
                                name: "accepted",
                                value: rawData.applications.accepted
                            },
                            {
                                name: "total",
                                value: rawData.applications.total
                            }
                        ]
                    );
                } else {
                    throw new Error(`Response has no property 'data'`); // raise error explaining property couldn't be found
                }
            } catch (error) {
                console.error(error); // raise error explaining inability to connect to the endpoint 
            }
        };

        // Main KPI call:
        const fetchKPIData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([fetchAllData()]); // ensures all the calls are finished before proceeding
            } catch (error) {
                console.error(error); // handle error
            } finally {
                setIsLoading(false);
            }
        };

        fetchKPIData(); // make main call
    },
        [] // empty array for 2nd argument indicates that useEffect will only run once after the initial render, not after re-renders as well
    );

    if (isLoading || hiredData === null) {
        return <div>Loading...</div>;
    }

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item>
                <KPICard
                    language={language}
                    size={'s'}
                    chartType={"line"}
                    data={hiredData}
                    color={colors.red}
                    xDataKey={timestampKeyName}
                    yDataKeys={["total_hires"]}
                    metric={getLatestValue(hiredData, "total_hires")}
                    metricDescription={
                        language === "english" ?
                            "currently hired " :
                            language === "español" ?
                                "contratados actualmente" :
                                ""
                    }
                    trendChangePercent={''}
                />
            </Grid>
            <Grid item>
                <KPICard
                    language={language}
                    size={'m'}
                    chartType={"percent"}
                    data={matchedData}
                    color={colors.magenta}
                    xDataKey={"name"}
                    yDataKeys={["value"]}
                    trendChangePercent={''}
                    metricDescription={
                        language === "english" ?
                            "matched" :
                            language === "español" ?
                                "pareados" :
                                ""
                    }
                    fixed
                />
            </Grid>
        </Grid>
    );
}