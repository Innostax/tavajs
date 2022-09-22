import { Button } from "react-bootstrap";
import ViceModal from "../../components/organisms/Modal";

const DeleteConfirmationModal = ({ open, setOpen, userId, username }) => {
  const footer = (
    <>
      <Button
        variant="danger"
        type="submit"
        onClick={() => {
          userId();
          setOpen(false);
        }}
        active
        style={{ marginLeft: "80%" }}
      >
        Confirm
      </Button>
    </>
  );
  return (
    <ViceModal
      show={open}
      title={"Delete User?"}
      handleClose={setOpen}
      footer={footer}
    >
      {`Are you sure you want to delete ${username} ?`}
    </ViceModal>
  );
};

export default DeleteConfirmationModal;
