import { Link } from '@tanstack/react-location';
import { Title as DocumentTitle } from 'react-head';
import { useTranslation } from 'react-i18next';

import { Button, ISSPositions, Map, NearbyObservations, Text } from '~/components';
import { useNotifications, usePush } from '~/hooks';
import { Header } from '~/layout';
import { useAuthentication } from '~/providers';

function HomePage() {
  const { isLoggedIn, user } = useAuthentication();
  const { t } = useTranslation();
  const notifications = useNotifications();
  const push = usePush();
  return (
    <>
      <DocumentTitle>{t('document.title.home')}</DocumentTitle>
      <Header className="h-16 my-1" />
      <div className="h-16 gap-x-1 flex max-w-screen-lg mx-auto my-1 px-1 sm:gap-x-16 sm:px-16">
        <Button as={Link} color="darkGray" fullWidth to={isLoggedIn ? '/report-observation' : '/login'}>
          {t('observation.new')}
        </Button>
        <Button as={Link} color="darkGray" fullWidth to={isLoggedIn ? `/users/${user.username}` : '/login'}>
          {isLoggedIn ? t('users.profil') : t('users.login')}
        </Button>
      </div>
      <div className="flex justify-center my-3">
        {notifications.supported && push.supported ? (
          notifications.status === 'granted' ? (
            push.subscribed ? (
              <Button onPress={push.unsubscribe}>Se désinscrire des notifications</Button>
            ) : (
              <Button onPress={push.subscribe}>S&apos;inscrire aux notifications</Button>
            )
          ) : (
            <Text>L&apos;API Notifications ou l&apos;API Push ne sont pas supportées sur cette plateforme.</Text>
          )
        ) : (
          <Button onPress={notifications.request}>Autoriser les notifications</Button>
        )}
      </div>
    <Map
        className="h-[calc(100vh-8.75rem)]"
        minZoom={3}
        worldCopyJump
        radius={user != null ? user!.radius : 0}
        withoutNotificationCircle={user != null ? !user!.notificationsEnabled : false}
    >
        <ISSPositions />
        <NearbyObservations />
      </Map>
    </>
  );
}

export default HomePage;
