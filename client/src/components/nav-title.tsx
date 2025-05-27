import { TabletsIcon } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"

const NavTitle = () => {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size='lg' tooltip='RA Family Care' asChild>
                    <a href='#'>
                        <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-sidebar-primary-foreground hover:bg-sidebar-accent'>
                            <TabletsIcon className='size-5 text-deep-sage-green-700' />
                        </div>
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-primary font-black text-black'>RA Family Care</span>
                            <span className='truncate text-xs font-primary font-normal text-black'>Pharmacy</span>
                        </div>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default NavTitle