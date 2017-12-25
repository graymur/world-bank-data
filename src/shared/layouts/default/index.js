import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';
import * as selectors from 'shared/logic/shared/selectors';
import * as actions from 'shared/logic/shared/actions';
import Header from './components/Header';
import ErrorComponent from './components/ErrorComponent';
import './default.scss';

export class Layout extends React.Component {
	static propTypes = {
		setError: PropTypes.func,
		children: PropTypes.node,
		error: PropTypes.any
	};

	componentDidCatch(error, info) {
		this.props.setError(error);
	}

	render() {
		const {children, error} = this.props;

		return (
			<div className='main'>
				<Header/>
				<div className='container'>
					{error ? <ErrorComponent error={error}/> : children}
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	error: selectors.selectError
});

export default withRouter(connect(mapStateToProps, actions)(Layout));
