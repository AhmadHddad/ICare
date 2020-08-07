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

export const formatParameterizedURL = (formattedURL, replacementsObj) => {
    return formattedURL.replace(
        /{\w+}/g,
        placeholder =>
            replacementsObj[placeholder.substring(1, placeholder.length - 1)] ?? placeholder
    );
};

/**
 * @function openURLInNewTab
 * @description will open the passed url in new tap and check if it stats with http or https
 * @param {stringToCheck} url
 */
export const openURLInNewTab = url => {
    if (url?.startsWith("http://") || url?.startsWith("https://")) {
        window.open(url, "_blank");
    } else {
        window.open("http://" + url, "_blank");
    }
};

/**
 * @function isUndefinedOrNull
 * @description will check if the param is undefined or null;
 * @param {Any} param
 * @returns {boolean}
 */
export const isUndefinedOrNull = param => param === undefined || param === null;

/**
 * @function arePropsEqual
 * @description will check if prevProps and nexProps values from keysArr are equal
 * @param {object} prevProps
 * @param {object} nexProps
 * @param {Array} keysArr
 * @param {bool} checkStyleProps
 * @returns {boolean}
 */
export const arePropsEqual = (keysArr = [], checkStyleProps = true) => (prevProps, nexProps) => {
    let arr = keysArr;

    if (checkStyleProps) {
        arr = keysArr.concat("className", "classes", "disabled");
    }

    return !areChanged(prevProps, nexProps, arr);
};

/**
 * @function arePropsEqual
 * @description will check if prevObj and nextObj values from keysArr are changed;
 * @param {object} prevObj
 * @param {object} nextObj
 * @param {Array} keysArr
 * @returns {boolean}
 */
export function areChanged(prevObj = {}, nextObj = {}, keysArr = []) {
    let changed = false;

    for (const key of keysArr) {
        if (
            JSON.stringify(prevObj[key], getCircularReplacer()) !==
            JSON.stringify(nextObj[key], getCircularReplacer())
        ) {
            changed = true;
            break;
        }
    }

    return changed;
}

/**
 * @function getCircularReplacer
 * @description will solve cyclic object value
 *  by checking if there is a recursion in the passes object;
 */
export function getCircularReplacer() {
    const seen = new WeakSet();

    return function (key, value) {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}
