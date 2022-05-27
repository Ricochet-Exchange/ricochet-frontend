import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import React from 'react';

interface IProps {
  open?:boolean,
  onClose?:any,
  setToken?: any,
  tokenList?: any,
  direction?: string,
}

export const InchModal: React.FC<IProps> = ({
  open, onClose, setToken, tokenList, direction,
}) => {
  if (!open) return null;
  
  const state = useShallowSelector(selectMain);

  const {
    balances,
  } = state;

  return (
    
    <div style={{
      overflow: 'auto', height: '500px', display: 'flex', flexDirection: 'column', 
    }}
    >
      
      {
        tokenList && direction === 'out' ?
          (tokenList).map((token: any, index: number) => (
          
            <button onClick={() => { setToken(token.address); onClose(); }}>
              {token.currency}
              {console.log(index)}
            </button>
          ))
          :
          null
        }
      {
        tokenList && direction === 'in' && balances ? 
     
          tokenList.map((currency: any) => {
            if (+(balances[currency.address]) > 0) {
              return (
                <button onClick={() => { setToken(currency.address); onClose(); }}>
                  {currency.currency}
                </button>
              );
            }
          
            return null;
          })
          :
          ''
      }
    </div>
  );
};
