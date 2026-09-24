import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextArea from "./components/FormTextArea";
import FormFile from "./components/FormFile";
import paises from "./paises";
import ciudades from "./ciudades";

function ContactoForm() {
  const [fileKey, setFileKey] = useState(0);
  const [enviando, setEnviando] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      genero: "",
      pais: "",
      ciudad: "",
      correo: "",
      telefono: "",
      mensaje: "",
      archivo: [],
    },
  });

  const onSubmit = async (data) => {
    setEnviando(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "archivo" && Array.isArray(value)) {
        value.forEach((file) => formData.append("archivo", file));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        toast.success("Tu mensaje fue enviado correctamente");
        reset();
        setFileKey((prevKey) => prevKey + 1);
      } else {
        const resultado = await response.json();
        const mensajeError = resultado.errors
          ? resultado.errors.map((e) => e.message).join(", ")
          : "Ocurrió un error al enviar el formulario";

        toast.error(mensajeError);
      }
    } catch (error) {
      console.error("Error de red al enviar el formulario:", error);
      toast.error("Revisa tu conexión a internet e intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md transition-colors duration-300 hover:shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Primer Nombre"
          placeholder="Escribe tu primer nombre"
          required
          error={errors.primerNombre?.message}
          {...register("primerNombre", {
            required: "El primer nombre es obligatorio",
          })}
        />
        <FormInput
          label="Segundo Nombre"
          placeholder="Escribe tu segundo nombre"
          error={errors.segundoNombre?.message}
          {...register("segundoNombre")}
        />
        <FormInput
          label="Primer Apellido"
          placeholder="Escribe tu primer apellido"
          required
          error={errors.primerApellido?.message}
          {...register("primerApellido", {
            required: "El primer apellido es obligatorio",
          })}
        />
        <FormInput
          label="Segundo Apellido"
          placeholder="Escribe tu segundo apellido"
          error={errors.segundoApellido?.message}
          {...register("segundoApellido")}
        />

        <FormSelect
          label="Género"
          required
          options={["Femenino", "Masculino", "Otro"]}
          error={errors.genero?.message}
          {...register("genero", {
            required: "El género es obligatorio",
          })}
        />
        <FormSelect
          label="País"
          required
          options={paises}
          error={errors.pais?.message}
          {...register("pais", {
            required: "El país es obligatorio",
          })}
        />
        <FormSelect
          label="Ciudad"
          required
          options={ciudades}
          error={errors.ciudad?.message}
          {...register("ciudad", {
            required: "La ciudad es obligatoria",
          })}
        />

        <FormInput
          label="Correo"
          type="email"
          placeholder="ejemplo@correo.com"
          required
          error={errors.correo?.message}
          {...register("correo", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido",
            },
          })}
        />
        <FormInput
          label="Teléfono"
          type="tel"
          placeholder="300 000 0000"
          required
          error={errors.telefono?.message}
          {...register("telefono", {
            required: "El teléfono es obligatorio",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Ingresa un teléfono válido (10 dígitos)",
            },
          })}
        />
      </div>

      <div className="mt-6">
        <FormTextArea
          label="Mensaje"
          placeholder="Escribe tu mensaje..."
          required
          error={errors.mensaje?.message}
          {...register("mensaje", {
            required: "El mensaje es obligatorio",
          })}
        />
      </div>

      <div className="mt-6">
        <Controller
          name="archivo"
          control={control}
          render={({ field }) => (
            <FormFile
              key={fileKey}
              label="Adjuntar archivos (opcional, hasta 3)"
              name="archivo"
              maxSizeMB={2}
              maxFiles={3}
              accept={{
                "application/pdf": [".pdf"],
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
                "video/*": [],
              }}
              onFilesChange={field.onChange}
              error={errors.archivo?.message}
            />
          )}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={enviando}
          className="bg-sky-500 hover:bg-sky-600 active:scale-95 text-white
                     font-semibold px-8 py-3 rounded-lg
                     shadow-md hover:shadow-lg
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {enviando ? "Enviando..." : "Enviar mensaje"}
        </button>
      </div>
    </form>
  );
}

export default ContactoForm;