import { ChevronsUpDownIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar'
import type { User } from '@/types/user.type'
import { api } from '@/utils/axios.config'
import { useNavigate } from 'react-router'

const NavUser = ({
    user
}: {
    user: Omit<User, 'id'>
}) => {
    
    const { isMobile } = useSidebar();
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout')
            navigate('/login');
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size='lg' className='cursor-pointer'>
                            <UserIcon style={{ width: 18, height: 18 }} className='text-deep-sage-green-700' />
                            <div className='grid flex-1 text-left text-sm leading-tight font-primary'>
                                <span className='truncate font-medium'>{user.name}</span>
                                <span className='truncate text-xs'>{user.role}</span>
                            </div>
                            <ChevronsUpDownIcon className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg' side={isMobile ? 'bottom' : 'right'} align='end' sideOffset={4}>
                        <DropdownMenuLabel className='flex flex-row p-0 items-center gap-0 font-normal'>
                            <div className='flex items-center gap-2 px-1 py-1.5 text-left'>
                                <UserIcon style={{ width: 20, height: 20 }} className='text-deep-sage-green-700' />
                            </div>
                            <div className='grid flex-1 text-left leading-tight font-primary'>
                                <span className='truncate text-medium font-medium'>{user.name}</span>
                                <span className='truncate text-xs'>{user.role}</span>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
                            <LogOutIcon />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default NavUser;