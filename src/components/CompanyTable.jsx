import React, { useContext, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Link,
  Skeleton,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  Business,
  Work,
  LocationOn,
  Group,
  CalendarToday,
  Language,
} from "@mui/icons-material"; // icons
import LanguageIcon from "@mui/icons-material/Language";


import CompanyContext from "../context/CompanyContext";

export default function CompanyTable() {
  const { loading, error, paginated, processed, page, rowsPerPage, dispatch } =
    useContext(CompanyContext);

  const handleChangePage = useCallback(
    (event, newPage) => {
      dispatch({ type: "SET_PAGE", payload: newPage });
    },
    [dispatch]
  );

  const handleChangeRows = useCallback(
    (e) => {
      dispatch({ type: "SET_ROWS", payload: parseInt(e.target.value, 10) });
    },
    [dispatch]
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (processed.length === 0) {
    return <Typography>No companies match your filters.</Typography>;
  }

  return (
    <Box sx={{px:2,pt:2}}>
      {/* FIXED SIZE SCROLLABLE TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          height: 600, // fixed height
          width: "100%", // fixed width
          overflow: "auto",
           // allow scrollbars
        }}
      >
        <Table stickyHeader sx={{ minWidth: 900, tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: "20%", fontWeight: "bold", bgcolor: "#d9e2f8ff" }}
              >
                <Business
                  fontSize="small"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Name
              </TableCell>
              <TableCell
                sx={{ width: "20%", fontWeight: "bold", bgcolor: "#d9e2f8ff" }}
              >
                <Work
                  fontSize="small"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Industry
              </TableCell>
              <TableCell
                sx={{ width: "18%", fontWeight: "bold", bgcolor: "#d9e2f8ff" }}
              >
                <LocationOn
                  fontSize="small"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Location
              </TableCell>
              <TableCell
              align="center"
                sx={{ width: "14%", fontWeight: "bold", bgcolor: "#d9e2f8ff" }}
              >
                <Group
                  fontSize="small"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Employees
              </TableCell>
              <TableCell
              align="center"
                sx={{ width: "14%", fontWeight: "bold", bgcolor: "#d9e2f8ff" }}
              >
                <CalendarToday
                  fontSize="small"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Founded
              </TableCell>
              <TableCell
              align="center"
                sx={{ width: "14%", fontWeight: "bold", bgcolor: "#d9e2f8ff" }}
              >
                <Language
                  fontSize="small"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Website
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((c) => (
              <TableRow
                key={c.id}
                hover
                sx={{
                  "&:nth-of-type(odd)": { bgcolor: "#fafafa" },
                  "&:hover": { bgcolor: "#d9e2f8ff" },
                }}
              >
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.industry}</TableCell>
                <TableCell>{c.location}</TableCell>
                <TableCell align="center">{c.employees}</TableCell>
                <TableCell align="center">{c.founded}</TableCell>
                <TableCell align="center">
                 <Button
                  href={c.website}
                  target="_blank"
                  rel="noopener"
                  variant="contained"
                  size="small"
                  startIcon={<LanguageIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    background: "linear-gradient(135deg, #58a4f0ff, #42a5f5)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #1565c0, #1e88e5)",
                    },
                  }}
                >
                  Visit Website
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <TablePagination
          component="div"
          count={processed.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRows}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>
    </Box>
  );
}
