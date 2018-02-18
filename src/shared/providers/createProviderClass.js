import React from 'react';
import PropTypes from 'prop-types';

export default dataFieldName => class extends React.Component {
	static propTypes = {
		data: PropTypes.object,
		render: PropTypes.func
	};

	render() {
		return this.props.render({
			loading: this.props.data.loading,
			[dataFieldName]: this.props.data[dataFieldName]
		});
	}
};
