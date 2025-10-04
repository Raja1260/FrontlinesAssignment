import React from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Paper,
  Snackbar,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, showSnackbar: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error, showSnackbar: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, showSnackbar: false });
    window.location.reload(); // refresh the whole app
  };

  handleCloseSnackbar = () => {
    this.setState({ showSnackbar: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          {/* Snackbar Notification */}
          <Snackbar
            open={this.state.showSnackbar}
            autoHideDuration={4000}
            onClose={this.handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error" onClose={this.handleCloseSnackbar}>
              {this.state.error?.message || "An unexpected error occurred!"}
            </Alert>
          </Snackbar>

          {/* Fallback UI */}
          <Box display="flex" justifyContent="center" alignItems="center" mt={8}>
            <Paper
              elevation={3}
              sx={{ p: 4, maxWidth: 500, textAlign: "center" }}
            >
              <Alert severity="error" sx={{ mb: 2 }}>
                Oops! Something went wrong.
              </Alert>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {this.state.error?.message || "An unexpected error occurred."}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ReplayIcon />}
                onClick={this.handleReload}
              >
                Reload App
              </Button>
            </Paper>
          </Box>
        </>
      );
    }

    return this.props.children;
  }
}
