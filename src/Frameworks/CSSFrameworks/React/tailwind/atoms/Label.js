const Label = ({ title }) => {
    return (
        <label
            htmlFor='first_name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        >
            {title}
        </label>
    );
}
export default Label;
