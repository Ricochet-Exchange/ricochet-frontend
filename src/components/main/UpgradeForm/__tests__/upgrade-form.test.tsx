import React, { ComponentProps } from 'react';
import {
  render, fireEvent, screen, 
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpgradeForm } from '../index';

let props: ComponentProps<typeof UpgradeForm>;

beforeEach(() => {
  props = {
    value: '',
    onUpgrade: jest.fn(),
    onApprove: jest.fn(),
    onAmount: jest.fn(),
    balance: '1111.11',
  };
});

test('Max button', async () => {
  render(<UpgradeForm {...props} />);
  const maxButton = screen.getAllByRole('button').find((each) => each.textContent === 'MAX');
  if (!maxButton) throw new Error('Max button not found');
  fireEvent.click(maxButton);

  expect(maxButton).toBeDisabled();
  expect(props.onAmount).toHaveBeenCalledWith('1111.11');
});

test('Max button resets on amount change', async () => {
  render(<UpgradeForm {...props} />);
  const maxButton = screen.getAllByRole('button').find((each) => each.textContent === 'MAX');
  if (!maxButton) throw new Error('Max button not found');
  const amountField = screen.getByPlaceholderText('Amount');
    
  fireEvent.change(amountField, { target: { value: '22' } });
  expect(maxButton).toBeEnabled();
});

test('Max button resets on external amount change', async () => {
  const { rerender } = render(<UpgradeForm {...props} />);
  const maxButton = screen.getAllByRole('button').find((each) => each.textContent === 'MAX');
  if (!maxButton) throw new Error('Max button not found');
  fireEvent.click(maxButton);
  expect(maxButton).toBeDisabled();

  rerender(<UpgradeForm {...props} value="0.5" />);
  expect(maxButton).toBeEnabled();
});

test('Max button disabled when amount matches balance', async () => {
  render(<UpgradeForm {...props} value="0.5" balance="0.5" />);
  const maxButton = screen.getAllByRole('button').find((each) => each.textContent === 'MAX');
  if (!maxButton) throw new Error('Max button not found');
  expect(maxButton).toBeDisabled();
});
