type Data = {
    [key: string]: any;
}

export type ReturnRes = {
    status: number;
    message: string;
    prettyMessage: string;
    data?: Data;
}