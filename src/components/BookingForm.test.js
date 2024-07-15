/* eslint-disable testing-library/no-unnecessary-act */
// todo: cleanup
// todo: fix react act warnings
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BookingForm from './BookingForm';
import { BrowserRouter } from 'react-router-dom';
import { addDays } from 'date-fns';
import { formatDate } from '../lib/utils';
import { act } from 'react';

test('Renders the BookingForm', () => {
  const availableTimes = ['17:00', '18:00', '19:00'];

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} />
    </BrowserRouter>
  );
  const headingElement = screen.getByText('Book Now');
  expect(headingElement).toBeInTheDocument();
});

test('the submit button should be disabled by default', () => {
  const availableTimes = ['17:00', '18:00', '19:00'];

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} />
    </BrowserRouter>
  );

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test('set an empty date', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const dateInput = screen.getByTestId('input-date');

  fireEvent.click(dateInput);
  fireEvent.change(dateInput, { target: { value: '' } });
  fireEvent.blur(dateInput);

  expect(dateInput.value).toBe('');

  await waitFor(() => {
    const errorMessage = screen.getByText('Date is required!');
    expect(errorMessage).toBeInTheDocument();
  });

  expect(dateInput.validity.valid).toBe(false);

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test('set an invalid date', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const dateInput = screen.getByTestId('input-date');

  fireEvent.click(dateInput);
  fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
  fireEvent.blur(dateInput);

  expect(dateInput.value).toBe('2023-01-01');

  await waitFor(() => {
    const errorMessage = screen.getByText('Invalid minimum date!');
    expect(errorMessage).toBeInTheDocument();
  });

  expect(dateInput.validity.valid).toBe(false);

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test('set a valid date', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const tomorrow = formatDate(addDays(new Date(), 1));

  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const dateInput = screen.getByTestId('input-date');

  act(() => {
    fireEvent.click(dateInput);
    fireEvent.change(dateInput, { target: { value: tomorrow } });
    fireEvent.blur(dateInput);
  });

  expect(dateInput.value).toBe(tomorrow);

  await waitFor(() => {
    const errorMessage = screen.queryByText('Invalid minimum date');
    expect(errorMessage).not.toBeInTheDocument();
  });

  expect(dateInput.validity.valid).toBe(true);

  const submitBtn = screen.getByText('Make Your reservation');
  await waitFor(() => {
    expect(submitBtn).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(submitBtn).toBeDisabled();
  });
});

test('set an empty time', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const timeInput = screen.getByTestId('input-time');

  act(() => {
    fireEvent.click(timeInput);
    fireEvent.blur(timeInput);
  });

  console.log('xxx', timeInput.value);

  expect(timeInput.value).toBe('');
  expect(timeInput.validity.valid).toBe(false);

  await waitFor(() => {
    const errorMessage = screen.getByText('Time is required!');
    expect(errorMessage).toBeInTheDocument();
  });

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test('set a valid time', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const timeInput = screen.getByTestId('input-time');

  act(() => {
    fireEvent.change(timeInput, { target: { value: '17:00' } });
  });

  console.log('xxx', timeInput.value);

  expect(timeInput.value).toBe('17:00');
  expect(timeInput.validity.valid).toBe(true);

  await waitFor(() => {
    const errorMessage = screen.queryByText('Time is required!');
    expect(errorMessage).not.toBeInTheDocument();
  });

  const submitBtn = screen.getByText('Make Your reservation');
  await waitFor(() => {
    expect(submitBtn).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(submitBtn).toBeDisabled();
  });
});

test('set an empty occasion', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn();

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const occasionInput = screen.getByTestId('select-occasion');

  act(() => {
    fireEvent.click(occasionInput);
    fireEvent.blur(occasionInput);
  });

  expect(occasionInput.value).toBe('');
  expect(occasionInput.validity.valid).toBe(false);

  await waitFor(() => {
    const errorMessage = screen.getByText('Occasion is required!');
    expect(errorMessage).toBeInTheDocument();
  });

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test('set a valid occasion', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn();

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const occasionInput = screen.getByTestId('select-occasion');

  act(() => {
    fireEvent.click(occasionInput);
    fireEvent.change(occasionInput, { target: { value: 'birthday' } });
    fireEvent.blur(occasionInput);
  });

  expect(occasionInput.value).toBe('birthday');
  expect(occasionInput.validity.valid).toBe(true);

  await waitFor(() => {
    const errorMessage = screen.queryByText('Occasion is required!');
    expect(errorMessage).not.toBeInTheDocument();
  });

  const submitBtn = screen.getByText('Make Your reservation');
  await waitFor(() => {
    expect(submitBtn).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(submitBtn).toBeDisabled();
  });
});

test('change guests', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn();

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const decreaseBtn = await waitFor(() =>
    screen.findByTestId('guests-decrement')
  );
  const increaseBtn = await waitFor(() =>
    screen.findByTestId('guests-increment')
  );
  const guestsText = await waitFor(() => screen.findByTestId('guests-text'));

  expect(decreaseBtn).toBeInTheDocument();
  expect(increaseBtn).toBeInTheDocument();
  expect(guestsText).toBeInTheDocument();

  // --- INCREMENT ---
  fireEvent.click(increaseBtn);
  await waitFor(() => {
    expect(guestsText.textContent).toBe('2');
  });
  fireEvent.click(increaseBtn);
  await waitFor(() => {
    expect(guestsText.textContent).toBe('3');
  });

  // --- DECREMENT ---
  fireEvent.click(decreaseBtn);
  await waitFor(() => {
    expect(guestsText.textContent).toBe('2');
  });
  fireEvent.click(decreaseBtn);
  await waitFor(() => {
    expect(guestsText.textContent).toBe('1');
  });
  fireEvent.click(decreaseBtn);
  await waitFor(() => {
    expect(guestsText.textContent).toBe('1');
  });
});

