import React from "react";

const Button = ({
  onClick,
  type = "default", // types can be 'default', 'primary', 'disabled'
  disabled = false,
  children,
}) => {
  const baseStyle =
    "py-1.5 px-4 rounded-lg text-white font-medium focus:outline-none transition-colors duration-300";

  const getButtonStyle = () => {
    if (disabled) {
      return `${baseStyle} bg-[#7C36D6] opacity-50`;
    }

    switch (type) {
      case "secondary":
        return `${baseStyle} bg-[#494C55]`
      default:
        return `${baseStyle} bg-[#7C36D6] hover:bg-purple-700`;
    }
  };

  return (
    <button
      className={getButtonStyle()}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
