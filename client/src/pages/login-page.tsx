import { CircleCheckIcon, CircleXIcon, TabletsIcon, WifiOffIcon } from 'lucide-react';
import sampleLoginCover from '../assets/minimalist-login-cover.jpg'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { loginSchema } from '@/schemas/login.schema';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import type { loginFormType } from '@/types/login.type';
import { api } from '@/utils/axios.config';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/auth.hook';
import type { User } from '@/types/user.type';
import { toast } from 'sonner';
import axios from 'axios';
import type { ErrorResponse } from '@/types/error.response';

const LoginPage = () => {

    const { setIsAuthenticated, setUser } = useAuth();
    const navigate = useNavigate();
    const loginForm = useForm<loginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const handleLogin = async (data: loginFormType) => {
        try {
            const res = await api.post<{
                message: string;
                user: User;
            }>('/auth/login', {
                userName: data.username,
                password: data.password
            });
            setIsAuthenticated(true);
            setUser(res.data.user);
            toast('Login successful!', {
                classNames: {
                    title: '!font-primary !font-bold !text-deep-sage-green-500 text-md',
                    description: '!font-primary !font-medium !text-muted-foreground text-xs'
                },
                icon: <CircleCheckIcon className='w-5 h-5 text-deep-sage-green-500' />,
                description: `Welcome back, ${res.data.user.name}!`,
            })
            navigate('/inventory');
            
        }
        catch (err) {
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

    return (
        <>
            <div className='grid grid-cols-12 h-screen overflow-hidden '>
                <div className='col-span-6 flex justify-center'>
                    <div className='flex flex-col items-start gap-10 mt-60'>
                        <div className='flex flex-row gap-2 items-center'>
                            <TabletsIcon className='w-9 h-9 rounded-lg text-deep-sage-green-700' />
                            <h1 className='text-2xl font-primary font-black text-deep-sage-green-950'>RA Family Care</h1>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-4xl font-primary font-bold text-deep-sage-green-950'>Access the Pharmacy System</h1>
                            <p className='text-muted-foreground max-w-lg font-primary font-normal'>
                                Please enter your username and password to manage inventory and records.
                            </p>
                        </div>
                        <Form {...loginForm}>
                            <form id='login-form' onSubmit={loginForm.handleSubmit(handleLogin)}>
                                <div className='flex flex-col gap-5 w-100'>
                                    <FormField control={loginForm.control} name='username' render={({ field }) => (
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
                <div className='col-span-6 '>
                    <img src={sampleLoginCover} alt="Login Cover" className='h-231 rounded-[4rem] p-10 w-screen' />
                </div>
            </div>
        </>
    )
}

export default LoginPage;
