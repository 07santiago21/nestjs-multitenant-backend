import { ObjectId} from "mongodb";

export interface User{
    _id?:ObjectId;
    name:string;
    email:string;
    phone:number;
    role: 'admin'| 'delivery'
    db: string

    
}