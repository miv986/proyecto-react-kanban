import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// sin {} porque es un archivo no un componente
import mockData from "../../mockData";
import { Card } from "../card/Card";
import { useState } from "react";
import "./kanban.scss";

export function Kanban() {
  //var data y setData , con useState devuelve un array y nos mostrará el estado de mockData lo va a cargar
  const [data, setData] = useState(mockData); //primer estado

  //funcion comportamiento que tendrá el arrastrar
  const onDragEnd = (result) => {
    //si el result está fuera de nuestro contexto(destination) a lo mejor estoy arrastrando pero fuera del margen ?!? hace return
    if (!result.destination) return;

    //reconoce si se arrastra o se ha soltado

    //source dirá en que evento se encuentra(soltar, arrastrar)
    //destination(validar si destino es el area de trabajo de arrastrar-soltar)
    const { source, destination } = result;

    //si id de source es != a id de destino puedo trasladar la tarjeta
    if (source.droppableId !== destination.droppableId) {
      //devuelve el indice de la primera aparicion de un elemento dentro de un array
      // COLUMNA DE ORIGEN captura el id
      const sourceColIndex = data.findIndex(
        (elemento) => elemento.id === source.droppableId
      );
      //COLUMNA DE DESTINO captura el id
      const destinationColIndex = data.findIndex(
        (elemento) => elemento.id === destination.droppableId
      );
      //identificar en qué columna me encuentro
      const sourceCol = data[sourceColIndex];
      //identifica a qué columna me dirijo
      const destinationCol = data[destinationColIndex];

      //escribimos tres puntos para convertir el array en lista y poder mapear o entrar a sus registros y entrar a sus elementos internos
      const sourceTask = [...sourceCol.tasks]; //sacamos tareas de origen
      const destinationTask = [...destinationCol.tasks]; //sacamos tareas de destino

      //quitar la tarea del tablero-origen y añadirla al tablero-destino
      //con splice eliminamos un determinado elemento basado en su indice
      const [removed] = sourceTask.splice(source.index, 1);
      // lo añadimos a la tabla-destino con splice
      destinationTask.splice(destination.index, 0, removed);

      const newData = [...data];
      newData[sourceColIndex] = {
        ...sourceCol,
        tasks: sourceTask,
      };
      newData[destinationColIndex] = {
        ...destinationCol,
        tasks: destinationTask,
      };

      setData(newData);
    }
  };
  return (
    //DragDropContext area donde funcionará el drag-drop
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="kanbanSection"
                ref={provided.innerRef}
              >
                <div className="kanbanSectionTitle">{section.title}</div>

                <div className="kanbanSectionContent">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

/**
----<DragDropContext /> - Envuelve la parte de su aplicación para la que desea habilitar arrastrar y soltar
----<Droppable /> - Un área que se puede dejar caer. Contiene <Draggable />s
----<Draggable /> - Lo que se puede arrastrar
resetServerContext() - Utilidad para renderizado del lado del servidor (SSR)
 */
