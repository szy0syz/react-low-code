import { useCanvasByContext } from '../../store/hooks';
import { EditCmp } from '../../components/EditCmp';
import { EditCanvas } from '../../components/EditCanvas';

export function Right(props) {
  const canvas = useCanvasByContext();
  const selectedCmp = canvas.getSelectedCmp();

  return selectedCmp ? <EditCmp /> : <EditCanvas />;
}
