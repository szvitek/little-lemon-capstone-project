import { useFormik } from 'formik';
import { createSearchParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { formatDate } from '../lib/utils';
import { isBefore, isEqual, toDate } from 'date-fns';

const today = formatDate(new Date());
const allowedOccasions = ['birthday', 'anniversary'];

export default function BookingForm({ availableTimes, dispatch, onSubmit }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      date: today,
      time: '',
      guests: 1,
      occasion: '',
      name: '',
      email: '',
      notes: '',
    },
    onSubmit: (values) => {
      const result = onSubmit(values);

      if (result) {
        formik.resetForm();
        navigate({
          pathname: '/booking/confirmed',
          search: createSearchParams(values).toString(),
        });
      }
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .required('Date is required!')
        .test('minimum value', 'Invalid minimum date!', (value) => {
          return (
            isEqual(toDate(today), toDate(formatDate(value))) ||
            isBefore(toDate(today), toDate(formatDate(value)))
          );
        }),
      time: Yup.string()
        .required('Time is required!')
        .test('is valid time', 'Invalid time!', (value) => {
          return (
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) &&
            availableTimes.includes(value)
          );
        }),
      guests: Yup.number()
        .min(1, 'At least 1 guest required!')
        .max(10, 'Maximum 10 guests allowed!'),
      occasion: Yup.string()
        .required('Occasion is required!')
        .test('is valid occasion', 'Invalid occasion value!', (value) =>
          allowedOccasions.includes(value)
        ),
      name: Yup.string()
        .required('Name is required!')
        .min(3, 'Name must be at least 3 characters long!'),
      email: Yup.string().email('Invalid email!').required('Email is required!'),
      notes: Yup.string(),
    }),
  });

  return (
    <form className="booking-form" onSubmit={formik.handleSubmit}>
      <h2>Book Now</h2>

      <label htmlFor="date">Choose date</label>
      <input
        type="date"
        id="date"
        name="date"
        required
        min={today}
        value={formik.values.date}
        data-testid="input-date"
        aria-label="Choose a date"
        aria-required="true"
        onChange={async (e) => {
          formik.handleChange(e);
          await formik.setFieldValue('date', e.target.value, true);
          await formik.setFieldValue('time', '', true);
          dispatch({ type: 'addDate', payload: e.target.value });
        }}
        onBlur={formik.handleBlur}
      />
      <p className="booking-form__error" aria-label="date error">
        {formik.touched.date && formik.errors.date}
      </p>

      <label htmlFor="time">Choose time</label>
      <select
        id="time"
        name="time"
        data-testid="input-time"
        aria-label="Choose a time"
        aria-required="true"
        required
        {...formik.getFieldProps('time')}
      >
        <option value="" disabled>
          Select a time
        </option>
        {availableTimes.map((time) => (
          <option
            key={time}
            value={time}
            aria-label={time}
            aria-selected={formik.values.time === time}
          >
            {time}
          </option>
        ))}
      </select>
      <p className="booking-form__error" aria-label="time error">
        {formik.touched.time && formik.errors.time}
      </p>

      <div className="booking-form__guests">
        <label>Number of guests</label>
        <p>
          <button
            type="button"
            data-testid="guests-decrement"
            aria-label="decrement guests"
            onClick={() => {
              const { guests } = formik.values;
              const newVal = guests > 1 ? guests - 1 : 1;
              formik.setFieldValue('guests', newVal, true);
              formik.setFieldTouched('guests');
            }}
          >
            -
          </button>
          <span
            className="booking-form__number"
            data-testid="guests-text"
            aria-label="number of guests"
          >
            {formik.values.guests}
          </span>
          <button
            type="button"
            data-testid="guests-increment"
            aria-label="increment guests"
            onClick={() => {
              const { guests } = formik.values;
              const newVal = guests < 10 ? guests + 1 : 10;
              formik.setFieldValue('guests', newVal, true);
              formik.setFieldTouched('guests');
            }}
          >
            +
          </button>
        </p>
      </div>
      <p className="booking-form__error" aria-label="guests error">
        {formik.touched.guests && formik.errors.guests}
      </p>

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        name="occasion"
        data-testid="select-occasion"
        aria-label="Choose an occasion"
        required
        {...formik.getFieldProps('occasion')}
      >
        <option value="" aria-disabled="true" disabled>
          Please select an occasion
        </option>
        <option
          value="birthday"
          aria-label="birthday"
          aria-selected={formik.values.occasion === 'birthday'}
        >
          Birthday
        </option>
        <option
          value="anniversary"
          aria-label="anniversary"
          aria-selected={formik.values.occasion === 'birthday'}
        >
          Anniversary
        </option>
      </select>
      <p className="booking-form__error">
        {formik.touched.occasion && formik.errors.occasion}
      </p>

      <h2>Contact informations</h2>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        minLength={3}
        required
        data-testid="input-name"
        aria-label="Your name"
        aria-required="true"
        {...formik.getFieldProps('name')}
      />
      <p className="booking-form__error">
        {formik.touched.name && formik.errors.name}
      </p>

      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        required
        data-testid="input-email"
        aria-label="Email"
        aria-required="true"
        {...formik.getFieldProps('email')}
      />
      <p className="booking-form__error">
        {formik.touched.email && formik.errors.email}
      </p>

      <label htmlFor="notes">Additional information</label>
      <textarea
        name="notes"
        id="notes"
        rows={5}
        data-testid="input-notes"
        aria-label="Additional notes"
        aria-required="false"
        {...formik.getFieldProps('notes')}
      />

      <button
        type="submit"
        disabled={!(formik.isValid && formik.dirty)}
        aria-disabled={!(formik.isValid && formik.dirty)}
        aria-label="make your reservation"
      >
        Make Your reservation
      </button>
    </form>
  );
}
