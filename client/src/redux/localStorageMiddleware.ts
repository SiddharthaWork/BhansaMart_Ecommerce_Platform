import { Middleware } from "@reduxjs/toolkit";

export const localStorageMiddleware: Middleware<{}, any> =
    (store) => (next) => (action: unknown) => {
        const result = next(action);

        // Use a type guard to check that `action` is an object with a string `type` property.
        if (
            action &&
            typeof action === "object" &&
            "type" in action &&
            typeof (action as { type: unknown }).type === "string" &&
            (action as { type: string }).type.startsWith("cart/")
        ) {
            const state = store.getState();


            try {
                localStorage.setItem("cart", JSON.stringify(state.cart));
            } catch (error) {
                console.error("Error saving cart to localStorage:", error);
            }
        }

        return result;
    };
