import React, { Suspense, useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CompanyProvider } from "./context/CompanyContext";
import FilterBar from "./components/FilterBar";
import CompanyCards from "./components/CompanyCard";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import ErrorBoundary from "./components/ErrorBoundary"; // ⬅️ new import
import Lottie from "lottie-react";
import loaderIcon from "./loaderIcon.json";

const CompanyTable = React.lazy(() => import("./components/CompanyTable"));

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'card'

  const handleToggleView = (event, newView) => {
    if (newView !== null) setViewMode(newView);
  };

  function DelayedSuspense({ children, fallback, delay = 500 }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timer);
    }, [delay]);

    return show ? children : fallback;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CompanyProvider>
        <AppBar
      position="static"
      sx={{
        bgcolor: "#dce6ff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        borderRadius: 2,
        mb: 3,
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              color: "#1a2744",
              mb: 0.5,
            }}
          >
            Companies Directory
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#4a5568",
              fontWeight: 400,
              letterSpacing: 0.2,
            }}
          >
            Browse and manage your company listings
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleToggleView}
            size="small"
            sx={{
              bgcolor: "#f0f4ff",
              borderRadius: 50,
              p: 0.5,
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
              border: "none",
              "& .MuiToggleButtonGroup-grouped": {
                border: "none",
                "&:not(:first-of-type)": {
                  borderRadius: 50,
                  marginLeft: 0.5,
                },
                "&:first-of-type": {
                  borderRadius: 50,
                },
              },
              "& .MuiToggleButton-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                px: 3,
                py: 1,
                color: "#6b7280",
                border: "none",
                borderRadius: 50,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: "rgba(91, 127, 212, 0.08)",
                  color: "#5b7fd4",
                },
              },
              "& .Mui-selected": {
                bgcolor: "#6d94f0ff !important",
                color: "#fff !important",
                boxShadow: "0 2px 8px rgba(91, 127, 212, 0.3), 0 1px 2px rgba(0,0,0,0.1)",
                transform: "scale(1.02)",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(91, 127, 212, 0.4), 0 2px 4px rgba(0,0,0,0.1)",
                },
              },
            }}
          >
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon sx={{ mr: 0.75, fontSize: "1.2rem" }} /> List
            </ToggleButton>
            <ToggleButton value="card" aria-label="card view">
              <GridViewIcon sx={{ mr: 0.75, fontSize: "1.2rem" }} /> Card
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
        <Container maxWidth="2xl" sx={{ mt: 3, mb: 6, py: 2, pr: 5, pl: 5 }}>
          <FilterBar />
          <Box sx={{ mt: 2 }}>
            <ErrorBoundary>
              <Suspense
                fallback={
                  <Box display="flex" justifyContent="center" mt={6}>
                    <Lottie animationData={loaderIcon} loop autoplay />
                  </Box>
                }
              >
                <DelayedSuspense
                  fallback={
                    <Box display="flex" justifyContent="center" mt={6}>
                      <Lottie animationData={loaderIcon} loop autoplay />
                    </Box>
                  }
                  delay={1500} // keeps loader visible at least 2 sec
                >
                  {viewMode === "list" ? <CompanyTable /> : <CompanyCards />}
                </DelayedSuspense>
              </Suspense>
            </ErrorBoundary>
          </Box>
        </Container>
      </CompanyProvider>
    </ThemeProvider>
  );
}
