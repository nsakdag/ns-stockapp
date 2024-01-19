import { useEffect, useState } from "react"
import useStockCalls from "../service/useStockCalls"
import { Button, Container } from "@mui/material"
import SaleModal from "../components/SaleModal"
import SaleTable from "../components/SaleTable"
import TableSkeleton, { ErrorMsg, NoDataMsg } from "../components/DataFetchMsg"
import { useSelector } from "react-redux"

const Sales = () => {
  const { getStocks } = useStockCalls()
  const { sales, loading, error } = useSelector((state) => state.stock)

  const [open, setOpen] = useState(false)

  const initialState = { brandId: "", productId: "", quantity: "", price: "" }
  const [info, setInfo] = useState(initialState)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setInfo(initialState)
  }

  useEffect(() => {
    getStocks("products")
    getStocks("sales")
    getStocks("brands")
  }, []) // eslint-disable-line

  return (
    <Container maxWidth="xl">
      <Button variant="contained" onClick={handleOpen}>
        New Sale
      </Button>

      <SaleModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      {error && <ErrorMsg />}
      {loading && <TableSkeleton />}
      {!loading && !sales?.length && <NoDataMsg />}
      {!loading && sales?.length > 0 && (
        <SaleTable setInfo={setInfo} handleOpen={handleOpen} />
      )}
    </Container>
  )
}

export default Sales
