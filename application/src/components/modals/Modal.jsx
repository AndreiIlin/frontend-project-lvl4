import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './index.js';

const Modal = () => {
  const currentModalType = useSelector((state) => state.modals.type);
  const CurrentModal = getModal(currentModalType);
  if (!CurrentModal) {
    return null;
  }
  return (
    <CurrentModal />
  );
};
export default Modal;
