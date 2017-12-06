import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'shared/components/Loader';
import './indicatorData.scss';

export class IndicatorData extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		data: PropTypes.array
	};

	renderData() {
		const {data} = this.props;

		if (!data) {
			return null;
		}

		return (
			<pre>
				{JSON.stringify(data, null, 4)};
			</pre>
		);
	}

	render() {
		const {loading} = this.props;

		return (
			<div className='indicator__data'>
				{loading ? <Loader/> : this.renderData()}
			</div>
		);
	}
}

export default IndicatorData;
