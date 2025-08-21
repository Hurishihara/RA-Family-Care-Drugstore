
interface User {
    id: string;
    name: string;
    role: 'Admin' | 'Staff';
}

export type { User };