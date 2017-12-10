import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'shared/components/Loader';
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import classnames from 'classnames';
import './indicatorData.scss';

export class IndicatorData extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		data: PropTypes.array
	};

	constructor(props) {
		super(props);
		this.scrolled = false;
	}

	componentWillReceiveProps(newProps) {
		if (newProps.data !== this.props.data) {
			this.scrolled = false;
		}
	}

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

		// if (typeof window !== 'undefined' && !this.scrolled) {
		// 	setTimeout(() => {
		// 		const elem = document.getElementById('chart');
		// 		window.scrollTo(0, elem.offsetTop);
		// 	}, 100);
		//
		// 	this.scrolled = true;
		// }

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
