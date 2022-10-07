import { Form } from "react-bootstrap";

function Input({ placeholder, type, onChange, id, value, name }) {
    return (
        <Form.Control
            placeholder={placeholder}
            type={type}
            id={id}
            onChange={onChange}
            value={value}
            name={name}
        />
    );
}

export default Input;
