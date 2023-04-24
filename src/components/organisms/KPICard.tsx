import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import KPIChart from '../atoms/KPIChart';

export default function KPICard({title, stroke, dataKey}: any) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <KPIChart stroke={stroke} dataKey={dataKey}/>
                </CardContent>
            </Card>
        </Box>
    );
}