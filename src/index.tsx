import 'reflect-metadata';
/* @refresh reload */
import { render } from 'solid-js/web';
import { JSX } from "solid-js";
import { container } from "tsyringe";

import { DIContextProvider } from "./services/di-context-provider.service";
import { AppService } from "./services/app.service";

import BiblioTar from "./components/bibliotar";

((): void => {
  const root: HTMLElement | null = document.getElementById('root');

  if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
    );
  }

  container.registerSingleton(AppService);

  render((): JSX.Element => <>
    <DIContextProvider.Provider value={container}>
      <BiblioTar />
    </DIContextProvider.Provider>
  </>, root!);
})();