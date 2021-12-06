export default async () => {
  window.configuration = {
    env: '',
    sentryDsn: '',
    balanceUpDay: '2021-01-01T00:00:00',
    accessExpiration: '10000',
    today: new Date().toISOString(),
    umToken: '',
  };
};
