import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { Loader, Modal, ModalBody, ModalHeader } from '../../../components';
import { useAppSelector } from '../../../hooks';
import { selectMarvelState } from '../../../store/marvel/marvelSelectors';
import './CharacterModal.scss';

export interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   isVisible: boolean;
   onClose?: () => void;
   isBackdropClosable?: boolean;
}

export const CharacterModal: FC<IProps> = ({ isVisible, onClose, isBackdropClosable }) => {
   const { currentCharacter, currentCharacterError, isCurrentCharacterLoading } = useAppSelector(selectMarvelState);

   return (
      <Modal
         isVisible={isVisible}
         onClose={onClose}
         isBackdropClosable={isBackdropClosable}
      >
         {isCurrentCharacterLoading && <div className='characterModal__loading'><Loader /></div>}
         {currentCharacterError && <div className='characterModal__error'>{currentCharacterError}</div>}
         {currentCharacter && (
            <>
               <ModalHeader
                  title={currentCharacter.name}
                  onClose={onClose}
               />
               <ModalBody>
                  {currentCharacter.description.length 
                     ? currentCharacter.description 
                     : `There is no infrmation about ${currentCharacter.name}`}
               </ModalBody>
            </>
         )}
      </Modal>
   )
};