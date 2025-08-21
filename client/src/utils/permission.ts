import { ROLES, type Permission } from '@/types/permission.type'
import type { User } from '@/types/user.type'

const hasPermission = (user: User, permission: Permission): boolean => {
    return (ROLES[user.role || []] as readonly Permission[]).includes(permission)
}

export { hasPermission }