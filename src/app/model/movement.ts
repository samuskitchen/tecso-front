import { Account } from './account';

export class Movement {
    id: number;
    typeMovement: string;
    date: Date;
    description: string;
    amount: number;
    account: Account;
}