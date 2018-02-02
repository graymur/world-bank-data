import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import * as actions from 'shared/logic/indicator/actions';
import * as selectors from 'shared/logic/indicator/selectors';
import IndicatorMain from './components/IndicatorMain';
import range from 'lodash/range';
import getMaxIndicatorYear from 'shared/utils/getMaxIndicatorYear';
import IndicatorProvider from 'shared/providers/Indicator';

const years = range(1990, getMaxIndicatorYear() + 1).reverse();

export class Indicator extends React.Component {
	static propTypes = {
		years: PropTypes.array,
		currentYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		setCurrentYear: PropTypes.func,
		match: PropTypes.object,
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
			location: PropTypes.object
		})
	};

	static defaultProps = {years};

	constructor(props) {
		super(props);
		this.changeYear = this.changeYear.bind(this);
	}

	componentDidMount() {
		this.props.setCurrentYear(Number(this.props.match.params.year) || getMaxIndicatorYear());
	}

	changeYear(year) {
		const {history} = this.props;
		history.push(`/indicators/${this.props.match.params.indicatorId}/${year}#chart`);
		this.props.setCurrentYear(year);
	}

	render() {
		return <IndicatorProvider indicatorId={this.props.match.params.indicatorId} render={(data) =>
			<IndicatorMain {...this.props} {...data} changeYear={this.changeYear}/>
		} />;
	}
}

const mapStateToProps = createStructuredSelector(selectors);

export default connect(mapStateToProps, actions)(Indicator);
