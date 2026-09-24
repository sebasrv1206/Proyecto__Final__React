import { forwardRef } from "react";

const FormSelect = forwardRef(function FormSelect(
  { label, name, options = [], required = false, error = "", ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-sky-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        ref={ref}
        defaultValue=""
        className="border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2
                   text-slate-700 dark:text-slate-100 bg-white dark:bg-slate-700 cursor-pointer
                   transition-colors duration-200
                   hover:border-sky-400
                   focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-900"
        {...rest}
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});

export default FormSelect;
