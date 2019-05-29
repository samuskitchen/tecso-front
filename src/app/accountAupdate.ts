import { LegalPerson } from './legalPerson';
import { PhysicalPerson } from './physicalPerson';

export class AccountUpdate {

    "idAccount": number;
    "idLegalPerson": number;
    "idPhysicalPerson": number;
    "activeHolder": boolean;
    "legalPerson": LegalPerson;
    "physicalPerson": PhysicalPerson;
}