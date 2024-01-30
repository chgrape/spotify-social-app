const DropdownChoice = ({name, handleChange, setIsOpen}) => {
    return (
        <button
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    handleChange(e);
                }}
                className="block px-4 py-2 rounded-lg hover:bg-neutral-600 text-left w-full"
              >
                {name}
        </button>
    );
}

export default DropdownChoice;