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

interface Order {
  id: number;
  idUser: number;
  totalPrice: number;
  statusOrder: number;
  payment: string;
  status: number;
}

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ mt: 6 }}>
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
