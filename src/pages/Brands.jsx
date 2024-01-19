import { Typography, Box, Grid, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BrandCard from "../components/BrandCard"
import BrandModal from "../components/BrandModal"
import useStockCalls from "../service/useStockCalls"
import { CardSkeleton, ErrorMsg, NoDataMsg } from "../components/DataFetchMsg"

const Brands = () => {
  const { getStocks } = useStockCalls()
  const { brands, loading, error } = useSelector((state) => state.stock)

  const [info, setInfo] = useState({ name: "", image: "" })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setInfo({ name: "", image: "" })
  }

  useEffect(() => {
    getStocks("brands")
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Typography variant="h4" color="error" mb={2}>
        Brands
      </Typography>

      <Button variant="contained" onClick={handleOpen}>
        New Brand
      </Button>

      <BrandModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      {error && <ErrorMsg />}

      {loading && (
        <CardSkeleton>
          <BrandCard />
        </CardSkeleton>
      )}

      {!loading && !brands?.length && <NoDataMsg />}

      {!loading && brands?.length > 0 && (
        <Grid container justifyContent={"center"} gap={2} mt={4}>
          {brands?.map((brand) => (
            <Grid item key={brand._id}>
              <BrandCard
                brand={brand}
                handleOpen={handleOpen}
                setInfo={setInfo}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default Brands
