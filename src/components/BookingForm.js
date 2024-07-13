import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const today = new Date().toISOString().split('T')[0];
const allowedOccasions = ['birthday', 'anniversary'];

export default function BookingForm({ availableTimes, dispatch, onSubmit }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      date: today,
      time: '',
      guests: 1,
      occasion: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      const result = onSubmit(values);

      if (result) {
        formik.resetForm();
        navigate('/booking/confirmed');
      }
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .required('Date is required!')
        .min(today, 'Invalid minimum date'),
      time: Yup.string()
        .required('Time is required!')
        .test('is valid time', 'Invalid time', (value) => {
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
    }),
  });

  return (
    <form className="booking-form" onSubmit={formik.handleSubmit}>
      <h2>Book Now</h2>

      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="date"
        name="date"
        required
        min={today}
        value={formik.values.date}
        onChange={async (e) => {
          dispatch({ type: 'addDate', payload: e.target.value });
          formik.handleChange(e);
          await formik.setFieldValue('time', '', true);
        }}
      />
      <p className="booking-form__error">
        {formik.touched.date && formik.errors.date}
      </p>

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        name="time"
        required
        {...formik.getFieldProps('time')}
      >
        <option value="" disabled>
          Select a time
        </option>
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      <p className="booking-form__error">
        {formik.touched.time && formik.errors.time}
      </p>

      <div className="booking-form__guests">
        <label>Number of guests</label>
        <p>
          <button
            type="button"
            onClick={() => {
              const { guests } = formik.values;
              const newVal = guests > 1 ? guests - 1 : 1;
              formik.setFieldValue('guests', newVal, true);
              formik.setFieldTouched('guests');
            }}
          >
            -
          </button>
          <span className="booking-form__number">{formik.values.guests}</span>
          <button
            type="button"
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
      <p className="booking-form__error">
        {formik.touched.guests && formik.errors.guests}
      </p>

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        name="occasion"
        required
        {...formik.getFieldProps('occasion')}
      >
        <option value="" disabled>
          Please select an occasion
        </option>
        <option value="birthday">Birthday</option>
        <option value="anniversary">Anniversary</option>
      </select>
      <p className="booking-form__error">
        {formik.touched.occasion && formik.errors.occasion}
      </p>

      <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
        Make Your reservation
      </button>
    </form>
  );
}
