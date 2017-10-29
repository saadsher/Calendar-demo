export function remindersErrored(bool) {
    return {
        type: 'REMINDERS_ERRORED',
        errored: bool
    };
}

export function remindersLoading(bool) {
    return {
        type: 'REMINDERS_LOADING',
        loading: bool
    };
}

export function remindersNew(bool) {
    return {
        type: 'REMINDERS_ADDING_NEW',
        new: bool
    };
}

export function remindersShow(bool) {
    return {
        type: 'REMINDERS_SHOW',
        show: bool
    };
}

export function remindersPickDateTime(string) {
    return {
        type: 'REMINDERS_DATE_TIME',
        datetime: string
    };
}

export function remindersPickNewTitle(string) {
    return {
        type: 'REMINDERS_NEW_TITLE',
        newtitle: string
    };
}

export function remindersPickNewColour(string) {
    return {
        type: 'REMINDERS_NEW_COLOUR',
        newcolour: string
    };
}

export function remindersIndex(number) {
    return {
        type: 'REMINDERS_INDEX',
        index: number
    };
}

export function remindersPickEditTitle(string) {
    return {
        type: 'REMINDERS_EDIT_TITLE',
        edittitle: string
    };
}

export function remindersPickEditColour(string) {
    return {
        type: 'REMINDERS_EDIT_COLOUR',
        editcolour: string
    };
}

export function remindersFetchDataSuccess(reminders) {
    return {
        type: 'REMINDERS_FETCH_DATA_SUCCESS',
        reminders
    };
}

export function remindersAddDataSuccess(reminders) {
    return {
        type: 'REMINDERS_ADD_DATA_SUCCESS',
        reminders
    };
}

export function remindersUpdateDataSuccess(reminders) {
    return {
        type: 'REMINDERS_UPDATE_DATA_SUCCESS',
        reminders
    };
}

export function remindersRemoveDataSuccess(reminders) {
    return {
        type: 'REMINDERS_REMOVE_DATA_SUCCESS',
        reminders
    };
}

export function remindersFetchData(src) {
    return (dispatch) => {
        dispatch(remindersLoading(true));

        const simulateFetch = (src) => {
            return new Promise((resolve) => {
                resolve(src);
            });
        }

        simulateFetch(src)
            .then((response) => {
                dispatch(remindersLoading(false));
                return response;
            })
            .then((response) => dispatch(remindersFetchDataSuccess(response)))
            .catch(() => dispatch(remindersErrored(true)));
    };
}

export function remindersPickIndex(reminders, title) {
    return (dispatch) => {
        const index = reminders.findIndex((i) => i.title === title);

        dispatch(remindersIndex(index));
    }
}

export function remindersAdd(reminders, title, datetime, colour) {
    return (dispatch) => {
        const obj = {
            title,
            start: datetime,
            end: datetime,
            colour
        };

        if (obj.title === "") {
            obj.title = "New Event";
        }

        reminders.push(obj);

        dispatch(remindersAddDataSuccess(reminders));
    };
}

export function remindersUpdate(reminders, index, title, datetime, colour) {
    return (dispatch) => {
        const obj = {
            title,
            start: datetime,
            end: datetime,
            colour
        };

        if (obj.title === "") {
            obj.title = "New Event";
        }

        reminders[index].title = obj.title;
        reminders[index].start = obj.start;
        reminders[index].end = obj.end;
        reminders[index].colour = obj.colour;

        dispatch(remindersUpdateDataSuccess(reminders));
    };
}

export function remindersRemove(reminders, index) {
    return (dispatch) => {
        if(index > -1) {
            reminders.splice(index, 1);
        }

        dispatch(remindersRemoveDataSuccess(reminders));
    };
}