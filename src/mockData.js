//generar id de forma automatica
import { v4 as uuid4 } from "uuid";

const mockData = [
  {
    id: uuid4(),
    title: "📝 Por hacer",
    tasks: [
      {
        id: uuid4(),
        title: "Leer 20 páginas de un libro",
      },
      {
        id: uuid4(),
        title: "Ir a por pan otra vez",
      },
      {
        id: uuid4(),
        title: "Subir un anuncio",
      },
    ],
  },

  {
    id: uuid4(),
    title: "🖋️ En progreso",
    tasks: [
      {
        id: uuid4(),
        title: "Terminar curso react",
      },
    ],
  },
  {
    id: uuid4(),
    title: "✅ Completado",
    tasks: [
      {
        id: uuid4(),
        title: "Ir a por pan",
      },
    ],
  },
];

//no es una función por eso se exporta de esta forma es un array en este caso
export default mockData;