test('name is empty', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const nameInput = screen.getByTestId('input-name');
  fireEvent.blur(nameInput);

  expect(nameInput.value).toBe('');

  const errorMessage = await screen.findByText('Name is required!');
  expect(errorMessage).toBeInTheDocument();
  expect(nameInput.validity.valid).toBe(false);

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test('name is too short', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const nameInput = screen.getByTestId('input-name');
  act(() => {
    fireEvent.change(nameInput, { target: { value: 'xx' } });
    fireEvent.blur(nameInput);
  });

  expect(nameInput.value).toBe('xx');
  // expect(nameInput.validity.valid).toBe(false);

  const errorMessage = await screen.findByText(
    'Name must be at least 3 characters long!'
  );
  expect(errorMessage).toBeInTheDocument();

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test('name is valid', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const nameInput = screen.getByTestId('input-name');
  act(() => {
    fireEvent.change(nameInput, { target: { value: 'jon doe' } });
    fireEvent.blur(nameInput);
  });

  expect(nameInput.value).toBe('jon doe');

  const errorMessage = screen.queryByText(
    'Name must be at least 3 characters long!'
  );
  expect(errorMessage).not.toBeInTheDocument();

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  await waitFor(() => {
    expect(submitBtn).toBeDisabled();
  });
});

test('email is empty', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const emailInput = screen.getByTestId('input-email');
  act(() => {
    fireEvent.blur(emailInput);
  });

  expect(emailInput.value).toBe('');

  const errorMessage = await screen.findByText('Email is required!');
  expect(errorMessage).toBeInTheDocument();
  expect(emailInput.validity.valid).toBe(false);

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test('email is invalid', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const emailInput = screen.getByTestId('input-email');
  act(() => {
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailInput);
  });

  expect(emailInput.value).toBe('invalidemail');

  const errorMessage = await screen.findByText('Invalid email!');
  expect(errorMessage).toBeInTheDocument();

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeDisabled();
});

test('email is valid', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const dispatch = jest.fn().mockReturnValue(availableTimes);

  render(
    <BrowserRouter>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </BrowserRouter>
  );

  const emailInput = screen.getByTestId('input-email');

  act(() => {
    fireEvent.change(emailInput, { target: { value: 'email@test.com' } });
    fireEvent.blur(emailInput);
  });

  expect(emailInput.value).toBe('email@test.com');

  const errorMessage = screen.queryByText('Invalid email!');
  expect(errorMessage).not.toBeInTheDocument();

  const submitBtn = screen.getByText('Make Your reservation');
  expect(submitBtn).toBeInTheDocument();
  await waitFor(() => {
    expect(submitBtn).toBeDisabled();
  });
});

test('all fields are valid and submit form', async () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const tomorrow = formatDate(addDays(new Date(), 1));
  const dispatch = jest.fn().mockReturnValue(availableTimes);
  const onSubmit = jest.fn();

  render(
    <BrowserRouter>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={onSubmit}
      />
    </BrowserRouter>
  );

  const dateInput = screen.getByTestId('input-date');
  const timeInput = screen.getByTestId('input-time');
  const incrementBtn = screen.getByTestId('guests-increment');
  const guestsText = screen.getByTestId('guests-text');
  const occasionInput = screen.getByTestId('select-occasion');
  const nameInput = screen.getByTestId('input-name');
  const emailInput = screen.getByTestId('input-email');
  const notesInput = screen.getByTestId('input-notes');

  act(async () => {
    fireEvent.change(dateInput, { target: { value: tomorrow } });
    fireEvent.blur(dateInput);

    fireEvent.change(timeInput, { target: { value: '19:00' } });
    fireEvent.blur(timeInput);

    fireEvent.click(incrementBtn);

    fireEvent.change(occasionInput, { target: { value: 'anniversary' } });
    fireEvent.blur(occasionInput);

    fireEvent.change(nameInput, { target: { value: 'jon doe' } });
    fireEvent.blur(nameInput);

    fireEvent.change(emailInput, { target: { value: 'email@test.com' } });
    fireEvent.blur(emailInput);

    fireEvent.change(notesInput, { target: { value: 'test' } });
    fireEvent.blur(notesInput);
  });

  expect(dateInput.value).toBe(tomorrow);
  expect(dateInput.validity.valid).toBe(true);
  expect(timeInput.value).toBe('19:00');
  expect(timeInput.validity.valid).toBe(true);
  expect(guestsText.textContent).toBe('2');
  expect(occasionInput.value).toBe('anniversary');
  expect(occasionInput.validity.valid).toBe(true);
  expect(nameInput.value).toBe('jon doe');
  expect(nameInput.validity.valid).toBe(true);
  expect(emailInput.value).toBe('email@test.com');
  expect(emailInput.validity.valid).toBe(true);

  const submitBtn = await waitFor(() =>
    screen.findByText('Make Your reservation')
  );
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).not.toBeDisabled();

  fireEvent.click(submitBtn);

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({
      date: tomorrow,
      time: '19:00',
      guests: 2,
      occasion: 'anniversary',
      name: 'jon doe',
      email: 'email@test.com',
      notes: 'test',
    });
  });
});
