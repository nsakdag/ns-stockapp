import { useEffect, useState } from "react"
import useStockCalls from "../service/useStockCalls"
import PurchaseModal from "../components/PurchaseModal"
import PurchaseTable from "../components/PurchaseTable"
import { Button, Container } from "@mui/material"
import TableSkeleton, { ErrorMsg, NoDataMsg } from "../components/DataFetchMsg"
import { useSelector } from "react-redux"

const Purchases = () => {
  const { getStocks, getProPurBranFirm } = useStockCalls()
  const { error, loading, purchases } = useSelector((state) => state.stock)

  const [open, setOpen] = useState(false)

  const initialState = {
    brandId: "",
    firmId: "",
    productId: "",
    quantity: "",
    price: "",
  }
  const [info, setInfo] = useState(initialState)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setInfo(initialState)
  }

  useEffect(() => {
    // getStocks("products")
    // getStocks("purchases")
    // getStocks("brands")
    // getStocks("firms")

    getProPurBranFirm()
  }, []) // eslint-disable-line

  return (
    <Container maxWidth="xl">
      <Button variant="contained" onClick={handleOpen}>
        New Purchase
      </Button>

      <PurchaseModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      {error && <ErrorMsg />}
      {loading && <TableSkeleton />}
      {!error && !loading && !purchases?.length && <NoDataMsg />}
      {!error && !loading && purchases?.length > 0 && (
        <PurchaseTable setInfo={setInfo} handleOpen={handleOpen} />
      )}
    </Container>
  )
}

export default Purchases
