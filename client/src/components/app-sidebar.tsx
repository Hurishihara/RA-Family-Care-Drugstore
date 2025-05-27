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


const data = {
    navMain: [
        {
            title: 'Operations',
            icon: ActivityIcon,
            isActive: true,
            items: [
                {
                    title: 'Inventory',
                    url: '#',
                    icon: PillIcon,
                },
                {
                    title: 'Sales',
                    url: '#',
                    icon: ReceiptIcon,
                }
            ]
        },
        {
            title: 'User Management',
            url: '#',
            icon: UserCogIcon,
            isActive: true,
            items: [
                {
                    title: 'Users List',
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
    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader className='bg-white'>
                <NavTitle />
            </SidebarHeader>
            <SidebarContent className='bg-white'>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
} 