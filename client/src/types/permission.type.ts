type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
    Admin: [
        'view:dashboard',
        'view:inventory',
        'view:sales',
        'view:users',
        'view:auditLog',
        'view:inventoryActions',
        'create:inventory',
        'create:sales',
        'update:inventory',
        'update:sales',
        'delete:inventory',
        'delete:sales',
    ],
    Staff: [
        'view:dashboard',
        'view:inventory',
        'view:sales'
    ]
} as const;

export { ROLES, type Role, type Permission };