import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import Input from '../../Input/input.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { PageProps } from '../../../types';

const FamilyForm = z.object({
  family: z.array(
    z.object({
      name: z.string().min(2),
      age: z.string().min(1),
      job: z.string().min(2),
      relation: z.string().min(2),
    })
  ),
});

type FamilyFormType = z.infer<typeof FamilyForm>;

export default function FamilyInformation({
  handleNext,
  values,
  handleBack,
}: PageProps) {
  const methods = useForm({
    defaultValues: {
      family: [{ name: '', age: '', job: '', relation: '' }],
    },
    values: { family: [{ name: '', age: '', job: '', relation: '' }] },
    resolver: zodResolver(FamilyForm),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'family',
    control: methods.control,
  });

  const onBack = () => {
    handleBack({ family: methods.getValues().family });
  };

  const handleSubmit = (data: FamilyFormType) => {
    handleNext(data);
  };

  useEffect(() => {
    methods.reset(values);
    // eslint-disable-next-line
  }, [methods.reset, values]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold w-full">Family Information</h1>
          <button
            type="button"
            onClick={() => append({ name: '', age: '', job: '', relation: '' })}
            className="py-2 px-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 w-full disabled:bg-gray-300"
            disabled={fields.length === 2}
          >
            Add Family Member
          </button>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex-col flex mb-3">
            <div className="mb-3">
              <Input
                name={`family[${index}].name`}
                placeholder="Enter Name"
                key={`family[${index}].name`}
                id={`family[${index}].name`}
                label="Name"
                error={
                  methods.formState.errors.family?.[index]?.name?.message || ''
                }
              />
            </div>
            <div className="mb-3">
              <Input
                name={`family[${index}].age`}
                placeholder="Enter Age"
                key={`family[${index}].age`}
                id={`family[${index}].age`}
                label="Age"
                error={
                  methods.formState.errors.family?.[index]?.age?.message || ''
                }
              />
            </div>
            <div className="mb-3">
              <Input
                name={`family[${index}].job`}
                placeholder="Enter Job"
                key={`family[${index}].job`}
                id={`family[${index}].job`}
                label="Job"
                error={
                  methods.formState.errors.family?.[index]?.job?.message || ''
                }
              />
            </div>
            <div className="mb-3">
              <Input
                name={`family[${index}].relation`}
                placeholder="Enter Relation"
                key={`family[${index}].relation`}
                id={`family[${index}].relation`}
                label="Relation"
                error={
                  methods.formState.errors.family?.[index]?.relation?.message ||
                  ''
                }
              />
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="py-2 px-2 bg-red-300 text-red-800 font-semibold rounded-lg hover:bg-red-400 transition duration-200 w-full"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex justify-between items-center gap-6">
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
    </FormProvider>
  );
}
