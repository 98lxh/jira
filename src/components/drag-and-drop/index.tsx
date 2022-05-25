import React, { cloneElement } from "react"
import { Draggable, DraggableProps, Droppable, DroppableProps, DroppableProvided, DroppableProvidedProps } from "react-beautiful-dnd"


type DropProps = Omit<DroppableProps, 'children'> & { children: React.ReactNode }

export const Drop: React.FC<DropProps> = ({ children, ...props }) => {
  return (
    <Droppable {...props}>
      {
        (provided) => {
          if (React.isValidElement(children)) {
            return React.cloneElement(children, {
              ...provided.droppableProps,
              ref: provided.innerRef,
              provided
            })
          }

          return <div />
        }
      }
    </Droppable>
  )
}


type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps>
  & React.HTMLAttributes<HTMLDivElement>

export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
    {props.provided?.placeholder}
  </div>
))


type DragProps = Omit<DraggableProps, 'children'> & { children: React.ReactNode }
export const Drag: React.FC<DragProps> = ({ children, ...props }) => {

  return (
    <Draggable {...props}>
      {
        provided => {
          if (React.isValidElement(children)) {
            return cloneElement(children, {
              ...provided.draggableProps,
              ...provided.dragHandleProps,
              ref: provided.innerRef
            })
          }

          return <div />
        }
      }
    </Draggable>
  )
}
