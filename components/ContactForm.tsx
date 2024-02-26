"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(5, { message: 'Message must be at least 5 characters long' }),
});

const ContactForm = () => {
  const { register, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <>
      <ToastContainer />
      <Form 
      action={'/api/contact'}
      onSuccess={() => {
        toast.success('Mensagem enviada com sucesso!');
      }}
      onError={() => {
        toast.error('Erro ao enviar a mensagem');
      }}
      control={control}
      encType={'application/json'}
      className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input {...register('name', { required: 'Name is required' })} id="name" className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} type="text" />
          {errors.name ? (
            <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} id="email" className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} type="email" />
          {errors.email ? <p className="text-red-500 text-xs italic">{errors.email?.message}</p> : null}
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
          <textarea {...register('message', { required: 'Message is required' })} id="message" className={`shadow appearance-none border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} />
          {errors.message ? <p className="text-red-500 text-xs italic">{errors.message?.message}</p> : null}
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
      </Form>
    </>
  );
}

export default ContactForm;
