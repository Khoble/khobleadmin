import { Box } from '@mui/material';
import Sidebar from '../organisms/Sidebar';
import DataTable from '../organisms/DataTable';

export default function Industries() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar targetTab="Industries" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DataTable></DataTable>
      </Box>
    </Box>
  );
}