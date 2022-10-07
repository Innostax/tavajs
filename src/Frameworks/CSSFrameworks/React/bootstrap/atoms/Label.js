import { Form } from "react-bootstrap";

function Label({ title }) {
    return (
        <Form.Label>
            <b>{title}</b>
        </Form.Label>
    );
}

export default Label;
