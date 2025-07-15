import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" mb={3} fontWeight={"bold"}>
        Pedidos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
};
