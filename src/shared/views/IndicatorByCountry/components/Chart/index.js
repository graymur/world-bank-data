import React from 'react';
import PropTypes from 'prop-types';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer} from 'recharts';

export default class Chart extends React.Component {
	static propTypes = {
		data: PropTypes.array
	};

	render() {
		return (
			<div className='indicator-chart__wr'>
				<ResponsiveContainer>
					<LineChart height={300} data={this.props.data.reverse()}>
						<Line type='monotone' dataKey='value' stroke='#8884d8'/>
						<CartesianGrid stroke='#ccc'/>
						<XAxis dataKey='date'/>
						<YAxis />
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
}
