"use client"

import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Mensagem enviada com sucesso!');
      } else {
        console.error('Erro ao enviar a mensagem:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Message:</label>
        <textarea {...register('message', { required: 'Message is required' })} />
        {errors.message && <span>{errors.message.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
