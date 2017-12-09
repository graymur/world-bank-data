import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Loader from '../Loader.js';
import styles from '../loader.scss';

describe('<Loader />', () => {
    it('should render an <span> tag', () => {
        const renderedComponent = shallow(<Loader />);
        expect(renderedComponent.type()).toEqual('span');
    });

    it('should have correct width, height and border', () => {
        const renderedComponent = shallow(<Loader size={100} />);

        expect(renderedComponent.prop('style').width).toEqual('100px');
        expect(renderedComponent.prop('style').height).toEqual('100px');
        expect(renderedComponent.prop('style').border).toEqual('20px solid #f3f3f3');
    });

    it('should accept additional class name', () => {
        const renderedComponent = shallow(<Loader className={'test-class-name'} />);
        expect(renderedComponent.prop('className')).toEqual('test-class-name ' + styles.loader);
    });
});
