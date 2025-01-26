import { useFormContext } from 'react-hook-form';
import { Fragment } from 'react';
type InputProps = {
  name: string;
  placeholder: string;
  id: string;
  error?: string | null;
  label: string;
};

export default function Input({
  name,
  placeholder,
  id,
  error,
  label,
}: InputProps) {
  const { register } = useFormContext();

  return (
    <Fragment>
      <div className="flex flex-col space-y-2">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          {...register(name)}
          id={id}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </Fragment>
  );
}
