import * as React from 'react';
import { AppSideBar } from '@/components/app-sidebar';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';


const CustomSidebar = ({ children }: { children: React.ReactNode}) => {
    return (
        <SidebarProvider>
            <AppSideBar />
                <SidebarInset>
                    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width, height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                        <div className='flex items-center gap-2 px-4'>
                            <SidebarTrigger className='-ml-1 text-deep-sage-green-700 hover:text-deep-sage-green-700' />
                        </div>
                    </header>
                    { children }
                </SidebarInset>
        </SidebarProvider>
    )
}

export default CustomSidebar;