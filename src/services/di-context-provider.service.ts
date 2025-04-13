import { Context, createContext } from "solid-js";
import { DependencyContainer } from "tsyringe";

export const DIContextProvider: Context<DependencyContainer | undefined> = createContext<DependencyContainer>();