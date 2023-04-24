import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Sidebar from '../organisms/Sidebar';
import DataTable from '../organisms/DataTable';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Industries() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <Sidebar targetTab="Industries"/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DataTable></DataTable>
        </Box>
      </Box>
    </ThemeProvider>
  );
}