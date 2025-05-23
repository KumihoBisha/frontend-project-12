import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import ModalsContainer from '../../../components/modals/ModalsContainer.jsx'
import { setModal } from '../../../store/slices/modalSlice.js'
import { setSelectedChannel } from '../../../store/slices/channelSlice.js'
import { getSelectedChannel } from '../../../store/slices/selectors.js'
import { useGetChannelsQuery } from '../../../store/apiClient.js'

const Channels = () => {
  const { t } = useTranslation()
  const { data, error, isLoading } = useGetChannelsQuery()
  const selectedChannel = useSelector(getSelectedChannel)
  const dispatch = useDispatch()

  const modals = {
    add: 'add',
    delete: 'delete',
    rename: 'rename',
  }

  const isClicked = id => (id === selectedChannel.id ? 'secondary' : 'light')

  const handleClickChannel = (channel) => {
    dispatch(setSelectedChannel(channel))
  }

  const handleRenderModal = (activeModal, editedChannelId = '', editedChannelName = '') => {
    dispatch(setModal({ activeModal, editedChannelId, editedChannelName }))
  }

  const channelsList = !isLoading && !error && data.map(({ id, name, removable }) => (
    <li key={id} className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={isClicked(id)}
          className="w-100 rounded-0 text-start text-truncate"
          onClick={() => handleClickChannel({
            id,
            name,
            removable,
          })}
        >
          <span className="me-1">{t('chatPage.grid')}</span>
          {name}
        </Button>
        {removable && (
          <>
            <Dropdown.Toggle split variant={isClicked(id)} id={id}>
              <span className="visually-hidden">{t('chatPage.channelManage')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                href={t('chatPage.grid')}
                onClick={() => handleRenderModal(modals.rename, id, name)}
              >
                {t('chatPage.rename')}
              </Dropdown.Item>
              <Dropdown.Item
                href={t('chatPage.grid')}
                onClick={() => handleRenderModal(modals.delete, id)}
              >
                {t('chatPage.delete')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </li>
  ))

  if (isLoading) {
    return (
      <div>{t('chatPage.chatLoading')}</div>
    )
  }

  return !error && (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chatPage.channels')}</b>
        <button
          type="button"
          className="btn-xs btn-outline-primary rounded"
          onClick={() => handleRenderModal(modals.add)}
        >
          +
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelsList}
      </ul>
      <ModalsContainer />
    </div>
  )
}

export default Channels
