import User from "../modules/user.js";

export default class UserRepository {
    getAllUsers() {
        return User.find(undefined, undefined, undefined)
            .select({
                firstName: 1,
                email: 1,
                mobile: 1,
                address: 1,
                region: 1,
                zipCode: 1,
                _id: 1
            });
    }
}