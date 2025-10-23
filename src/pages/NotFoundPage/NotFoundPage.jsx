import styles from './NotFoundPage.module.scss'
import Button from '@/shared/ui/Button';

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404 — Страница не найдена...</h1>
      <div className={styles.player}>
        <iframe
          title="Видео для 404"
          src="https://vk.com/video_ext.php?oid=-199751343&id=456239319&hd=2&autoplay=1&muted=1"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          frameBorder={0}
          width="500"
          height="500"
        />
      </div>
      <Button onClick={() => history.back()}>Назад</Button>
    </div>
  )
}

export default NotFoundPage