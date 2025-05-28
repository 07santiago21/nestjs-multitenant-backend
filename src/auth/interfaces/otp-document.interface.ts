import { ObjectId} from "mongodb";

export interface OtpDocument{
    _id?:ObjectId;
    idUser:ObjectId;
    otp:string;
    createdAt:Date
}