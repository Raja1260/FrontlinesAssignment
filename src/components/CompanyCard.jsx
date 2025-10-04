import React, { useContext, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  TablePagination,
  Divider,
  Button,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LanguageIcon from "@mui/icons-material/Language";
import CompanyContext from "../context/CompanyContext";

export default function CompanyCards() {
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
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {Array.from({ length: rowsPerPage }).map((_, idx) => (
          <Card key={idx} sx={{ borderRadius: 3, p: 1, minHeight: 220 }}>
            <CardContent>
              <Skeleton variant="text" height={28} />
              <Skeleton variant="text" />
              <Skeleton variant="rectangular" height={80} />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (processed.length === 0) {
    return <Typography>No companies match your filters.</Typography>;
  }

  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      {/* Card container with fixed grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // 1 column on mobile
            sm: "1fr 1fr", // 2 columns on tablets
            md: "1fr 1fr 1fr 1fr", // 4 columns on desktop
          },
          height: 560, // fixed height
          width: "100%", // fixed width
          overflow: "auto",
          gap: 5,
        }}
      >
        {paginated.map((c) => (
          <Card
            key={c.id}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              bgcolor: "#dce6ffff",
              minHeight: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transform:
                "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
              transition:
                "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease",
              "&:hover": {
                transform:
                  "perspective(1200px) rotateX(6deg) rotateY(-6deg) scale(1.06)",
                boxShadow: "0 18px 35px rgba(0,0,0,0.25)",
              },
            }}
          >
            {/* Header */}
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="h6" fontWeight="bold">
                <BusinessIcon
                  fontSize="medium"
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                {c.name}
              </Typography>
            </Box>

            <CardContent sx={{ p: 2 }}>
              {/* Info grid */}
              <Box
                display="grid"
                gridTemplateColumns="1fr 1fr"
                rowGap={1.5}
                columnGap={2}
                mb={2}
              >
                <Box display="flex" alignItems="center">
                  <BusinessIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "black" }}
                  />
                  <Typography variant="body2" color="black">
                    {c.industry}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <LocationOnIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "black" }}
                  />
                  <Typography variant="body2" color="black">
                    {c.location}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <GroupIcon fontSize="small" sx={{ mr: 1, color: "black" }} />
                  <Typography variant="body2">
                    {c.employees} Employees
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <CalendarTodayIcon
                    fontSize="small"
                    sx={{ mr: 1, color: "black" }}
                  />
                  <Typography variant="body2">Founded {c.founded}</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Description */}
              <Typography
                variant="body2"
                color="black"
                sx={{
                  mb: 2,
                  lineHeight: 1.5,
                  maxHeight: 60,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {c.description}
              </Typography>

              {/* Website Button */}
              {c.website && (
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
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <Box display="flex" justifyContent="flex-end" mt={3}>
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
