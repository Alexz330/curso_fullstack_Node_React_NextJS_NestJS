export type User = {
    name: string;
    email: string;
    handle: string;
    password: string;
    _id: string;
    description: string;
};

export type RegisterForm = Pick<User, "handle" | "email" | "name"> & {
    password: string;
    password_confirmation: string;
};

export type LoginForm = Pick<User, "email" | "password">;