import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children: JSX.Element;
  callback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  register?: any;
}

const Input: FC<InputProps> = ({
  name,
  children,
  callback,
  error,
  register,
  ...rest
}: InputProps): JSX.Element => (
  <label className="relative flex flex-col m-auto h-full">
    <span className="absolute inset-y-0 left-0 flex items-center pl-2 grow-0">
      {children}
    </span>
    <input
      className={
        'placeholder:italic block bg-slate-700 w-full rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none lining-nums tabular-nums grow-1 h-fit ' +
        rest.className
      }
      placeholder={`${rest.placeholder || name}...`}
      type="text"
      onChange={callback}
      {...(register ? register(name, {
        valueAsNumber: rest.type === 'number',
      }) : undefined)}
    />
    <span className="text-red-500">{error}</span>
  </label>
);

export default Input;
