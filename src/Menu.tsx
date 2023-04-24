import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from './components/organisms/Sidebar';
import { Box } from '@mui/material';
import KPIs from './components/pages/KPIs';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Menu() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <Sidebar targetTab="KPIs"/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <KPIs></KPIs>
        </Box>
      </Box>
    </ThemeProvider>
  );
}