interface RadioGroupProps {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup = ({ legend, name, options, value, onChange }: RadioGroupProps) => {
  return (
    <div className="form-field">
      <fieldset>
        <legend>{legend}:</legend>

        {options.map((option) => (
          <div key={option}>
            <input
              type="radio"
              id={`${name}-${option}`}
              name={name}
              value={option}
              required
              checked={value === option}
              onChange={(event) => onChange(event.target.value)}
            />

            <label htmlFor={`${name}-${option}`}>{option}</label>
          </div>
        ))}
      </fieldset>

      <span className="validity"></span>
    </div>
  );
};

export default RadioGroup;