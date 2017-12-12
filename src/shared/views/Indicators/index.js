import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import getPageTitle from 'shared/utils/getPageTitle';
import loadIndicatorsIfNeeded from 'shared/logic/loadIfNeeded/indicators';
import {loadIndicators} from 'shared/logic/indicators/sagas/loadIndicators';
import * as actions from 'shared/logic/indicators/actions';
import * as selectors from 'shared/logic/indicators/selectors';
import classnames from 'classnames';
import './indicators.scss';
import getMaxIndicatorYear from 'shared/utils/getMaxIndicatorYear';
import Loader from 'shared/components/Loader';

export class Indicators extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		indicators: PropTypes.array,
		loadIndicators: PropTypes.func
	};

	static preload = () => [[loadIndicators]];

	componentDidMount() {
		loadIndicatorsIfNeeded(this.props, this.props.loadIndicators);
	}

	renderIndicators() {
		return (
			<nav className='indicators__list'>
			{this.props.indicators.map(indicator => (
				<Link key={indicator.id} className='indicators__list__item' to={`/indicators/${indicator.id}/${getMaxIndicatorYear()}`}>{indicator.name}</Link>
			))}
			</nav>
		);
	}

	render() {
		const {loading} = this.props;
		const classNames = classnames('indicators__container', {'loading': loading});

		return (
			<div className='indicators'>
				<Helmet>
					<title>{getPageTitle('Indicators')}</title>
				</Helmet>
				<h1 className='indicators__title'>Indicators List</h1>
				<div className={classNames}>
					{loading ? <Loader/> : this.renderIndicators()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	loading: selectors.selectLoading,
	indicators: selectors.selectIndicators
});

export default connect(mapStateToProps, actions)(Indicators);
