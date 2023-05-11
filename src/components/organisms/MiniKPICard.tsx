import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import KPIChart from '../atoms/KPIChart';

function formatAsNumber(value: any) {
    return value.toLocaleString()
}

export default function MiniKPICard({ title, color, dataKey, metric, detailed }: any) {
    return (
        <Box sx={{ minWidth: 275}}> 
            <Card variant="outlined" sx={{ borderTop: "2px solid " + color }}>
                <CardContent sx={{background: "linear-gradient(to bottom, " + color + "25" + " -5%, #00000000 80%)" }}>
                    {detailed && <KPIChart stroke={color} dataKey={dataKey} />}
                    <Typography gutterBottom variant="h6" component="div" color={color}>
                        {formatAsNumber(metric)}
                    </Typography>
                    <Typography variant="body2" color="grey">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}