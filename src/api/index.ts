export const getLaunchesRequest = async () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch("https://api.spacexdata.com/v3/launches", requestOptions)
    return response.json()
}

export const addLaunchRequest = () => {
    // this is our stub that just returns an empty object
    return {};
}