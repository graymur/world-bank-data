import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'shared/components/Loader';
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import classnames from 'classnames';
import './indicator-data.scss';

export class IndicatorData extends React.PureComponent {
	static propTypes = {
		loading: PropTypes.bool,
		data: PropTypes.array
	};

	renderData() {
		const {data} = this.props;

		if (!data) {
			return null;
		}

		if (!data.length) {
			return (
				<div id='chart' className='indicator__data__chart _empty'>
					<h2>No data for this year.</h2>
				</div>
			);
		}

		const height = data.length * 3;

		return (
			<div id='chart' className='indicator__data__chart' style={{height: `${height}rem`}}>
				<ResponsiveContainer>
					<BarChart layout='vertical' data={data}>
						<CartesianGrid strokeDasharray='3 3'/>
						<XAxis type='number' dataKey='value'/>
						<YAxis type='category' dataKey='name' width={150}/>
						<Tooltip/>
						<Bar dataKey='value' fill='#8884d8' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		);
	}

	render() {
		const {loading} = this.props;
		const classNames = classnames('indicator__data', {'loading': loading});

		return (
			<div className={classNames}>
				{loading ? <Loader/> : this.renderData()}
			</div>
		);
	}
}

export default IndicatorData;
