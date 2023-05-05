import Sidebar from './components/organisms/Sidebar';
import { Box } from '@mui/material';
import KPIs from './components/pages/KPIs';

export default function Menu() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar targetTab="KPIs" />
      <KPIs></KPIs>
    </Box>
  );
}