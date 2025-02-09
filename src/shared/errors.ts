export type Error = {
    status: number;
    message: string;
    prettyMessage: string;
}

const errors: Map<number, Error> = new Map([
    [400, { status: 400, message: 'Bad Request', prettyMessage: 'Invalid request' }],
    [401, { status: 401, message: 'Unauthorized', prettyMessage: 'You are not authorized to access this resource' }],
    [403, { status: 403, message: 'Forbidden', prettyMessage: 'You are forbidden from accessing this resource' }],
    [404, { status: 404, message: 'Not Found', prettyMessage: 'The requested resource was not found' }],
    [500, { status: 500, message: 'Internal Server Error', prettyMessage: 'An error occurred while processing your request' }]
]);