import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../Input/input.tsx';
import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PageProps } from '../../../types';

const InformationForm = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  age: z.string().min(1),
  email: z.string().email().min(2),
  job: z.string().min(2),
});

type InformationFormType = z.infer<typeof InformationForm>;

export default function Index({ handleNext, values }: PageProps) {
  const methods = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      job: '',
    },
    mode: 'all',
    resolver: zodResolver(InformationForm),
  });

  useEffect(() => {
    methods.reset(values);
    // eslint-disable-next-line
  }, [methods.reset, values]);

  const onSubmit = (data: InformationFormType) => {
    handleNext(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex-col flex mb-3">
          <Input
            name="firstName"
            placeholder="Enter First Name"
            key="firstName"
            id="firstName"
            error={
              methods.formState.errors.firstName
                ? (methods.formState.errors.firstName.message as string)
                : ''
            }
            label="First Name"
          />
        </div>
        <div className="flex-col flex mb-3">
          <Input
            name="lastName"
            placeholder="Enter Last Name"
            key="lastName"
            id="lastName"
            error={
              methods.formState.errors.lastName
                ? (methods.formState.errors.lastName.message as string)
                : ''
            }
            label="Last Name"
          />
        </div>
        <div className="flex flex-col mb-3">
          <Input
            name="age"
            placeholder="Enter Age"
            key="age"
            id="age"
            error={
              methods.formState.errors.age
                ? (methods.formState.errors.age.message as string)
                : ''
            }
            label="Age"
          />
        </div>
        <div className="flex flex-col mb-3">
          <Input
            name="email"
            placeholder="Enter Email"
            key="email"
            id="email"
            error={
              methods.formState.errors.email
                ? (methods.formState.errors.email.message as string)
                : ''
            }
            label="Email"
          />
        </div>
        <div className="flex flex-col mb-3">
          <Input
            name="job"
            placeholder="Enter Job"
            key="job"
            id="job"
            error={
              methods.formState.errors.job
                ? (methods.formState.errors.job.message as string)
                : ''
            }
            label="Job"
          />
        </div>
        <button
          type="submit"
          className="py-2 px-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 w-full"
        >
          Next
        </button>
      </form>
    </FormProvider>
  );
}
