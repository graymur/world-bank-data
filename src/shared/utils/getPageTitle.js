import {DEFAULT_TITLE} from 'shared/constants';

export default (title, delimiter = ':') => DEFAULT_TITLE + (title ? `: ${title}` : '');
