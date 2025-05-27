import { ChevronRightIcon, type LucideIcon } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

export const NavMain = ({
    items,
}: {
    items: {
        title: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
            icon?: LucideIcon;
        }[];
    }[];
}) => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className='font-primary text-md font-semibold text-black'>General</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible asChild key={item.title} defaultOpen={item.isActive} className='group/collapsible'>
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon style={{ height: 18, width: 18, color: '#2c503b' }} />}
                                    <span className='font-primary text-md font-medium text-black'> {item.title} </span>
                                    <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.url}>
                                                    {subItem.icon && <subItem.icon style={{ height: 18, width: 18, color: '#2c503b' }} />}
                                                    <span className='font-primary text-md font-normal text-black'> {subItem.title} </span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
} 