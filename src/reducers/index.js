import { combineReducers } from 'redux';
import { reminders, 
		 remindersNew, 
		 remindersShow, 
		 remindersDateTime, 
		 remindersNewTitle, 
		 remindersNewColour, 
		 remindersIndex,
		 remindersEditTitle, 
		 remindersEditColour, 
		 remindersErrored, 
		 remindersLoading } from './reminders';

export default combineReducers({
    reminders,
    remindersErrored,
    remindersLoading,
    remindersNew,
    remindersShow,
    remindersDateTime,
    remindersNewTitle,
    remindersNewColour,
    remindersIndex,
    remindersEditTitle, 
	remindersEditColour, 
});