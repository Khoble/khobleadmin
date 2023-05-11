import MiniKPICard from "../../organisms/MiniKPICard";
import { Grid } from '@mui/material';

export default function CompanyKPIs({language}: any) {
    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Grid item>
                <MiniKPICard title={"Company KPI #1"} color={"#e8fc03"} dataKey={"pv"} metric={910225} detailed/>
            </Grid>
            <Grid item>
                <MiniKPICard title={"Company KPI #2"} color={"#f403fc"} dataKey={"uv"} metric={1002} detailed />
            </Grid>
        </Grid>
    )
}