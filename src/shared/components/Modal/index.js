import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = ({children}) => {
	return (
		<div className='wb-modal'>
			<div className='wb-modal__content'>
				{children}
			</div>
		</div>
	);
};

Modal.propTypes = {
	children: PropTypes.node
};

export default Modal;
