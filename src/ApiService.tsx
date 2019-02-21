import axios from 'axios';

const baseURL: string = 'https://is79lkyzsj.execute-api.eu-west-1.amazonaws.com/dev/';


export async function getPositions(id: number, callback: Function) {
    await axios.get(baseURL + 'positions/device?deviceId=' + id).then((response) => {
            let data = response.data;
            if (response.status === 200 && data != '[]') {
                let result = data
                    .map((item: any, index: any) => {
                        // Accetto un pin position ogni 10
                        if (index % 10 == 0) {
                            return item;
                        }
                        // Accetto  quelli important
                        if(item.state!=""){
                            let state = JSON.parse(item.state);
                            if(state.color == 'red') {
                                return item;
                            }
                        }
                        // Scarto il resto
                        return null;
                    })
                    .filter((item: any) => {
                        return item;
                    });
                response.data = result;
                callback(response);
            } else {
                response.data = "notfound";
                callback(response);
            }
        }
    );

}

export async function getEvents(id: number, callback: Function) {
    await axios.get(baseURL + 'events/device?deviceId=' + id).then((response) => {
            if (response.status === 200 && response.data != '[]') {
                callback(response);
            } else {
                response.data = "notfound";
                callback(response);
            }
        }
    );

}

export async function getTravels(id: number, callback: Function) {
    await axios.get(baseURL + 'travels/device?deviceId=' + id).then((response) => {
            if (response.status === 200 && response.data != '[]') {
                callback(response);
            } else {
                response.data = "notfound";
                callback(response);
            }
        }
    );

}

export async function getDevices(callback: Function) {
    await axios.get(baseURL + 'devices').then((response) => {
            if (response.status === 200 && response.data != '[]') {
                callback(response);
            } else {
                response.data = "notfound";
                callback(response);
            }
        }
    );
} 





