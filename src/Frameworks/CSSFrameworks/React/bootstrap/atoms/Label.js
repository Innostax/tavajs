import { Form } from "react-bootstrap";

const Label = ({ title }) => {
    return (
        <Form.Label>
            <b>{title}</b>
        </Form.Label>
    );
}

export default Label;
