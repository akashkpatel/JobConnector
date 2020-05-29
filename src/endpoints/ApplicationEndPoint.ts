import {Application} from "express";
export interface ApplicationEndPoint  {
    /**
     * registerRoutes
     */
    registerRoutes(app : Application) : void;
    initialize():void;
}

