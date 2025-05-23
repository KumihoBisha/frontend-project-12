import { Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import filter from 'leo-profanity'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAddChannelMutation } from '../../store/apiClient.js'
import { setSelectedChannel } from '../../store/slices/channelSlice.js'

const AddModal = ({ data }) => {
  const {
    schema,
    handleCloseModal,
  } = data

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [addChannel] = useAddChannelMutation()
  const input = useRef(null)

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }
  }, [])

  const handleAddChannel = async (values, { resetForm }) => {
    try {
      const filteredName = filter.clean(values.newChannelName)
      const newChannel = { name: filteredName }
      const response = await addChannel(newChannel).unwrap()
      dispatch(setSelectedChannel(response))
      toast.success(t('modal.channelAddSuccess'))
      handleCloseModal()
      resetForm()
    }
    catch (error) {
      console.log(t('errors.networkError'), error)
      toast.error(t('errors.networkError'))
    }
  }

  const formik = useFormik({
    initialValues: {
      newChannelName: '',
    },
    validationSchema: schema,
    onSubmit: handleAddChannel,
  })

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="newChannelName">{t('modal.channelName')}</Form.Label>
            <Form.Control
              id="newChannelName"
              name="newChannelName"
              type="text"
              className="mb-2"
              value={formik.values.newChannelName}
              onChange={formik.handleChange}
              isInvalid={formik.errors.newChannelName && formik.touched.newChannelName}
              ref={input}
              autoFocus
              aria-label={t('modal.channelName')}
            />
            <Form.Label htmlFor="channelName" className="visually-hidden">{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback id="channelName" className="invalid">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-2 btn btn-secondary"
              onClick={handleCloseModal}
            >
              {t('modal.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {t('modal.send')}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddModal
