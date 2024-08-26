'use client';
import { useState } from 'react';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setIsSubmitting(false);
            setError('An unexpected errror occurred.');
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register('title')}>
          {/* <TextField.Input placeholder="Title" /> */}
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
