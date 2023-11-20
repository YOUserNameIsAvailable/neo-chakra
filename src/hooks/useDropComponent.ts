import { useDrop, DropTargetMonitor } from 'react-dnd'
import { rootComponents } from '~utils/editor'
import useDispatch from './useDispatch'
import builder from '~core/models/composer/builder'
import { useSelector } from 'react-redux'
import { getComponents } from '~core/selectors/components'
import { componentsArray } from '../constants/index'
export const useDropComponent = (
  componentId: string,
  accept: (ComponentType | MetaComponentType)[] = rootComponents,
  canDrop: boolean = true,
) => {
  const components = useSelector(getComponents)

  // const componentsIds = components?.root?.children
  const dispatch = useDispatch()

  const checkTypes = (myObject: any, item: any, componentsArray: any) => {
    if (!componentsArray.includes(item?.type)) {
      return true
    }
    for (const key in myObject) {
      if (key !== 'root' && myObject[key]?.type === item?.type) {
        return false
      }
    }
    return true
  }

  const [{ isOver }, drop] = useDrop({
    accept,
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item: ComponentItemProps, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return
      }

      if (item.isMoved) {
        dispatch.components.moveComponent({
          parentId: componentId,
          componentId: item.id,
        })
      } else if (item.isMeta) {
        dispatch.components.addMetaComponent(builder[item.type](componentId))
      } else {
        const result = checkTypes(components, item, componentsArray)
        if (result) {
          dispatch.components.addComponent({
            parentName: componentId,
            type: item.type,
            rootParentType: item.rootParentType,
          })
        }
      }
    },
    canDrop: () => canDrop,
  })
  return { drop, isOver }
}
