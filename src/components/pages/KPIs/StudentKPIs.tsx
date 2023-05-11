import MiniKPICard from "../../organisms/MiniKPICard";
import { Grid } from '@mui/material';

export default function StudentKPIs({language}: any) {
    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Grid item>
                <MiniKPICard title={"Student KPI #1"} color={"#fca103"} dataKey={"pv"} metric={910225} detailed/>
            </Grid>
            <Grid item>
                <MiniKPICard title={"Student KPI #2"} color={"#03fcf8"} dataKey={"uv"} metric={1002} detailed />
            </Grid>
        </Grid>
    )
}