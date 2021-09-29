import {ComponentProps} from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpgradeForm } from '../index';

let props: ComponentProps<typeof UpgradeForm>

beforeEach(() => {
    props = {
        value: '',
        onUpgrade: jest.fn(),
        onApprove: jest.fn(),
        onAmount: jest.fn(),
        balance: '1111.11',
    }
});

test('Max button', async () => {
    render(<UpgradeForm {...props} />)
    const maxButton = screen.getAllByRole('button').find(each=>each.textContent === 'MAX')
    if (!maxButton) throw new Error('Max button not found');
    fireEvent.click(maxButton);

    expect(maxButton).toBeDisabled()
    expect(props.onAmount).toHaveBeenCalledWith('1111.11');
});

test('Max button resets on amount change', async () => {
    render(<UpgradeForm {...props} />)
    const maxButton = screen.getAllByRole('button').find(each=>each.textContent === 'MAX')
    if (!maxButton) throw new Error('Max button not found');
    const amountField = screen.getByPlaceholderText('Amount');
    
    fireEvent.change(amountField, {target: {value: '22'}});
    expect(maxButton).toBeEnabled();
});