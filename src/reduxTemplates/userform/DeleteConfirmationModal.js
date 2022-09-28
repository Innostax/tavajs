<%if(isBootstrap){%>
import { Button } from "react-bootstrap";
<%}%>
<%if(isTailWind){%>
  import Button from '../../components/atoms/Button'
<%}%>
import ViceModal from "../../components/organisms/Modal";

const DeleteConfirmationModal = ({ open, setOpen, userId, username }) => {
  const footer = (
    <%if(isBootstrap){%>
    <div className="w-100">
      <Button
        variant="danger"
        type="submit"
        onClick={() => {
          userId();
          setOpen(false);
        }}
        className="ml-82"
        active
      >
        Confirm
      </Button>
    </div>
    <%}%>
    <%if(isTailWind){%>
      <Button
			name='Confirm Delete'
			align='content-end'
			variant='rounded-lg'
			color='bg-red-500'
			onClick={() => {
				userId()
				setOpen(false)
			}}
		/>
    <%}%>
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
