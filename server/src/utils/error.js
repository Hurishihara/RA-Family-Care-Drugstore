class CustomError extends Error {
    statusCode;
    constructor(title, description, statusCode) {
        super(description);
        this.description = description;
        this.title = title;
        this.statusCode = statusCode;
    }
}

export default CustomError;