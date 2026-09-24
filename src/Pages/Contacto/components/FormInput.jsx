import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
  { label, name, type = "text", required = false, placeholder = "", error = "", ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-sky-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        className="border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2
                   bg-white dark:bg-slate-700
                   text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500
                   transition-colors duration-200
                   hover:border-sky-400
                   focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-900"
        {...rest}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});

export default FormInput;
