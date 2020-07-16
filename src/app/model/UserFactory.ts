import { UserType } from './UserType';
import { User } from './User';
import { Admin } from './Admin';
import { Company } from './Company';
import { Customer } from './Customer';

export class UserFactory {

    public static get(type: string): User {
        switch (type) {
            case UserType.ADMIN:
                return new Admin();
            case UserType.COMPANY:
                return new Company();
            case UserType.CUSTOMER:
                return new Customer();
            default:
                throw new Error(`Unsupported user type ${type}`);
        }
    }

}
