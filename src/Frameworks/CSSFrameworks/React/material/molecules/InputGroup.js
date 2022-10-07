import Input from "../atoms/Input";

const InputGroup = ({ title, placeholder, type, onChange, id, value, name }) => {
    return (
        <Input
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            id={id}
            value={value}
            name={name}
            title={title}
        />
    );
}

export default InputGroup;
