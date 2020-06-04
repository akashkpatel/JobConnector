
export interface IError{
    status : number,
    message: string,
}


export class ErrorObject{
    
    public message: string = "";
    public status : number;
    constructor(options : IError){
        this.message = options.message;
        this.status = options.status;
    }

    /**
     * getMessage
     */
    public getMessage() : string{
        return this.message;
    }

    /**
     * getStatus
     */
    public getStatus() : number {
        return this.status
    }

} 