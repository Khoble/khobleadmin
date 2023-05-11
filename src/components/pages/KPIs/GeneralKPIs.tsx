import MiniKPICard from "../../organisms/MiniKPICard";
import { Grid } from '@mui/material';

export default function GeneralKPIs({language}: any) {
    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Grid item>
                <MiniKPICard title={"General KPI #1"} color={"#8884d8"} dataKey={"pv"} metric={910225} detailed/>
            </Grid>
            <Grid item>
                <MiniKPICard title={"General KPI #2"} color={"#82ca9d"} dataKey={"uv"} metric={1002} detailed />
            </Grid>
        </Grid>
    )
}