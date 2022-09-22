import { Button } from "react-bootstrap";
import ViceModal from "../../components/organisms/Modal";

const DeleteConfirmationModal = ({ open, setOpen, userId, username }) => {
  const footer = (
    <div className="w-100">
      <Button
        variant="danger"
        type="submit"
        onClick={() => {
          userId();
          setOpen(false);
        }}
        className="ml-85"
        active
      >
        Confirm
      </Button>
    </div>
  );
  return (
    <ViceModal
      show={open}
      title="Delete User?"
      handleClose={setOpen}
      footer={footer}
    >
      {`Are you sure you want to delete ${username} ?`}
    </ViceModal>
  );
};

export default DeleteConfirmationModal;
