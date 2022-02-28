import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../redux/slices/modalHelpSlice";
import { Backdrop, Fade, Modal, Box } from "@mui/material";

function ModalHelp() {
  const helpState = useSelector((state) => state.help.value);
  const dispatch = useDispatch();

  const handleCloseModalHelp = () => dispatch(close());

  const modalStyle = {
    position: "absolute",
    borderRadius: "30px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 680,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={helpState}
      onClose={handleCloseModalHelp}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={helpState}>
        <Box sx={modalStyle}>Map site</Box>
      </Fade>
    </Modal>
  );
}
export default ModalHelp;
