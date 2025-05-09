import { useRouteError } from 'react-router-dom';
import { Button } from './ui';

interface RouteError {
  message: string;
}

const Error = () => {
  const error = useRouteError() as RouteError;
  return (
    <section className='h-screen grid place-items-center gap-4 max-w-3xl m-auto'>
      <div className='text-center space-y-5'>
        <h1 className='font-medium text-lg'>Something went wrong!</h1>
        <p className='text-sm'>{error.message}</p>
        <Button className='m-auto px-12' onClick={() => window.location.replace('/')}>Try again</Button>
      </div>
    </section>
  );
};

export default Error;
