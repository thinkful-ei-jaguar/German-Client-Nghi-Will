import React from 'react';

export default function WordListItem(props) {
		const {word, correct, incorrect} = props.word;
	return (
		<>
			<tr key={props.key}>
				<td>{word}</td>
				<td>{correct}</td>
				<td>{incorrect}</td>
			</tr>
		</>
	)
}