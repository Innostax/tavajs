import TavaJSModal from "../../components/organisms/Modal";
<%if(isTailWind){%>
  import Button from '../../components/atoms/Button'
  const DeleteConfirmationModal = ({ shouldOpen, setOpen, handleDelete, userToBeDeleted }) => {
    const footer = (
      <Button
        name='Confirm'
        align='content-end'
        variant='rounded-lg text-white'
        color='bg-red-500'
        onClick={() => {
          handleDelete(userToBeDeleted.id)
          setOpen(false)
        }}
      />
    )
    return (
      <TavaJSModal
        open={shouldOpen}
        title='Delete User?'
        handleClose={setOpen}
        footer={footer}
      >
        Are you sure you want to delete <b>{userToBeDeleted.username}</b> ?
			<br></br>
      </TavaJSModal>
    )
  }
<%}%>
<% if(isBootstrap) {%>
import { Button } from "react-bootstrap"
const DeleteConfirmationModal = ({ shouldOpen, setOpen, handleDelete, userToBeDeleted }) => {
  const footer = (
    <div className="w-100">
      <Button
        variant="danger"
        type="submit"
        onClick={() => {
          handleDelete(userToBeDeleted.id);
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
    <TavaJSModal
      show={shouldOpen}
      title="Delete User?"
      handleClose={setOpen}
      footer={footer}
    >
      Are you sure you want to delete <b>{userToBeDeleted.username}</b> ?
    </TavaJSModal>
  );
};
<%}%>
<% if(isMaterialUI) {%>
import Button from '@mui/material/Button'
import Box from '@material-ui/core/Box'
const DeleteConfirmationModal = ({ shouldOpen, setOpen, handleDelete, userToBeDeleted }) => {
	return (
		<TavaJSModal show={shouldOpen} title='Delete User?' handleClose={setOpen}>
			Are you sure you want to delete <b>{userToBeDeleted.username}</b> ?
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
						handleDelete(userToBeDeleted.id)
						setOpen(false)
					}}
				>
					Confirm
				</Button>
			</Box>
		</TavaJSModal>
	)
}
<%}%>
export default DeleteConfirmationModal

