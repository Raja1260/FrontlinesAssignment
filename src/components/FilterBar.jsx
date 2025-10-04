import React, { useContext, useState, useMemo, useCallback } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

import CompanyContext from "../context/CompanyContext";
import useDebounce from "../hooks/useDebounce";

function FilterBarInner() {
  const { filters, dispatch, locations, industries } =
    useContext(CompanyContext);
  const [localSearch, setLocalSearch] = useState(filters.search);
  const debouncedSearch = useDebounce(localSearch, 300);

  // sync debounced search to global filter
  React.useEffect(() => {
    dispatch({ type: "SET_FILTER", payload: { search: debouncedSearch } });
  }, [debouncedSearch, dispatch]);

  const handleChange = useCallback(
    (field) => (e) => {
      const value = e.target.value;
      dispatch({ type: "SET_FILTER", payload: { [field]: value } });
    },
    [dispatch]
  );

  const handleReset = () => {
    dispatch({
      type: "RESET_FILTERS", // assuming your reducer supports this
    });
    setLocalSearch(""); // reset local search as well
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        alignItems: "flex-end",
        bgcolor: "#f4f5f7ff",
        p: 2,
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {/* Search Field */}
      <Box sx={{ flex: "1 1 300px", minWidth: 250 }}>
        <Typography
          sx={{
            mb: 0.5,
            fontSize: "16px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "black",
          }}
        >
          <SearchIcon fontSize="medium" /> Search
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search companies..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: "text.disabled", fontSize: 20, mr: 1 }} />
            ),
          }}
        />
      </Box>

      {/* Location Filter */}
      <Box sx={{ flex: "1 1 180px", minWidth: 150 }}>
        <Typography
          sx={{
            mb: 0.5,
            fontSize: "16px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "black",
          }}
        >
          <LocationOnIcon fontSize="medium" /> Location
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={filters.location}
            onChange={handleChange("location")}
            displayEmpty
          >
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Industry Filter */}
      <Box sx={{ flex: "1 1 180px", minWidth: 150 }}>
        <Typography
          sx={{
            mb: 0.5,
            fontSize: "16px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "black",
          }}
        >
          <BusinessIcon fontSize="medium" /> Industry
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={filters.industry}
            onChange={handleChange("industry")}
            displayEmpty
          >
            {industries.map((ind) => (
              <MenuItem key={ind} value={ind}>
                {ind}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Sort Filter */}
      <Box sx={{ flex: "1 1 180px", minWidth: 150 }}>
        <Typography
          sx={{
            mb: 0.5,
            fontSize: "16px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "black",
          }}
        >
          <SortIcon fontSize="medium" /> Sort
        </Typography>
        <FormControl fullWidth size="small">
          <Select value={filters.sortBy} onChange={handleChange("sortBy")}>
            <MenuItem value={"name_asc"}>Name (A → Z)</MenuItem>
            <MenuItem value={"name_desc"}>Name (Z → A)</MenuItem>
            <MenuItem value={"founded_asc"}>Founded (Old → New)</MenuItem>
            <MenuItem value={"founded_desc"}>Founded (New → Old)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Reset Button */}
     <Box sx={{ flex: "0 0 auto" }}>
  <Tooltip title="Reset Filter">
    <IconButton
      onClick={handleReset}
      sx={{ mt: 2, height: 40 }}
      color="primary"
    >
      <RefreshIcon />
    </IconButton>
  </Tooltip>
</Box>

    </Box>
  );
}

const FilterBar = React.memo(FilterBarInner);
export default FilterBar;
