export function remindersErrored(state = false, action) {
    switch (action.type) {
        case 'REMINDERS_ERRORED':
            return action.errored;

        default:
            return state;
    }
}

export function remindersLoading(state = false, action) {
    switch (action.type) {
        case 'REMINDERS_LOADING':
            return action.loading;

        default:
            return state;
    }
}

export function remindersNew(state = false, action) {
    switch (action.type) {
        case 'REMINDERS_ADDING_NEW':
            return action.new;

        default:
            return state;
    }
}

export function remindersShow(state = false, action) {
    switch (action.type) {
        case 'REMINDERS_SHOW':
            return action.show;

        default:
            return state;
    }
}

export function remindersDateTime(state = "", action) {
    switch (action.type) {
        case 'REMINDERS_DATE_TIME':
            return action.datetime;

        default:
            return state;
    }
}

export function remindersNewTitle(state = "", action) {
    switch (action.type) {
        case 'REMINDERS_NEW_TITLE':
            return action.newtitle;

        default:
            return state;
    }
}

export function remindersNewColour(state = "", action) {
    switch (action.type) {
        case 'REMINDERS_NEW_COLOUR':
            return action.newcolour;

        default:
            return state;
    }
}

export function remindersIndex(state = null, action) {
    switch (action.type) {
        case 'REMINDERS_INDEX':
            return action.index;

        default:
            return state;
    }
}

export function remindersEditTitle(state = "", action) {
    switch (action.type) {
        case 'REMINDERS_EDIT_TITLE':
            return action.edittitle;

        default:
            return state;
    }
}

export function remindersEditColour(state = "", action) {
    switch (action.type) {
        case 'REMINDERS_EDIT_COLOUR':
            return action.editcolour;

        default:
            return state;
    }
}

export function reminders(state = [], action) {
    switch (action.type) {
        case 'REMINDERS_FETCH_DATA_SUCCESS':
            return action.reminders;

        case 'REMINDERS_ADD_DATA_SUCCESS':
            return [
                ...state.slice(0, action.reminders),
                ...state.slice(action.index + 1)
            ];

        case 'REMINDERS_UPDATE_DATA_SUCCESS':
            return [
                ...state.slice(0, action.reminders),
                ...state.slice(action.index + 1)
            ];

        case 'REMINDERS_REMOVE_DATA_SUCCESS':
            return [
                ...state.slice(0, action.reminders),
                ...state.slice(action.index + 1)
            ];

        default:
            return state;
    }
}