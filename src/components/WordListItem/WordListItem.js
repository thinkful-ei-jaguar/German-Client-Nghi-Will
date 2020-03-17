import React from 'react';

export default function WordListItem(props) {
		const { original, correct_count, incorrect_count} = props.word;
	return (
		<>
			<tr>
				<td>{original}</td>
				<td>{correct_count}</td>
				<td>{incorrect_count}</td>
			</tr>
		</>
	)
}