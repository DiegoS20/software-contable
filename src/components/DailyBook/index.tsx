import { Button } from "@mui/material";
import Modal from "../Modal";
import { useState } from "react";

export default function DailyBook() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenModal(true)}
      >
        Agregar asiento
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <p>Hola</p>
      </Modal>
    </div>
  );
}
