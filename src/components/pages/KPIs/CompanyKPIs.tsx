import KPICard from "../../organisms/KPICard";
import { Grid } from '@mui/material';

export default function CompanyKPIs({language}: any) {
    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item>
                <KPICard language={language} title={"Company KPI #1"} color={"#82ca9d"} dataKey={"pv"} metric={910225} slope={0} trendChangePercentage={0} detailed/>
            </Grid>
            <Grid item>
                <KPICard language={language} title={"Company KPI #2"} color={"#d88484"} dataKey={"uv"} metric={1002} slope={1} trendChangePercentage={14.8} detailed />
            </Grid>
            <Grid item>
                <KPICard language={language} title={"Company KPI #3"} color={"#8884d8"} dataKey={"amt"} metric={20913} slope={-1} trendChangePercentage={-3.6} detailed/>
            </Grid>
        </Grid>
    )
}