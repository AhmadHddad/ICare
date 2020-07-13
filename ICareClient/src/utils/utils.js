export const toggle = (name, stateObj, callback) => event => {
    callback && callback(prev => ({...stateObj, [name]: !prev[name]}));
};

export function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

export function buildMap(obj = Object) {
    return new Map(Object.entries(obj));
}

export function isLength(objOrArr) {
    if (!objOrArr) return false;

    if (Array.isArray(objOrArr)) {
        return !!objOrArr.length;
    }

    if (typeof objOrArr === "object") {
        return !!Object.keys(objOrArr).length;
    }
}

export function replaceObj(arrObj = [], objToReplace = {}, key = "id") {
    return arrObj.map(obj => {
        if (obj[key] === objToReplace[key]) {
            return arrObj;
        } else {
            return obj;
        }
    });
}
