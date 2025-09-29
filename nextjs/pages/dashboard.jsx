import { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';

export default function Dashboard() {
  const [summary, setSummary] = useState({ total_items: 0, total_quantity: 0 });
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetch("<http://localhost:8000/equipment_stock/summary>")
      .then(res => res.json())
      .then(data => setSummary(data));
    fetch("<http://localhost:8000/equipment_stock/location_summary>")
      .then(res => res.json())
      .then(data => setLocationData(data));
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>RAI Equipment Stock Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Equipment Items</Typography>
            <Typography variant="h3">{summary.total_items}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Quantity</Typography>
            <Typography variant="h3">{summary.total_quantity}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Equipment by Location</Typography>
            <BarChart
  xAxis={[{
    data: locationData.map(l => l.location),
    scaleType: 'band',
    label: 'Location'
  }]}
  series={[{
    data: locationData.map(l => l.total),
    label: 'Total Quantity'
  }]}
  width={600}
  height={300}
/>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
