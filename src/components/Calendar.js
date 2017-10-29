import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { remindersFetchData,
		 remindersPickDateTime,
		 remindersPickNewTitle,
		 remindersPickNewColour,
		 remindersPickIndex,
		 remindersPickEditTitle,
		 remindersPickEditColour,
		 remindersNew, 
		 remindersShow,
		 remindersAdd,
		 remindersUpdate, 
		 remindersRemove } from '../actions/reminders';
import remindersSRC from '../fixtures/reminders';

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {

	constructor(props) {
		super(props);
		this.handleNew = this.handleNew.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleNewTitle = this.handleNewTitle.bind(this);
		this.handleNewColour = this.handleNewColour.bind(this);
		this.handleEditTitle = this.handleEditTitle.bind(this);
		this.handleEditColour = this.handleEditColour.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	componentDidMount() {
        this.props.fetchData(remindersSRC);
    }

    handleNew(event) {
    	this.props.showReminder(false);
    	this.props.newReminder(true);
    	this.props.pickDateTime(event.start);
    }

    handleShow(event) {
    	this.props.newReminder(false);
    	this.props.showReminder(true);
    	this.props.pickIndex(this.props.reminders, event.title);
    	this.props.pickEditTitle(event.title);
    	this.props.pickDateTime(event.start);
    	this.props.pickEditColour(event.colour);
    }

    handleCancel() {
    	this.props.newReminder(false);
    	this.props.showReminder(false);
    }

    handleClear() {
    	this.props.pickNewTitle("");
    	this.props.pickNewColour("");
    }

	handleNewTitle(event) {
		this.props.pickNewTitle(event.target.value);
    }

    handleNewColour(event) {
    	this.props.pickNewColour(event.target.value);
    }

    handleEditTitle(event) {
		this.props.pickEditTitle(event.target.value);
    }

    handleEditColour(event) {
    	this.props.pickEditColour(event.target.value);
    }

    handleAdd(event) {
    	event.preventDefault();
    	this.props.addReminder(this.props.reminders, this.props.newtitle, this.props.datetime, this.props.newcolour);
    	this.handleCancel();
    	this.handleClear();
    }

    handleUpdate(event) {
    	event.preventDefault();
    	this.props.updateReminder(this.props.reminders, this.props.index, this.props.edittitle, this.props.datetime, this.props.editcolour);
    	this.handleCancel();
    	this.handleClear();
    }

    handleRemove(event) {
    	event.preventDefault();
    	this.props.removeReminder(this.props.reminders, this.props.index);
    	this.handleCancel();
    	this.handleClear();
    }

    eventColour({ event }) {
		let colour = {event}.event.colour;

		if (colour === null || colour === 'white') {
			colour = '#3174ad';
		}

	  return <span>
				<em style={{ 'backgroundColor': colour, display: 'block'}}>{event.title}</em>
			 </span>
	}

	render() {
	 	if (this.props.errored) {
	        return <p>Sorry! There was an error loading the reminders</p>;
	    }

	    if (this.props.loading) {
	        return <p>Loading…</p>;
	    }

		let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

	    return (
	    	<div>
	    		{!this.props.reminders.length &&
	    			<p>No reminders to display, start by adding a reminder</p>
	    		}
	    		{this.props.new &&
    				<form onSubmit={this.handleAdd}>
	    				<p>NEW</p>
	    				<label>
							Title
							<input type="text" name="title" value={this.props.newtitle} onChange={this.handleNewTitle} className="new" maxLength="30"/>
						</label>
						<br/>
	    				<label>
							Date
							<input type="text" name="date" value={this.props.datetime} className="new" readOnly/>
						</label>
						<br/>
						<label>
							Colour
							<input type="text" name="colour" value={this.props.newcolour} onChange={this.handleNewColour} className="new"/>
						</label>
						<br/>
	    				<input type="submit" value="add" />
	    				<input type="button" value="cancel" onClick={this.handleCancel} />
    				</form>
	    		}
	    		{this.props.show &&
    				<form onSubmit={this.handleUpdate}>
	    				<p>EDIT</p>
	    				<label>
							Title
							<input type="text" name="title" value={this.props.edittitle} onChange={this.handleEditTitle} className="edit" maxLength="30"/>
						</label>
						<br/>
	    				<label>
							Date
							<input type="text" name="date" value={this.props.datetime} className="edit" readOnly/>
						</label>
						<br/>
						<label>
							Colour
							<input type="text" name="colour" value={this.props.editcolour} onChange={this.handleEditColour} className="edit"/>
						</label>
						<br/>
	    				<input type="submit" value="update" />
	    				<input type="button" value="remove" onClick={this.handleRemove} />
	    				<input type="button" value="cancel" onClick={this.handleCancel} />
    				</form>
    			}
		    	<BigCalendar
			      	{...this.props}
					events={this.props.reminders}
					views={allViews}
					step={60}
					popup={true}
					selectable={true}
					onSelectSlot={event => this.handleNew(event)}
					onSelectEvent={event => this.handleShow(event)}
					culture={'en-GB'}
					components={{
						event: Event,
						month: {
			            	event: this.eventColour
			            },
			            agenda: {
			            	event: this.eventColour
			            }
			        }}
			    />
		    </div>
	    );
 	}
}

const mapStateToProps = (state) => {
    return {
        reminders: state.reminders,
        errored: state.remindersErrored,
        loading: state.remindersLoading,
        new: state.remindersNew,
        show: state.remindersShow,
        datetime: state.remindersDateTime,
        newtitle: state.remindersNewTitle,
        newcolour: state.remindersNewColour,
        index: state.remindersIndex,
        edittitle: state.remindersEditTitle,
        editcolour: state.remindersEditColour
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (src) => dispatch(remindersFetchData(src)),
        pickDateTime: (value) => dispatch(remindersPickDateTime(value)),
        pickNewTitle: (value) => dispatch(remindersPickNewTitle(value)),
        pickNewColour: (value) => dispatch(remindersPickNewColour(value)),
        pickIndex: (reminders, title) => dispatch(remindersPickIndex(reminders, title)),
        pickEditTitle: (value) => dispatch(remindersPickEditTitle(value)),
        pickEditColour: (value) => dispatch(remindersPickEditColour(value)),
        newReminder: (bool) => dispatch(remindersNew(bool)),
        showReminder: (bool) => dispatch(remindersShow(bool)),
        addReminder: (reminders, title, datetime, colour) => dispatch(remindersAdd(reminders, title, datetime, colour)),
        updateReminder: (reminders, index, title, datetime, colour) => dispatch(remindersUpdate(reminders, index, title, datetime, colour)),
        removeReminder: (reminders, index) => dispatch(remindersRemove(reminders, index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
