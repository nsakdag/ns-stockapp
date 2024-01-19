import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PaymentsIcon from "@mui/icons-material/Payments"
import { amber, deepPurple, pink } from "@mui/material/colors"
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const KPI = () => {
  const { sales, purchases } = useSelector((state) => state.stock)

  const totalSales = sales?.reduce((acc, item) => acc + item.amount, 0)
  const totalPurchases = purchases?.reduce((acc, item) => acc + item.amount, 0)

  const kpiData = [
    {
      id: 1,
      title: "sales",
      amount: `$${totalSales}`,
      icon: <MonetizationOnIcon sx={{ fontSize: "2rem" }} />,
      bgColor: deepPurple[100],
      color: deepPurple[700],
    },
    {
      id: 2,
      title: "profit",
      amount: `$${totalSales - totalPurchases}`,
      icon: <ShoppingCartIcon sx={{ fontSize: "2rem" }} />,
      bgColor: pink[100],
      color: pink[700],
    },
    {
      id: 3,
      title: "purchases",
      amount: `$${totalPurchases}`,
      icon: <PaymentsIcon sx={{ fontSize: "2rem" }} />,
      bgColor: amber[100],
      color: amber[700],
    },
  ]

  console.log(purchases)
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      direction="row"
      gap={2}
    >
      {kpiData.map((item) => (
        <Paper
          key={item.id}
          elevation={10}
          sx={{
            display: "flex",
            p: 2,
            gap: 2,
            width: "250px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: item.bgColor,
              color: item.color,
              width: "70px",
              height: "70px",
            }}
          >
            {item.icon}
          </Avatar>

          <Box>
            <Typography variant="button">{item.title}</Typography>
            <Typography variant="h5">{item.amount}</Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  )
}

export default KPI
