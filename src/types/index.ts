export interface Launch {
    mission_name: string,
    details: string,
    launch_image: string,
}

export interface NewLaunch {
    mission_name: string,
    details: string,
    form: PhotoForm,
}

export interface PhotoForm {
    type: string,
    name: string, 
    uri: string,
}

export interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
}