import { LegalPerson } from './legalPerson';
import { PhysicalPerson } from './physicalPerson';

export class Account {
    id: number;
    numberAccount: string;
    currency: string;
    balance: number;
    accountType: string;
    legalPerson: LegalPerson;
    physicalPerson: PhysicalPerson;
}