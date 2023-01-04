import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children: JSX.Element;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const Input: FC<InputProps> = ({
  name,
  children,
  callback,
  error,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <label className="relative block mx-auto w-2/4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        {children}
      </span>
      <input
        className="placeholder:italic block bg-slate-700 w-full rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none lining-nums tabular-nums"
        placeholder={`${name}...`}
        type="text"
        onChange={callback}
      />
      <span className="text-red-500">{error}</span>
    </label>
  );
};

export default Input;
