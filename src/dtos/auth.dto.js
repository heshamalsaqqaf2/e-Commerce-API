class AuthDTO {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.roles = user.roles;
        this.isVerified = user.isVerified;
    }
}

export default AuthDTO;