import { TabletsIcon } from 'lucide-react';
import sampleLoginCover from '../assets/sample-login-cover.jpg'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { loginSchema } from '@/schemas/loginSchema';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

const LoginPage = () => {

    const loginForm = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    return (
        <>
            <div className='grid grid-cols-12 h-screen overflow-hidden'>
                <div className='col-span-6 flex justify-center'>
                    <div className='flex flex-col items-start gap-10 mt-60'>
                        <div className='flex flex-row gap-2 items-center'>
                            <TabletsIcon className='w-9 h-9 rounded-lg text-deep-sage-green-700' />
                            <h1 className='text-2xl font-primary font-black text-deep-sage-green-950'>RA Family Care</h1>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-4xl font-secondary font-bold text-deep-sage-green-950'>Access the Pharmacy System</h1>
                            <p className='text-muted-foreground max-w-lg font-secondary font-normal'>
                                Please enter your username and password to manage inventory and records.
                            </p>
                        </div>
                        <Form {...loginForm}>
                            <form id='login-form'>
                                <div className='flex flex-col gap-5 w-100'>
                                    <FormField control={loginForm.control} name='username' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-secondary font-semibold text-deep-sage-green-950'>Username</FormLabel>
                                            <FormControl>
                                                <Input 
                                                className='p-6 font-secondary font-medium ring-0 border-2 focus:!border-deep-sage-green-700 focus-visible:ring-offset-0 focus-visible:ring-0' 
                                                placeholder='e.g, Staff001' 
                                                type='text' 
                                                {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                                    <FormField control={loginForm.control} name='password' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel 
                                            className='font-secondary font-semibold text-deep-sage-green-950'>Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                className='p-6 font-secondary font-medium border-2 focus:!border-deep-sage-green-700 focus-visible:ring-offset-0 focus-visible:ring-0' 
                                                placeholder='Enter your password' 
                                                type='password' 
                                                {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                                    <Button 
                                    type='submit' 
                                    className='font-secondary font-semibold text-md rounded-md p-5 bg-deep-sage-green-700 hover:bg-deep-sage-green cursor-pointer'>
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className='col-span-6'>
                    <img src={sampleLoginCover} alt="Login Cover" className='h-231 w-full' />
                </div>
            </div>
        </>
    )
}

export default LoginPage;
// This is a simple login page component for a React application.