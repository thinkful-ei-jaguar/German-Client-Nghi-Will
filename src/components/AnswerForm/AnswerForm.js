import React from 'react';

export default function AnswerForm(props) {
	return (
		<>
			<form onSubmit={props.onSubmit}>
				<input type="text"  placeholder="Answer here" onChange={props.onChange} value={props.inputValue}/>
				<button type='submit'>Submit Answer</button>
			</form>
		</>
	)
}