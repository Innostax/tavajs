import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function TavaJSModal({
    children,
    shouldOpen,
    handleClose,
    title,
}) {
    return (
        <div>
            <Dialog open={shouldOpen} onClose={handleClose} fullWidth>
                <DialogTitle>
                    {title}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 12,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </div>
    );
}
