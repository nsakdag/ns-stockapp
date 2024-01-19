import React from "react"
import { modalStyle } from "../styles/globalStyles"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import useStockCall from "../service/useStockCalls"

export default function BrandModal({ open, handleClose, info, setInfo }) {
  const { postStock, putStock } = useStockCall()

  const handleChange = (e) => {
    e.preventDefault()
    setInfo({ ...info, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (info._id) {
      putStock("brands", info)
    } else {
      postStock("brands", info)
    }
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Brand Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={info.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Image Url"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            value={info.image}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" size="large">
            Save Brand
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
