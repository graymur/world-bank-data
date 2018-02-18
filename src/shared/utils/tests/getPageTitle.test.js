/* eslint-disable */
import getPageTitle from '../getPageTitle';
import {DEFAULT_TITLE} from 'shared/constants';

test('returns default title without arguments', () => {
	expect(getPageTitle()).toBe(DEFAULT_TITLE);
});

test('gets default title concatenated with custom title', () => {
	expect(getPageTitle('test')).toBe(`${DEFAULT_TITLE}: test`);
});

test('uses custom delimiter', () => {
	expect(getPageTitle('test', ' - ')).toBe(`${DEFAULT_TITLE} - test`);
});
