import { useDropzone } from "react-dropzone";
import { useState, useEffect, useRef } from "react";

const generarId = (file) => `${file.name}-${file.lastModified}-${file.size}`;

function FormFile({
  label,
  name,
  required = false,
  error = "",
  accept = { "application/pdf": [".pdf"] },
  maxSizeMB = 2,
  maxFiles = 3,
  onFilesChange = () => {},
}) {
  const [archivos, setArchivos] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [mensajeEliminado, setMensajeEliminado] = useState("");

  const espacioDisponible = maxFiles - archivos.length;
  const limiteAlcanzado = espacioDisponible <= 0;

  useEffect(() => {
    onFilesChange(archivos.map((a) => a.file));
  }, [archivos]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (limiteAlcanzado) {
      setErrorMsg(`Ya alcanzaste el máximo de ${maxFiles} archivos`);
      return;
    }

    if (acceptedFiles.length > 0) {
      const nuevosArchivos = acceptedFiles
        .slice(0, espacioDisponible)
        .map((file) => ({
          id: generarId(file),
          file,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
        }));

      setArchivos((anteriores) => [...anteriores, ...nuevosArchivos]);
      setErrorMsg("");
    }

    if (rejectedFiles.length > 0) {
      const primerError = rejectedFiles[0].errors[0];

      if (primerError.code === "file-too-large") {
        setErrorMsg(`El archivo supera el tamaño máximo de ${maxSizeMB}MB`);
      } else if (primerError.code === "file-invalid-type") {
        setErrorMsg("Tipo de archivo no permitido");
      } else if (primerError.code === "too-many-files") {
        setErrorMsg(`Solo puedes subir hasta ${maxFiles} archivos`);
      } else {
        setErrorMsg(primerError.message);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles,
    disabled: limiteAlcanzado,
    maxSize: maxSizeMB * 1024 * 1024,
    accept,
  });

  const eliminarArchivo = (id) => {
    setArchivos((anteriores) => {
      const archivoAEliminar = anteriores.find((arch) => arch.id === id);
      if (archivoAEliminar?.preview) {
        URL.revokeObjectURL(archivoAEliminar.preview);
      }
      return anteriores.filter((arch) => arch.id !== id);
    });
    setErrorMsg("");
    setMensajeEliminado("Archivo eliminado");
  };

  useEffect(() => {
    if (!mensajeEliminado) return;
    const temporizador = setTimeout(() => setMensajeEliminado(""), 3000);
    return () => clearTimeout(temporizador);
  }, [mensajeEliminado]);

  const archivosRef = useRef(archivos);
  useEffect(() => {
    archivosRef.current = archivos;
  }, [archivos]);

  useEffect(() => {
    return () => {
      archivosRef.current.forEach((arch) => {
        if (arch.preview) URL.revokeObjectURL(arch.preview);
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-sky-500">*</span>}
        </label>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {archivos.length}/{maxFiles} archivos
        </span>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 -mt-1">
        Tamaño máximo por archivo: {maxSizeMB}MB
      </p>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                    ${limiteAlcanzado
                      ? "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 cursor-not-allowed opacity-70"
                      : errorMsg
                      ? "border-red-400 bg-red-50 dark:bg-red-500/10 cursor-pointer"
                      : isDragActive
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10 cursor-pointer"
                      : "border-slate-300 dark:border-slate-600 hover:border-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"}`}
      >
        <input
          {...getInputProps({
            id: name,
            name,
            required: required && archivos.length === 0,
          })}
        />

        <div className="text-4xl mb-3">📎</div>

        {limiteAlcanzado ? (
          <p className="font-medium text-slate-500 dark:text-slate-400">
            Ya alcanzaste el máximo de {maxFiles} archivos
          </p>
        ) : isDragActive ? (
          <p className="font-medium text-sky-600">Suelta el archivo aquí...</p>
        ) : (
          <>
            <p className="font-medium text-slate-700 dark:text-slate-200">Arrastra tus archivos aquí</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              o haz clic para seleccionarlos ({espacioDisponible} disponible
              {espacioDisponible === 1 ? "" : "s"})
            </p>
          </>
        )}
      </div>

      {archivos.length > 0 && (
        <div className="flex flex-col gap-3 mt-1">
          {archivos.map(({ id, file, preview }) => (
            <div
              key={id}
              className="rounded-lg bg-slate-100 dark:bg-slate-700 p-4 flex items-center justify-between gap-4 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              <div className="text-left text-slate-600 dark:text-slate-300 min-w-0">
                <p className="font-semibold text-slate-700 dark:text-slate-100 mb-1 truncate">
                  {file.name}
                </p>
                <p>
                  <strong className="text-slate-700 dark:text-slate-200">Tipo:</strong>{" "}
                  {file.type || "Desconocido"}
                </p>
                <p>
                  <strong className="text-slate-700 dark:text-slate-200">Tamaño:</strong>{" "}
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {preview && (
                  <img
                    src={preview}
                    alt={`Vista previa de ${file.name}`}
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                  />
                )}
                <button
                  type="button"
                  onClick={() => eliminarArchivo(id)}
                  aria-label={`Eliminar ${file.name}`}
                  title="Eliminar archivo"
                  className="text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-full p-2 transition-colors duration-200 active:scale-90"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {mensajeEliminado && (
        <span className="text-sm text-emerald-600 font-medium">
          ✓ {mensajeEliminado}
        </span>
      )}

      {(errorMsg || error) && (
        <span className="text-sm text-red-500">{errorMsg || error}</span>
      )}
    </div>
  );
}

export default FormFile;
