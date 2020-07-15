import { Photo } from './photo.interface';

export interface User {
    id: number;
    userName: string;
    gender: string;
    age: number;
    knowAs: string;
    created: Date;
    lastActive: Date;
    city: string;
    country: string;
    photoUrl: string;
    lookingFor?: string;
    photos?: Photo[];
    password: string;
}


