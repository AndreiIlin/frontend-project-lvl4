import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { Provider as StoreProvider } from 'react-redux';
import filter from 'leo-profanity';
import ru from './locales/ru.js';
import App from './components/App.jsx';
import store from './slices/index.js';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};
export default async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources: {
        ru,
      },
    });
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
  return (
    <StoreProvider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </StoreProvider>
  );
};
