import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import useStockCalls from "../service/useStockCalls"
import { useSelector } from "react-redux"
import { Grid } from "@mui/material"
import FirmCard from "../components/FirmCard"
import FirmModal from "../components/FirmModal"
import TableSkeleton, {
  CardSkeleton,
  ErrorMsg,
  NoDataMsg,
} from "../components/DataFetchMsg"

const Firms = () => {
  // const { getFirms, getSales } = useStockCalls()
  const { getStocks } = useStockCalls()
  const { firms, error, loading } = useSelector((state) => state.stock)

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setInfo({ name: "", phone: "", address: "", image: "" })
  }

  useEffect(() => {
    // getFirms()
    getStocks("firms")
  }, [])

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Firm
      </Button>

      <FirmModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      {error && <ErrorMsg />}
      {loading && (
        <CardSkeleton>
          <FirmCard />
        </CardSkeleton>
      )}

      {!error && !loading && !firms.length && <NoDataMsg />}

      {!loading && !error && firms.length > 0 && (
        <Grid container gap={2} mt={3} justifyContent={"center"}>
          {firms?.map((firm) => (
            <Grid item key={firm._id}>
              <FirmCard firm={firm} handleOpen={handleOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default Firms
