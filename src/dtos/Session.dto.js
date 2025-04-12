class SessionDto {
    constructor(session) {
        this.id = session._id;
        this.userId = session.userId;
        this.device = session.device;
        this.accessToken = session.accessToken;
        this.refreshToken = session.refreshToken;
        this.expiresAt = session.expiresAt;
        this.isRevoked = session.isRevoked;
        this.createdAt = session.createdAt;
        this.updatedAt = session.updatedAt;
        
    }
}