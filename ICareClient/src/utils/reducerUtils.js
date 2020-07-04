import {isLength} from "./utils";

export function updateEntityList(entityList = [], entityToUpdate = Object) {
    if (isLength(entityList)) {
        return entityList.map(entity => {
            if (entity.id === entityToUpdate.id) {
                return entityToUpdate;
            } else {
                return entity;
            }
        });
    } else {
        return [];
    }
}
