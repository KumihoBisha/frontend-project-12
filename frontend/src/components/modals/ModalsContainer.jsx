import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setModal } from '../../store/slices/modalSlice.js'
import { getNewChannelSchema } from '../../utils/index.js'
import ModalAdd from './AddModal.jsx'
import ModalRename from './RenameModal.jsx'
import ModalDelete from './DeleteModal.jsx'
import {
  getActiveModal,
  getChannels,
  getEditedChannelId,
  getEditedChannelName,
} from '../../store/slices/selectors.js'

const ModalsContainer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const activeModal = useSelector(getActiveModal)

  const channelsNames = useSelector(getChannels)
    .map(channel => channel.name)
  const schema = getNewChannelSchema(t, channelsNames)

  const editedChannelId = useSelector(getEditedChannelId)
  const editedChannelName = useSelector(getEditedChannelName)

  const handleCloseModal = () => {
    dispatch(setModal({
      activeModal: '',
      editedChannelId: '',
      editedChannelName: '',
    }))
  }

  const defaultChannel = {
    id: '1',
    name: 'general',
    removable: false,
  }

  const modals = {
    add: ModalAdd,
    rename: ModalRename,
    delete: ModalDelete,
  }

  const props = {
    handleCloseModal,
    schema,
    editedChannelId,
    editedChannelName,
    defaultChannel,
  }

  const ActiveModal = modals[activeModal]

  if (!ActiveModal) {
    return null
  }

  return (
    <ActiveModal data={props} />
  )
}

export default ModalsContainer
