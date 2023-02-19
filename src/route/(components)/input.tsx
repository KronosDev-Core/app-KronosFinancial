import ErrorIcon from '@Assets/icons/Error';
import { InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children?: JSX.Element;
  callback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: FieldError | string | undefined;
  register?: any;
}

export default function Input({
  name,
  children,
  callback,
  error,
  register,
  ...rest
}: InputProps) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  return (
    <div
      className={
        'm-auto bg-slate-700 rounded-md shadow-sm h-fit py-1 px-2 lining-nums tabular-nums w-[70%] ' +
        (error ? ' ring-offset-4 ring-offset-slate-800 ring-2 ring-red-500' : '')
      }
    >
      <div className="flex">
        {children ? (
          <span className="flex justify-center items-start">{children}</span>
        ) : null}
        <div className="grow py-2 px-1">
          <input
            className={
              'placeholder:italic bg-slate-700 rounded-md focus:outline-none px-1 w-full ' +
              rest.className +
              (error && hover ? ' w-0' : '')
            }
            placeholder={`${rest.placeholder || name}...`}
            type="text"
            onChange={callback}
            {...(register
              ? register(name, {
                  valueAsNumber: rest.type === 'number',
                })
              : undefined)}
          />
          {error && hover && (
            <span className="text-red-500">{typeof error !== 'string' ? `${error.message}: ${error.type}`:error}</span>
          )}
        </div>
        <span className="flex justify-center items-start">
          <ErrorIcon
            className={"h-6 w-6 m-auto " + (error ? 'fill-red-500' : ' fill-transparent')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </span>
      </div>
    </div>
  );
}
