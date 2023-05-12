import { Card, CardHeader, CardContent } from "@mui/material";

export default function KhobleChartTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        return (
            <Card
                sx={{
                    color: "pink",
                    backgroundColor: "rgba(255, 255, 255, 0.363)",
                    backdropFilter: " blur(25px)",
                    overflowWrap: "break-word",
                }}
            >
                <CardHeader
                    sx={{
                        marginBottom: "2px",
                        color: "black"
                    }}
                >
                    {label}
                </CardHeader>
                <CardContent>
                    {payload.map((key: any) => (
                        <div key={key.dataKey}>
                            <p>
                                {key.dataKey}: {key.value}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    return null;
}