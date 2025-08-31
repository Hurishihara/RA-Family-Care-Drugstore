import * as React from 'react';
import { NavMain } from './nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { ActivityIcon, ClipboardIcon,  PillIcon, ReceiptIcon, UserCogIcon, UsersIcon } from 'lucide-react';
import NavTitle from './nav-title';
import NavUser from './nav-user';
import { useAuth } from '@/hooks/auth.hook';
import { hasPermission } from '@/utils/permission';
import type { Permission } from '@/types/permission.type';



const data = {
    navMain: [
        {
            title: 'Operations',
            icon: ActivityIcon,
            isActive: true,
            permissions: 'view:dashboard' as Permission,
            items: [
                {
                    title: 'Inventory',
                    url: '/inventory',
                    icon: PillIcon,
                },
                {
                    title: 'Orders',
                    url: 'orders',
                    icon: ReceiptIcon,
                }
            ]
        },
        {
            title: 'User Management',
            url: '#',
            icon: UserCogIcon,
            isActive: true,
            permissions: 'view:users' as Permission,
            items: [
                {
                    title: 'Users',
                    url: '#',
                    icon: UsersIcon,
                },
                {
                    title: 'Audit Log',
                    url: '#',
                    icon: ClipboardIcon,
                }
            ]
        }
    ]
}

export const AppSideBar = ({
    ...props
}: React.ComponentProps<typeof Sidebar>) => {
    const { user } = useAuth();

    const filteredNavMain = data.navMain.filter(section => {
        if (section.permissions && !hasPermission(user || { id: '1', name: 'Guest', role: 'Staff'}, section.permissions)) {
            return false;
        }
        return true;
    })

    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader className='bg-white'>
                <NavTitle />
            </SidebarHeader>
            <SidebarContent className='bg-white'>
                <NavMain items={filteredNavMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user || { id: '1', name: 'Guest', role: 'Staff' }} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
} 