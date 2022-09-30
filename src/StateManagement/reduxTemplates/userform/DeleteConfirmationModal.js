import ViceModal from "../../components/organisms/Modal";
<%if(isTailWind){%>
  import Button from '../../components/atoms/Button'
  const DeleteConfirmationModal = ({ open, setOpen, userId, username }) => {
    const footer = (
      <Button
        name='Confirm'
        align='content-end'
        variant='rounded-lg text-white'
        color='bg-red-500'
        onClick={() => {
          userId()
          setOpen(false)
        }}
      />
    )
    return (
      <ViceModal
        open={open}
        title='Delete User?'
        handleClose={setOpen}
        footer={footer}
      >
        {`Are you sure you want to delete ${username} ?`}
      </ViceModal>
    )
  }
<%}%>
<% if(isBootstrap) {%>
import { Button } from "react-bootstrap"
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
        className="ml-82"
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
      Are you sure you want to delete <b>{username}</b> ?
    </ViceModal>
  );
};
<%}%>
<% if(isMaterialUI) {%>
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
const DeleteConfirmationModal = ({ open, setOpen, userId, username }) => {
	return (
		<ViceModal show={open} title='Delete User?' handleClose={setOpen}>
			Are you sure you want to delete <b>{username}</b> ?
			<br></br>
			<Box
				display='flex'
				justifyContent='flex-end'
				alignItems='flex-end'
			>
				<Button
					variant='contained'
					type='submit'
					color='error'
					onClick={() => {
						userId()
						setOpen(false)
					}}
				>
					Confirm
				</Button>
			</Box>
		</ViceModal>
	)
}
<%}%>
export default DeleteConfirmationModal

