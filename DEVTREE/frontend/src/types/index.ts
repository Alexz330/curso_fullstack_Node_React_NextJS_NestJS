export type User = {
    name: string;
    email: string;
    handle: string;
    password: string;
    _id: string;
    description: string;
    image: string;
    links: string;
};

export type UserHandle = Pick<User, "description" | "image" | "links" | "name" | "handle">;
export type RegisterForm = Pick<User, "handle" | "email" | "name"> & {
    password: string;
    password_confirmation: string;
};

export type LoginForm = Pick<User, "email" | "password">;

export type ProfileForm = Pick<User, "handle" | "description">;

export type SocialNetwork = {
    id: number;
    name: string;
    url: string;
    enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetwork, "name" | "url" | "enabled">;