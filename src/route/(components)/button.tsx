import { ButtonHTMLAttributes, MouseEvent } from 'react';

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
  callback: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export default function Button({
  name,
  children,
  callback,
  ...rest
}: InputProps) {
  return (
    <button
      className={
        'px-4 py-2 font-semibold bg-slate-700 rounded shadow-lg h-fit my-auto ' +
        rest.className
      }
      onClick={callback}
    >
      {children}
    </button>
  );
}
