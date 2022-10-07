import { Button as BSButton } from "react-bootstrap";

const Button = ({ name, color, onClick, size }) => {
    return (
        <BSButton variant={color} onClick={onClick} size={size}>
            {name}
        </BSButton>
    );
};

export default Button;
