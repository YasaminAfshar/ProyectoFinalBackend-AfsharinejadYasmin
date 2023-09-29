
export default class UserResponseDTO {
    constructor(user){
        this.fullName = `${user.firstName} ${user.lastName}`;
        this.email = user.email;
        this.role = user.role;
    }
}