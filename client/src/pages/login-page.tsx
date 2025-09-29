import { CircleCheckIcon, CircleXIcon, TabletsIcon, WifiOffIcon } from 'lucide-react';
import sampleLoginCover from '../assets/minimalist-login-cover.jpg'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { loginSchema } from '@/schemas/login.schema';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import type { loginFormType } from '@/types/login.type';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/auth.hook';
import type { User } from '@/types/user.type';
import { toast } from 'sonner';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useApiMutation } from '@/hooks/use-api';

const LoginPage = () => {

    const { setIsAuthenticated, setUser } = useAuth();
    const navigate = useNavigate();
    const loginForm = useForm<loginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userName: '',
            password: ''
        }
    })
    
    const { mutate } = useApiMutation<{
        message: string;
        user: User;
    }, unknown, loginFormType>(
        {
            url: '/auth/login',
            method: 'POST',
        },
        {
            onSuccess: ({ message, user }) => {
                setIsAuthenticated(true);
                setUser(user);
                toast(message, {
                    classNames: {
                        title: '!font-primary !font-bold !text-deep-sage-green-500 text-md',
                        description: '!font-primary !font-medium !text-muted-foreground text-xs'
                    },
                    icon: <CircleCheckIcon className='w-5 h-5 text-deep-sage-green-500' />,
                    description: `Welcome back, ${user.name}!`,
                })
                navigate('/inventory');
            },
            onError: (err, _variables, _context) => {
                if (axios.isAxiosError(err)) {
                    const error = err.response?.data as ErrorResponse;
                    toast(error.title, {
                        classNames: {
                            title: '!font-primary !font-bold !text-red-500 text-md',
                            description: '!font-primary !font-medium !text-muted-foreground text-xs'
                        },
                        icon: <CircleXIcon className='w-5 h-5 text-red-500' />,
                        description: error.description,
                    })
                    return;
                }
                const error = err as ErrorResponse;
                toast(error.title, {
                    classNames: {
                        title: '!font-primary !font-bold !text-red-500 text-md',
                        description: '!font-primary !font-medium !text-muted-foreground text-xs'
                    },
                    icon: <WifiOffIcon className='w-5 h-5 text-red-500' />,
                    description: error.description,
                })
                return;
            }
        }
    )
    
    const handleLogin = async (data: loginFormType) => {
        mutate(data);
    }

    return (
        <>
            <div className='grid grid-cols-12 h-screen flex items-center overflow-hidden'>
                <div className='base:col-span-12 lg:col-span-6 flex justify-center base:px-2 lg:px-0'>
                    <div className='flex flex-col base:items-center lg:items-start gap-10'>
                        <div className='flex flex-row gap-2'>
                            <TabletsIcon className='base:w-6 lg:w-9 base:h-6 lg:w-9 rounded-lg text-deep-sage-green-700' />
                            <h1 className='base:text-lg basexl:text-lg xs:text-lg sm:text-lg md:text-lg lg:text-2xl font-primary font-black text-deep-sage-green-950'>RA Family Care</h1>
                        </div>
                        <div className='flex flex-col gap-3 items-center w-full'>
                            <h1 className='base:text-2xl lg:text-4xl font-primary font-bold text-deep-sage-green-950'>Access the Pharmacy System</h1>
                            <p className='text-muted-foreground base:max-w-xs lg:max-w-xl text-center font-primary font-normal base:text-xs lg:text-sm'>
                                Please enter your username and password to manage inventory and records.
                            </p>
                        </div>
                        <Form {...loginForm}>
                            <form id='login-form' onSubmit={loginForm.handleSubmit(handleLogin)}>
                                <div className='flex flex-col gap-5 w-100'>
                                    <FormField control={loginForm.control} name='userName' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-primary font-semibold text-deep-sage-green-950'>Username</FormLabel>
                                            <FormControl>
                                                <Input 
                                                className='p-6 font-primary font-medium ring-0 border-2 focus:!border-deep-sage-green-700 focus-visible:ring-offset-0 focus-visible:ring-0' 
                                                placeholder='e.g, Staff001' 
                                                type='text' 
                                                {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                                    <FormField control={loginForm.control} name='password' render={({ field }) => (
                                        <FormItem>
                                            <FormLabel 
                                            className='font-primary font-semibold text-deep-sage-green-950'>Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                className='p-6 font-primary font-medium border-2 focus:!border-deep-sage-green-700 focus-visible:ring-offset-0 focus-visible:ring-0' 
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
                <div className='base:hidden lg:block col-span-6 w-full h-full'>
                    <AspectRatio ratio={4/3} className='h-screen rounded-lg  base:p-0 2xl:p-5'>
                        <img src={sampleLoginCover} alt="Login Cover" className='base:rounded-none 2xl:rounded-3xl object-cover w-full h-full' />
                    </AspectRatio>
                </div>
            </div>
        </>
    )
}

export default LoginPage;
