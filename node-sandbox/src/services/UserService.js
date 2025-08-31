export default class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    getUsers() {
        try {
            return this.userRepository.getAllUsers();
        } catch (error) {
            console.error("❌ Error in getUsers():", error);
            throw error; // Rethrow error to catch it in the route
        }
    }
}
