import React from "react";

interface Props {
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  value: string;
  showPassword?: boolean;
  isPassword?: boolean;
  handleShowPassword?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  showPassword,
  name,
  type,
  placeholder,
  value,
  label,
  isPassword,
  onChange,
  handleShowPassword,
}: Props) {
  const getType = () => {
    if (isPassword) {
      return showPassword ? "type" : "password";
    }
    return type;
  };

  return (
    <>
      <span className="text-gray-500">{label}</span>
      <div className="h-11 mt-2 flex justify-center items-center outline-1 outline outline-purple-500 focus-within:outline-2 rounded-lg p-1">
        <input
          name={name}
          type={getType()}
          className="w-full h-full rounded-lg outline-none"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {isPassword && (
          <p onClick={handleShowPassword} className="cursor-pointer">
            {showPassword ? "Hide" : "Show"}
          </p>
        )}
      </div>
    </>
  );
}

export default Input;
