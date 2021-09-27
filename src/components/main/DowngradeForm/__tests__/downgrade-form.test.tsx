import {ComponentProps} from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { DowngradeForm } from '../index';

let props: ComponentProps<typeof DowngradeForm>

beforeEach(() => {
    props = {
        value: '',
        onClick: jest.fn(),
        onAmount: jest.fn(),
        balance: '1111.11',
    }
});

test('Max button', async () => {
    render(<DowngradeForm {...props} />)
    const maxButton = screen.getAllByRole('button').find(each=>each.textContent === 'MAX')
    if (!maxButton) throw new Error('Max button not found');
    fireEvent.click(maxButton);
    expect(props.onAmount).toHaveBeenCalledWith('1111.11');
    expect(maxButton).toBeDisabled()
});

test('Max button triggers an alert about liquidation', async () => {
    render(<DowngradeForm {...props} />)
    const maxButton = screen.getAllByRole('button').find(each=>each.textContent === 'MAX')
    if (!maxButton) throw new Error('Max button not found');
    fireEvent.click(maxButton);
    const alertNotice = screen.getByText('Alert: if you are currently streaming', { exact: false });
    if (!alertNotice) throw new Error('Alert not found');
    expect(props.onAmount).toHaveBeenCalledWith('1111.11');
    expect(maxButton).toBeDisabled()
});

test('Max button resets on amount change', async () => {
    render(<DowngradeForm {...props} />)
    const maxButton = screen.getAllByRole('button').find(each=>each.textContent === 'MAX')
    if (!maxButton) throw new Error('Max button not found');
    const amountField = screen.getByPlaceholderText('Amount');
    
    fireEvent.change(amountField, {target: {value: '22'}});
    expect(maxButton).toBeEnabled();
});