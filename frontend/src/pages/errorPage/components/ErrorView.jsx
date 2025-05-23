import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageNotFound from './PageNotFound.jsx'
import { routes } from '../../../utils'

const ErrorView = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <PageNotFound classNames="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('errorPage.pageNotFound')}</h1>
      <p className="text-muted">
        {t('errorPage.butYouCanGo')}
        <Link to={routes.chat}>
          {t('errorPage.toMainPage')}
        </Link>
      </p>
    </div>
  )
}

export default ErrorView
