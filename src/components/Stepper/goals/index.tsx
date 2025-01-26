import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { PageProps } from '../../../types';

const data = [
  {
    key: 'rich',
    value: 'Become rich',
  },
  {
    key: 'famous',
    value: 'Become famous',
  },
  {
    key: 'happy',
    value: 'Become happy',
  },
];

const GoalsForm = z.object({
  goals: z.string({ message: 'Select your goal' }),
});

type GoalsFormType = z.infer<typeof GoalsForm>;

export default function Index({ handleBack, values, handleNext }: PageProps) {
  const {
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      goals: '',
    },
    resolver: zodResolver(GoalsForm),
  });

  const handleSelected = (key: string) => {
    setValue('goals', key);
  };

  useEffect(() => {
    reset(values);
  }, [reset, values]);

  const onSubmit = (data: GoalsFormType) => {
    handleNext(data);
  };

  const onBack = () => {
    handleBack({ goals: watch('goals') });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul className="space-y-3 mb-3">
        {data.map(({ key, value }) => (
          <li
            key={key}
            onClick={() => handleSelected(key)}
            className={`cursor-pointer py-2 px-2 ${watch('goals') === key ? 'bg-blue-600 text-white hover:text-white' : 'bg-gray-300'} rounded-lg hover:bg-blue-100 hover:text-blue-600 transition duration-200`}
          >
            {value}
          </li>
        ))}
      </ul>
      {errors && (
        <p className="text-red-500 text-xs m-0 mb-3">{errors.goals?.message}</p>
      )}
      <div className="flex gap-6">
        <button
          type="button"
          onClick={onBack}
          className="py-2 px-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition duration-200 w-full"
        >
          Back
        </button>
        <button
          type="submit"
          className="py-2 px-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 w-full"
        >
          Next
        </button>
      </div>
    </form>
  );
}
