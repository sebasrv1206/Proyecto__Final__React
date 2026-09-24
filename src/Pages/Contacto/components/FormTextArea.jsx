import { forwardRef } from "react";

const FormTextArea = forwardRef(function FormTextArea(
  { label, name, required = false, placeholder = "", error = "", ...rest },
  ref
) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-sky-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={6}
        ref={ref}
        className="w-full border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-3
                   bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-100
                   placeholder:text-slate-400 dark:placeholder:text-slate-500
                   shadow-sm
                   transition-all duration-200
                   resize-y
                   hover:border-sky-400
                   focus:outline-none focus:bg-white dark:focus:bg-slate-700 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:focus:ring-sky-900"
        {...rest}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});

export default FormTextArea;
