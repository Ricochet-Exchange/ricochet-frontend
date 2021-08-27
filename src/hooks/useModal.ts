import { useDispatch } from 'react-redux';
import { modalHide, modalShow } from 'store/modal/actionCreators';
import { useCallback } from 'react';
import { ModalType } from '../store/modal/types';
import { useShallowSelector } from './useShallowSelector';
import { selectModal } from '../store/modal/selectors';

export const useModal = () => {
  const dispatch = useDispatch();
  const { active, current } = useShallowSelector(selectModal);
  const onCloseModal = useCallback(() => dispatch(modalHide()), [dispatch]);
  const showModal = useCallback(
    (modal: ModalType) =>
      () => dispatch(modalShow(modal)), [dispatch],
  ); 
  return {
    current, active, onCloseModal, showModal,
  };
};
