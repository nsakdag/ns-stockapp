import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardMedia from "@mui/material/CardMedia"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditIcon from "@mui/icons-material/Edit"
import { CardHeader } from "@mui/material"
import useStockCall from "../service/useStockCalls"
import { btnStyle } from "../styles/globalStyles"

const BrandCard = ({ brand, handleOpen, setInfo }) => {
  const { deleteStock } = useStockCall()

  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        width: "300px",
        height: "400px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CardHeader title={brand?.name} />

      <CardMedia
        image={brand?.image}
        sx={{ p: 1, objectFit: "contain", height: "250px" }}
        component="img"
        alt="brand-img"
      />

      <CardActions>
        <EditIcon
          sx={btnStyle}
          onClick={() => {
            setInfo(brand)
            handleOpen()
          }}
        />
        <DeleteOutlineIcon
          sx={btnStyle}
          onClick={() => deleteStock("brands", brand._id)}
        />
      </CardActions>
    </Card>
  )
}

export default BrandCard
